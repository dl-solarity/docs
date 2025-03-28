# APoolFactory

## Overview

#### License: MIT

```solidity
abstract contract APoolFactory is ADependant
```

The PoolContractsRegistry module

This is an abstract factory contract that is used in pair with the PoolContractsRegistry contract to
deploy, register and inject dependencies to pools. Built via EIP-6224 Contracts Dependencies Registry pattern.

The actual `deploy()` function has to be implemented in the descendants of this contract. The deployment
is made via the BeaconProxy pattern.

Both "create1" and "create2" deployment modes are supported.
## Structs info

### APoolFactoryStorage

```solidity
struct APoolFactoryStorage {
	address contractsRegistry;
}
```


## Functions info

### setDependencies (0x69130451)

```solidity
function setDependencies(
    address contractsRegistry_,
    bytes memory
) public virtual override dependant
```

The function that accepts dependencies from the ContractsRegistry, can be overridden


Parameters:

| Name               | Type    | Description             |
| :----------------- | :------ | :---------------------- |
| contractsRegistry_ | address | the dependency registry |

### getContractsRegistry (0xbcb9491c)

```solidity
function getContractsRegistry() public view returns (address)
```

Returns the address of the contracts registry