# AbstractPoolFactory

## Abstract Contract Description


License: MIT

## 

```solidity
abstract contract AbstractPoolFactory is AbstractDependant
```

The PoolContractsRegistry module

This is an abstract factory contract that is used in pair with the PoolContractsRegistry contract to
deploy, register and inject pools.

The actual `deploy()` function has to be implemented in the descendants of this contract. The deployment
is made via the BeaconProxy pattern.
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
