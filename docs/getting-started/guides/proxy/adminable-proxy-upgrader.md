# 🪟 Adminable Proxy Upgrader

## Introduction

The Adminable Proxy Upgrader is a basic Admin contract for Adminable proxies.

## Implementation

The `AdminableProxyUpgrader` contract inherits from `Ownable`. The owner can call the `upgrade` function in order to change the current implementation address of a specified adminable proxy contract. Additionally, there is a `getImplementation` function that retrieves the implementation address.

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdminableProxyUpgrader is Ownable {
    constructor(address initialOwner_) Ownable(initialOwner_) {}

    . . .
}
```
