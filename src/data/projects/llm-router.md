# Adaptive LLM Router

A FastAPI service that intelligently routes prompts to the most appropriate LLM based on task type, cost, latency requirements, and model availability. Supports local Ollama models and cloud providers (OpenAI, Anthropic, Groq).

## Overview

Running every prompt through GPT-4o is expensive and slow. This router classifies incoming prompts and dispatches them to the cheapest capable model — local Llama 3 for simple tasks, GPT-4o only for complex reasoning.

## Architecture

```
Client Request
  └─► FastAPI Router
        └─► Classifier (task type detection)
              ├─► Simple / short → Ollama (Llama 3 8B) — free, local
              ├─► Code generation → Ollama (DeepSeek Coder) — free, local
              ├─► Complex reasoning → Groq (Llama 3 70B) — fast, cheap
              └─► Critical / long context → OpenAI (GPT-4o) — best quality
```

## Stack

- **FastAPI** — Async API server
- **Ollama** — Local model inference
- **LiteLLM** — Unified interface across providers
- **Redis** — Response caching
- **Pydantic** — Request/response validation

## Setup

### Kali Linux

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3
ollama pull deepseek-coder

# Clone and install
git clone https://github.com/rootwithkhandal/llm-router
cd llm-router

python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Install Redis
sudo apt install redis-server -y
sudo systemctl start redis

# Configure
cp .env.example .env
nano .env  # Add OPENAI_API_KEY, ANTHROPIC_API_KEY, GROQ_API_KEY

# Run
uvicorn main:app --reload --port 8000
```

### macOS

```bash
# Install Ollama
brew install ollama
ollama serve &
ollama pull llama3

# Clone and install
git clone https://github.com/rootwithkhandal/llm-router
cd llm-router

python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Install Redis
brew install redis && brew services start redis

cp .env.example .env
uvicorn main:app --reload --port 8000
```

### Windows

```powershell
# Install Ollama from https://ollama.com/download
ollama pull llama3

git clone https://github.com/rootwithkhandal/llm-router
cd llm-router

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Install Redis via WSL2 or use Redis for Windows
# https://github.com/microsoftarchive/redis/releases

Copy-Item .env.example .env
uvicorn main:app --reload --port 8000
```

## API Usage

```bash
# Route a prompt
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain reentrancy attacks", "priority": "cost"}'

# Force a specific model
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a Foundry test", "model": "deepseek-coder"}'

# Check routing stats
curl http://localhost:8000/stats
```

## Routing Logic

| Task Type | Default Model | Fallback |
|-----------|--------------|---------|
| Simple Q&A | Llama 3 8B (local) | Groq Llama 3 70B |
| Code generation | DeepSeek Coder (local) | GPT-4o |
| Complex reasoning | Groq Llama 3 70B | GPT-4o |
| Long context (>8k) | GPT-4o | Claude 3 |
| Security analysis | GPT-4o | Groq |
