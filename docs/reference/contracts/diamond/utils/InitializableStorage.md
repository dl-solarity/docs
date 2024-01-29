# InitializableStorage

## Overview

#### License: MIT

```solidity
abstract contract InitializableStorage
```

The Diamond standard module

This is a modified version of the OpenZeppelin Initializable contract to be compatible
with the Diamond Standard.
## Structs info

### IStorage

```solidity
struct IStorage {
	mapping(bytes32 => uint8) initializingStorage;
}
```


## Events info

### Initialized

```solidity
event Initialized(bytes32 storageSlot)
```


## Modifiers info

### initializer

```solidity
modifier initializer(bytes32 storageSlot_)
```

A modifier that defines a protected initializer function that can be invoked at most
once for a particular storage in a Diamond proxy that begins with {storageSlot_}.
In its scope, `onlyInitializing` functions can be used to initialize parent contracts.

Emits an {Initialized} event.
### onlyInitializing

```solidity
modifier onlyInitializing(bytes32 storageSlot_)
```

Modifier to protect an initialization function so that it can only be invoked by functions with the
{initializer} modifier, directly or indirectly.