# Home-Manager Profiles

Declarative NixOS Home Manager configuration for security research and bug bounty operations. Provides reproducible, compartmentalised environments with all offensive and defensive tooling pinned to exact versions.

## Overview

Security tooling is notoriously hard to manage — version conflicts, missing dependencies, tools that only work on specific distros. NixOS Home Manager solves this by declaring your entire environment as code. Rebuild it identically on any machine in minutes.

## Profiles

### `bug-bounty`
Web application testing tools — Burp Suite Pro, ffuf, nuclei, httpx, subfinder, feroxbuster, sqlmap.

### `blockchain`
Smart contract auditing — Foundry, Slither, Echidna, Mythril, solc.

### `ai-redteam`
LLM red-teaming — Ollama, Python with Garak/PyRIT, Jupyter.

### `opsec`
Operational security — WireGuard, Tor, Firejail, compartmentalised browsers.

### `soc`
Blue team tools — Zeek, Suricata, Sigma, Wazuh agent.

## Setup

### NixOS (Primary)

```bash
# Install Nix (if not on NixOS)
sh <(curl -L https://nixos.org/nix/install) --daemon

# Enable flakes
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf

# Install Home Manager
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update
nix-shell '<home-manager>' -A install

# Clone and apply
git clone https://github.com/rootwithkhandal/home-manager-profiles
cd home-manager-profiles
home-manager switch --flake .#bug-bounty
```

### Kali Linux (Nix on top of Kali)

```bash
# Install Nix package manager on Kali
sh <(curl -L https://nixos.org/nix/install) --daemon
source /etc/profile.d/nix.sh

# Enable flakes
echo "experimental-features = nix-command flakes" | sudo tee -a /etc/nix/nix.conf
sudo systemctl restart nix-daemon

# Install Home Manager
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update
nix-shell '<home-manager>' -A install

# Apply bug-bounty profile
git clone https://github.com/rootwithkhandal/home-manager-profiles
cd home-manager-profiles
home-manager switch --flake .#bug-bounty
```

### macOS

```bash
# Install Nix
sh <(curl -L https://nixos.org/nix/install)

# Enable flakes
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf

# Install Home Manager
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update
nix-shell '<home-manager>' -A install

# Apply profile
git clone https://github.com/rootwithkhandal/home-manager-profiles
cd home-manager-profiles
home-manager switch --flake .#bug-bounty
```

### Windows (WSL2)

```powershell
# Enable WSL2
wsl --install -d Ubuntu

# Inside WSL2 Ubuntu terminal:
sh <(curl -L https://nixos.org/nix/install) --daemon
source /etc/profile.d/nix.sh

echo "experimental-features = nix-command flakes" | sudo tee -a /etc/nix/nix.conf
sudo systemctl restart nix-daemon

nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update
nix-shell '<home-manager>' -A install

git clone https://github.com/rootwithkhandal/home-manager-profiles
cd home-manager-profiles
home-manager switch --flake .#bug-bounty
```

## Key Config Snippet

```nix
# profiles/bug-bounty.nix
{ pkgs, ... }: {
  home.packages = with pkgs; [
    # Recon
    subfinder httpx nuclei notify
    feroxbuster ffuf
    # Web testing
    burpsuite sqlmap nikto
    # Network
    nmap masscan rustscan
    # Utilities
    jq fzf ripgrep tmux
  ];

  programs.zsh = {
    enable = true;
    shellAliases = {
      recon = "subfinder -dL scope.txt | httpx -silent | nuclei -silent";
      scan  = "nmap -sV -sC -oA scan";
    };
  };
}
```
