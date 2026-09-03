# SIEM Alert Triage

Python-based alert enrichment and false-positive reduction system for SOC operations. Integrates with Elastic SIEM, Splunk, and Wazuh to auto-enrich alerts with threat intel and cut analyst noise by 60%.

## Overview

SOC analysts drown in alerts. Most are false positives. This project automates the enrichment, correlation, and prioritisation pipeline so analysts focus only on what matters.

## Stack

- **Python 3.11** — Core enrichment engine
- **Elastic SIEM / Wazuh** — Alert source
- **VirusTotal API** — IOC reputation lookups
- **AbuseIPDB** — IP reputation scoring
- **Sigma** — Detection rule format
- **TheHive** — Case management integration

## Setup

### Kali Linux

```bash
# Clone the repo
git clone https://github.com/rootwithkhandal/siem-triage
cd siem-triage

# Create virtual environment
python3 -m venv venv && source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure API keys
cp .env.example .env
nano .env  # Add VT_API_KEY, ABUSEIPDB_KEY, ELASTIC_URL
```

### macOS

```bash
git clone https://github.com/rootwithkhandal/siem-triage
cd siem-triage

python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
open -e .env  # Add your API keys
```

### Windows

```powershell
git clone https://github.com/rootwithkhandal/siem-triage
cd siem-triage

python -m venv venv
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt

Copy-Item .env.example .env
notepad .env  # Add your API keys
```

## How It Works

```
Elastic SIEM alert
  └─► Enrichment engine
        ├─► VirusTotal (hash / domain / IP lookup)
        ├─► AbuseIPDB (IP confidence score)
        ├─► GeoIP (location context)
        └─► Internal asset DB (is this a known asset?)
              └─► Scoring engine
                    ├─► Score < 30  → Auto-close (false positive)
                    ├─► Score 30-70 → Queue for analyst
                    └─► Score > 70  → Auto-escalate to TheHive
```

## Sigma Rules Written

- Suspicious PowerShell encoded command execution
- LSASS memory dump via procdump
- Lateral movement via PsExec
- Outbound connection to Tor exit nodes
- Brute force detection with adaptive thresholds

## Results

- 60% reduction in false positive alert volume
- Mean time to triage reduced from 18 min → 4 min
- 3 real incidents detected that would have been missed in noise
