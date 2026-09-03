# Smart Contract Audit

Security audits of Solidity smart contracts on Immunefi, Code4rena, and Sherlock. Focuses on reentrancy, access control flaws, oracle manipulation, and economic logic vulnerabilities.

## Overview

DeFi protocols handle billions in user funds with immutable code. A single logic flaw can drain an entire protocol. This project documents audit methodology, tooling, and real findings from competitive audit contests.

## Tooling

- **Slither** — Static analysis, detects common vulnerability patterns
- **Foundry / Forge** — Fuzz testing, invariant testing, PoC exploits
- **Echidna** — Property-based fuzzing for invariant violations
- **Mythril** — Symbolic execution for deep path analysis

## Setup

### Kali Linux

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Slither
pip3 install slither-analyzer

# Install Echidna (via prebuilt binary)
wget https://github.com/crytic/echidna/releases/latest/download/echidna-linux.zip
unzip echidna-linux.zip && chmod +x echidna && sudo mv echidna /usr/local/bin/

# Install Mythril
pip3 install mythril
```

### macOS

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Slither
pip3 install slither-analyzer

# Install Echidna via Homebrew
brew install echidna

# Install Mythril
pip3 install mythril
```

### Windows

```powershell
# Install Foundry (via WSL2 recommended)
# In WSL2 terminal:
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Slither in WSL2
pip3 install slither-analyzer

# Native Windows: use Docker
docker pull trailofbits/eth-security-toolbox
docker run -it trailofbits/eth-security-toolbox
```

## Vulnerability Classes

### Reentrancy

```solidity
// Vulnerable
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    (bool ok,) = msg.sender.call{value: amount}(""); // external call before state update
    balances[msg.sender] -= amount;
}

// Fixed — checks-effects-interactions
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;                  // state update first
    (bool ok,) = msg.sender.call{value: amount}("");
}
```

### Oracle Manipulation
Protocols using spot price from a single DEX pool are vulnerable to flash loan price manipulation. Use TWAP oracles instead.

### Access Control
Missing role checks on privileged functions allow arbitrary callers to drain funds or upgrade contracts.

## Audit Findings

| Contest | Protocol | Severity | Finding |
|---------|----------|----------|---------|
| Code4rena | Vault Protocol | High | Reentrancy in `withdraw()` |
| Sherlock | Lending Protocol | Medium | Oracle manipulation via flash loan |
| Immunefi | DEX | High | Access control on `setFee()` |
| Code4rena | Staking | Medium | Precision loss in reward calculation |
