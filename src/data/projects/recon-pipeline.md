# Recon Pipeline

A fully automated, declarative recon pipeline that chains subfinder, httpx, nuclei, and notify into a single reproducible workflow triggered on scope updates.

## Overview

Bug bounty recon is only as good as its consistency. This pipeline removes manual steps by declaratively defining every tool, version, and execution order — meaning the same scan runs identically across machines.

## Stack

- **subfinder** — passive subdomain enumeration across 50+ sources
- **httpx** — HTTP probing, title extraction, status codes, tech detection
- **nuclei** — template-based vulnerability scanning (community + custom templates)
- **notify** — Slack/Discord/Telegram alerting on new findings

## Pipeline Flow

```
scope.txt
  └─► subfinder   → subdomains.txt
        └─► httpx  → live-hosts.txt
              └─► nuclei → findings.json
                    └─► notify → alerts
```

## Setup

### Kali Linux

```bash
# Install Go-based tools
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
go install -v github.com/projectdiscovery/notify/cmd/notify@latest

# Add Go bin to PATH
echo 'export PATH=$PATH:$(go env GOPATH)/bin' >> ~/.zshrc && source ~/.zshrc

# Update nuclei templates
nuclei -update-templates
```

### macOS

```bash
# Install via Homebrew
brew install go
brew install projectdiscovery/tap/subfinder
brew install projectdiscovery/tap/httpx
brew install projectdiscovery/tap/nuclei

# Or via Go directly
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Update templates
nuclei -update-templates
```

### Windows

```powershell
# Install Go from https://go.dev/dl/
# Then in PowerShell:
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/projectdiscovery/httpx/cmd/httpx@latest
go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Add Go bin to PATH (if not already)
$env:PATH += ";$env:USERPROFILE\go\bin"

# Update nuclei templates
nuclei -update-templates
```

## Usage

```bash
# Run full pipeline against a scope file
./recon.sh scope.txt

# Subdomain enumeration only
subfinder -dL scope.txt -o subdomains.txt

# Probe live hosts
cat subdomains.txt | httpx -silent -o live-hosts.txt

# Scan with nuclei
nuclei -l live-hosts.txt -t ~/nuclei-templates/ -o findings.json
```

## Custom Nuclei Templates

- Exposed `.env` files with secrets
- Misconfigured S3 bucket policies
- GraphQL introspection enabled in production
- JWT `alg:none` acceptance

## Results

Used across 12+ bug bounty programs. Notable findings:

- 3× P2 SSRF via exposed internal services
- 2× Sensitive data exposure via misconfigured cloud storage
- 1× Authentication bypass via JWT algorithm confusion
