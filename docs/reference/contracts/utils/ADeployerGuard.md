# ADeployerGuard

## Overview

#### License: MIT

```solidity
abstract contract ADeployerGuard
```

A utility contract that provides protected initialization capabilities for other contracts.

Generally speaking, the common "Initializer" approach is easily front-runnable and shouldn't be used on its own.

This simple utility ensures that contracts are never left in an unprotected state during deployment by
integrating a second validation step restricted to the deployer only.

## Usage example:

```
contract ProtectedERC20 is ADeployerGuard, ERC20 {
    constructor() ADeployerGuard(msg.sender) {}

    function __ProtectedERC20_init(
        string memory name_,
        string memory symbol_,
    ) external initializer onlyDeployer {
        __ERC20_init(name_, symbol_);
    }

    ...
}
```
## Errors info

### OnlyDeployer

```solidity
error OnlyDeployer(address caller)
```

Error thrown when a non-deployer address attempts to call deployer-only functions


Parameters:

| Name   | Type    | Description                                     |
| :----- | :------ | :---------------------------------------------- |
| caller | address | The address that attempted to call the function |

## Modifiers info

### onlyDeployer

```solidity
modifier onlyDeployer()
```

This modifier should be used on the initialization functions
to ensure their non-frontrunability
Modifier that restricts function access to the deployer only
