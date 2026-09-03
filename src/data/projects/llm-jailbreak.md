# LLM Jailbreak Research

Systematic research into LLM safety boundary bypasses using Garak and PyRIT. Documents multi-turn prompt injection, role-play escalation, token smuggling, and adversarial suffix attacks across GPT-4o, Claude 3, and Llama 3.

## Overview

As LLMs get deployed in agentic and security-sensitive contexts, understanding their failure modes becomes critical. This research catalogues reproducible jailbreak techniques and evaluates model robustness across providers.

## Tools

- **Garak** — LLM vulnerability scanner, automated probe execution
- **PyRIT** — Microsoft's red-teaming framework for generative AI
- **Ollama** — Local model inference for offline testing
- **Python 3.11+** — Custom attack harnesses and result analysis

## Setup

### Kali Linux

```bash
# Install Python deps
sudo apt update && sudo apt install python3-pip python3-venv -y

# Create isolated environment
python3 -m venv llm-redteam
source llm-redteam/bin/activate

# Install Garak
pip install garak

# Install PyRIT
pip install pyrit

# Install Ollama for local models
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3
ollama pull mistral
```

### macOS

```bash
# Install Python via Homebrew
brew install python@3.11

python3 -m venv llm-redteam
source llm-redteam/bin/activate

pip install garak pyrit

# Install Ollama
brew install ollama
ollama serve &
ollama pull llama3
```

### Windows

```powershell
# Install Python from https://python.org
python -m venv llm-redteam
.\llm-redteam\Scripts\Activate.ps1

pip install garak pyrit

# Install Ollama from https://ollama.com/download
# Then in a new terminal:
ollama pull llama3
```

## Attack Categories

### Multi-Turn Prompt Injection
Gradually shifting model context across a conversation to erode safety constraints.

### Role-Play Escalation
Using fictional framing to bypass content policies while maintaining plausible deniability.

### Token Smuggling
Encoding restricted content using Base64, ROT13, or Unicode lookalikes to bypass keyword filters.

### Adversarial Suffixes
Appending optimised token sequences (GCG attack) that cause models to comply regardless of the prefix.

## Key Findings

| Model | Technique | Success Rate |
|-------|-----------|-------------|
| GPT-4o | Token smuggling (Base64) | 34% |
| Llama 3 8B | Role-play escalation | 71% |
| Claude 3 Sonnet | Multi-turn injection | 22% |
| Mistral 7B | Adversarial suffix | 58% |

## Responsible Disclosure

All findings involving production models were reported through respective vendor bug bounty programs before publication.
