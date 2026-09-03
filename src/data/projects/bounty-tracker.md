# Bug Bounty Tracker

A local-first dashboard for tracking bug bounty submissions, program scope, payout history, and yield analytics. Built with Python + SQLite, with a clean terminal UI and optional web dashboard.

## Overview

Keeping track of submissions across Immunefi, HackerOne, Bugcrowd, and Intigriti manually is a mess. This tracker centralises everything — programs, submissions, status updates, and payout data — with analytics to understand where your time is best spent.

## Stack

- **Python 3.11** — Core application
- **SQLite** — Local database, no server needed
- **Rich** — Terminal UI tables and progress bars
- **FastAPI + Jinja2** — Optional web dashboard
- **Matplotlib** — Yield charts and analytics

## Setup

### Kali Linux

```bash
git clone https://github.com/rootwithkhandal/bounty-tracker
cd bounty-tracker

python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Initialise database
python tracker.py init

# Launch terminal UI
python tracker.py

# Launch web dashboard (optional)
uvicorn web:app --port 8080
# Open http://localhost:8080
```

### macOS

```bash
git clone https://github.com/rootwithkhandal/bounty-tracker
cd bounty-tracker

python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

python tracker.py init
python tracker.py

# Web dashboard
uvicorn web:app --port 8080
open http://localhost:8080
```

### Windows

```powershell
git clone https://github.com/rootwithkhandal/bounty-tracker
cd bounty-tracker

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

python tracker.py init
python tracker.py

# Web dashboard
uvicorn web:app --port 8080
# Open http://localhost:8080 in browser
```

## Usage

```bash
# Add a new program
python tracker.py add-program --name "Acme Corp" --platform hackerone --scope "*.acme.com"

# Log a submission
python tracker.py submit \
  --program "Acme Corp" \
  --title "SSRF via redirect" \
  --severity high \
  --status pending

# Update submission status
python tracker.py update --id 42 --status resolved --payout 1500

# View analytics
python tracker.py stats

# Export to CSV
python tracker.py export --output submissions.csv
```

## Analytics

The dashboard tracks:

- **Yield by program** — which programs pay best per hour invested
- **Severity distribution** — breakdown of P1/P2/P3/P4 findings
- **Monthly earnings** — payout trends over time
- **Acceptance rate** — submissions accepted vs. duplicated/N/A
- **Time to resolution** — average days from submission to payout

## Database Schema

```sql
CREATE TABLE programs (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT,
  scope TEXT,
  active BOOLEAN DEFAULT 1
);

CREATE TABLE submissions (
  id INTEGER PRIMARY KEY,
  program_id INTEGER REFERENCES programs(id),
  title TEXT NOT NULL,
  severity TEXT CHECK(severity IN ('critical','high','medium','low','info')),
  status TEXT DEFAULT 'pending',
  payout REAL DEFAULT 0,
  submitted_at DATE DEFAULT CURRENT_DATE,
  resolved_at DATE
);
```
