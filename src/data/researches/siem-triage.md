# SIEM Alert Triage at Scale — Cutting False Positives by 60%

**Tag:** SOC / Blue Team · **Date:** Dec 2025 · **Read time:** 7 min

---

Alert fatigue is the silent killer of SOC effectiveness. When analysts see 500 alerts a day and 90% are false positives, real incidents get buried. This post covers how I built an enrichment and scoring pipeline that cut our false positive volume by 60% and reduced mean triage time from 18 minutes to 4.

## The Problem

Raw SIEM alerts are noisy by design — they're built for coverage, not precision. Every alert needs context:

- Is this IP known malicious?
- Is this asset critical?
- Has this pattern fired before?
- Is this a known-good process?

Answering these manually for every alert is unsustainable.

## Architecture

```
Elastic SIEM Alert
  └─► Python Enrichment Engine
        ├─► VirusTotal API    (hash / domain / IP reputation)
        ├─► AbuseIPDB         (IP confidence score 0-100)
        ├─► MaxMind GeoIP     (location, ASN)
        ├─► Internal CMDB     (is this a known asset?)
        └─► Historical DB     (has this fired before?)
              └─► Scoring Engine
                    ├─► Score < 30  → Auto-close
                    ├─► Score 30-70 → Analyst queue
                    └─► Score > 70  → Auto-escalate → TheHive
```

## Scoring Logic

```python
def score_alert(alert: dict) -> int:
    score = 0

    # IP reputation
    ip = alert.get("src_ip")
    if ip:
        abuse_score = get_abuseipdb_score(ip)
        score += min(abuse_score // 2, 40)  # max 40 points

        vt_result = get_virustotal_ip(ip)
        if vt_result["malicious"] > 3:
            score += 20

    # Asset criticality
    asset = get_asset(alert.get("dest_ip"))
    if asset and asset["criticality"] == "high":
        score += 15

    # Historical frequency
    similar_count = count_similar_alerts(alert, days=7)
    if similar_count > 10:
        score -= 20  # likely noisy rule
    elif similar_count == 0:
        score += 10  # first time seen

    # Sigma rule severity
    severity_map = {"critical": 30, "high": 20, "medium": 10, "low": 0}
    score += severity_map.get(alert.get("severity", "low"), 0)

    return max(0, min(score, 100))
```

## Sigma Rules That Reduced Noise

### Before — Noisy PowerShell Rule

```yaml
# Fired on every PowerShell execution — 200+ alerts/day
detection:
  selection:
    EventID: 4104
    ScriptBlockText|contains: 'powershell'
```

### After — Targeted Encoded Command Detection

```yaml
title: Suspicious PowerShell Encoded Command
id: a2b4c6d8-...
status: stable
logsource:
  product: windows
  service: powershell
detection:
  selection:
    EventID: 4104
    ScriptBlockText|contains:
      - '-EncodedCommand'
      - '-enc '
      - '-e '
  filter_legitimate:
    ScriptBlockText|contains:
      - 'WindowsPowerShell\v1.0\powershell.exe'
  condition: selection and not filter_legitimate
falsepositives:
  - Legitimate admin scripts using encoded commands
level: high
```

## VirusTotal Integration

```python
import requests
import os

VT_KEY = os.environ["VT_API_KEY"]

def get_virustotal_ip(ip: str) -> dict:
    url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
    headers = {"x-apikey": VT_KEY}
    
    r = requests.get(url, headers=headers, timeout=5)
    if r.status_code != 200:
        return {"malicious": 0, "suspicious": 0}
    
    stats = r.json()["data"]["attributes"]["last_analysis_stats"]
    return {
        "malicious": stats.get("malicious", 0),
        "suspicious": stats.get("suspicious", 0),
    }
```

## TheHive Auto-Escalation

```python
from thehive4py.api import TheHiveApi
from thehive4py.models import Case, CaseTask

api = TheHiveApi(os.environ["THEHIVE_URL"], os.environ["THEHIVE_KEY"])

def escalate_to_thehive(alert: dict, score: int):
    case = Case(
        title=f"[AUTO] {alert['rule_name']}",
        severity=3 if score > 85 else 2,
        description=f"Score: {score}/100\n\nAlert details:\n{json.dumps(alert, indent=2)}",
        tags=["auto-escalated", alert.get("category", "unknown")],
    )
    api.create_case(case)
```

## Results After 90 Days

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Daily alert volume | 487 | 194 | -60% |
| Mean triage time | 18 min | 4 min | -78% |
| Analyst-reviewed alerts | 487/day | 194/day | -60% |
| Missed incidents | 2 | 0 | -100% |
| Auto-closed (confirmed FP) | 0% | 58% | +58% |

## Key Lessons

1. **Score, don't just filter** — binary allow/block misses context; a score lets you tune thresholds
2. **Historical frequency is powerful** — a rule that fires 50× a day is almost always noisy
3. **Asset criticality changes everything** — the same alert on a domain controller vs. a dev laptop is a different incident
4. **Measure your false positive rate** — you can't improve what you don't track
