# Building a Recon Pipeline with Subfinder, Httpx & Nuclei

**Tag:** Bug Bounty · **Date:** Mar 2026 · **Read time:** 8 min

---

Bug bounty recon is only as good as its consistency. Manual recon is slow, error-prone, and impossible to reproduce. This post walks through how I built a fully automated pipeline that chains subfinder → httpx → nuclei → notify into a single command.

## Why Automate Recon?

When a new scope drops, the window to find low-hanging fruit is narrow. Everyone else is running the same tools. The difference is speed and coverage. A pipeline that runs in the background while you sleep beats manual recon every time.

## The Stack

| Tool | Purpose |
|------|---------|
| **subfinder** | Passive subdomain enumeration across 50+ sources |
| **httpx** | HTTP probing — status codes, titles, tech detection |
| **nuclei** | Template-based vulnerability scanning |
| **notify** | Slack/Telegram alerts on new findings |
| **anew** | Deduplicate output across runs |

## Pipeline Flow

```bash
# Full pipeline in one command
subfinder -dL scope.txt -silent \
  | anew subdomains.txt \
  | httpx -silent -o live-hosts.txt \
  | nuclei -silent -t ~/nuclei-templates/ -o findings.json \
  | notify
```

## Step 1 — Subdomain Enumeration

```bash
# Passive enumeration (no active probing)
subfinder -d target.com -silent -o subdomains.txt

# Multiple domains from file
subfinder -dL scope.txt -silent -o subdomains.txt

# With all sources enabled (requires API keys in ~/.config/subfinder/provider-config.yaml)
subfinder -d target.com -all -silent
```

Configure API keys for maximum coverage:

```yaml
# ~/.config/subfinder/provider-config.yaml
shodan:
  - YOUR_SHODAN_KEY
virustotal:
  - YOUR_VT_KEY
securitytrails:
  - YOUR_ST_KEY
```

## Step 2 — HTTP Probing

```bash
# Basic probing
cat subdomains.txt | httpx -silent

# Full output with status, title, tech
cat subdomains.txt | httpx -silent -status-code -title -tech-detect -o live-hosts.txt

# Filter only 200s
cat subdomains.txt | httpx -silent -mc 200
```

## Step 3 — Vulnerability Scanning

```bash
# Scan with community templates
nuclei -l live-hosts.txt -t ~/nuclei-templates/ -silent

# Specific severity
nuclei -l live-hosts.txt -severity high,critical -silent

# Custom templates only
nuclei -l live-hosts.txt -t ~/my-templates/ -silent
```

## Custom Templates I Use

### Exposed .env Files

```yaml
id: exposed-env-file
info:
  name: Exposed .env File
  severity: high
requests:
  - method: GET
    path:
      - "{{BaseURL}}/.env"
    matchers:
      - type: word
        words:
          - "APP_KEY="
          - "DB_PASSWORD="
        condition: or
```

### GraphQL Introspection

```yaml
id: graphql-introspection
info:
  name: GraphQL Introspection Enabled
  severity: medium
requests:
  - method: POST
    path:
      - "{{BaseURL}}/graphql"
    body: '{"query":"{__schema{types{name}}}"}'
    matchers:
      - type: word
        words:
          - "__schema"
```

## Step 4 — Alerting

```bash
# Configure notify (~/.config/notify/provider-config.yaml)
# Then pipe nuclei output
nuclei -l live-hosts.txt -silent | notify
```

```yaml
# ~/.config/notify/provider-config.yaml
slack:
  - id: "recon-alerts"
    slack_webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK"
    slack_username: "nuclei"
    slack_channel: "#bug-bounty"
```

## Automation with Cron

```bash
# Run every 6 hours
0 */6 * * * /home/khandal/recon/pipeline.sh >> /var/log/recon.log 2>&1
```

## Results

Running this pipeline across 12+ programs over 6 months:

- **3× P2 SSRF** via exposed internal services discovered by nuclei
- **2× Sensitive data exposure** via misconfigured S3 (custom template)
- **1× Auth bypass** via JWT `alg:none` (nuclei community template)
- **~400 hours saved** vs manual recon

## Key Takeaways

1. **Consistency beats cleverness** — the same scan run daily finds more than a brilliant one-off
2. **Custom templates win** — community templates are noisy; write targeted ones for your scope
3. **Deduplication matters** — `anew` ensures you only alert on new findings, not reruns
4. **API keys multiply coverage** — subfinder with keys finds 3× more subdomains than without
