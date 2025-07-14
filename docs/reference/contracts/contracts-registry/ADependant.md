# ADependant

## Overview

#### License: MIT

```solidity
abstract contract ADependant
```

The ContractsRegistry module

The contract that must be used as dependencies accepter in the dependency injection mechanism.
Upon the injection, the Injector (ContractsRegistry most of the time) will call the `setDependencies()` function.
The dependant contract will have to pull the required addresses from the supplied ContractsRegistry as a parameter.

The ADependant is fully compatible with proxies courtesy of custom storage slot.
## Errors info

### NotAnInjector

```solidity
error NotAnInjector(address injector, address caller)
```


## Modifiers info

### dependant

```solidity
modifier dependant()
```


## Functions info

### setDependencies (0x69130451)

```solidity
function setDependencies(
    address contractsRegistry_,
    bytes memory data_
) public virtual
```

The function that will be called from the ContractsRegistry (or factory) to inject dependencies.

The Dependant must apply `dependant()` modifier to this function



Parameters:

| Name               | Type    | Description                                          |
| :----------------- | :------ | :--------------------------------------------------- |
| contractsRegistry_ | address | the registry to pull dependencies from               |
| data_              | bytes   | the extra data that might provide additional context |

### setInjector (0x8cb941cc)

```solidity
function setInjector(address injector_) public virtual
```

The function is made public to allow for the factories to set the injector to the ContractsRegistry


Parameters:

| Name      | Type    | Description      |
| :-------- | :------ | :--------------- |
| injector_ | address | the new injector |

### getInjector (0x3e3b5b19)

```solidity
function getInjector() public view returns (address injector_)
```

The function to get the current injector


Return values:

| Name      | Type    | Description          |
| :-------- | :------ | :------------------- |
| injector_ | address | the current injector |
