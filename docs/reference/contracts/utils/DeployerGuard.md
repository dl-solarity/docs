# DeployerGuard

## Overview

#### License: MIT

```solidity
contract DeployerGuard
```

A utility contract that provides protected initialization capabilities for contracts
that depend on each other. This contract ensures that contracts are never left in an
unprotected state during deployment by allowing a second initialization phase that is
restricted to the deployer only.
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

This modifier should be used on second initialization functions
to ensure only the original deployer can establish cross-contract references
Modifier that restricts function access to the deployer only

## Functions info

### constructor

```solidity
constructor(address deployer_)
```

Constructor that sets the deployer address