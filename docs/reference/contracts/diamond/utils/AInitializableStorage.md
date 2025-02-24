# AInitializableStorage

## Overview

#### License: MIT

```solidity
abstract contract AInitializableStorage
```

The Diamond standard module

This is a modified version of the OpenZeppelin Initializable contract to be compatible
with the Diamond Standard.
## Structs info

### IStorage

```solidity
struct IStorage {
	mapping(bytes32 => AInitializableStorage.InitializableStorage) initializableStorage;
}
```


### InitializableStorage

```solidity
struct InitializableStorage {
	uint64 initialized;
	bool initializing;
}
```


## Events info

### Initialized

```solidity
event Initialized(bytes32 storageSlot, uint64 version)
```


## Errors info

### AlreadyInitialized

```solidity
error AlreadyInitialized()
```


### InvalidInitialization

```solidity
error InvalidInitialization()
```


### NotInitializing

```solidity
error NotInitializing()
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
### reinitializer

```solidity
modifier reinitializer(bytes32 storageSlot_, uint64 version_)
```

A modifier that defines a protected reinitializer function that can be invoked at most once
for a particular storage in a Diamond proxy that begins with {storageSlot_},
and only if the storage hasn't been initialized to a greater version before.
In its scope, `onlyInitializing` functions can be used to initialize parent contracts.

Note that versions can jump in increments greater than 1; this implies that if multiple reinitializers coexist in
a storage slot, executing them in the right order is up to the developer or operator.

WARNING: Setting the version to 2**64 - 1 will prevent any future reinitialization.

Emits an {Initialized} event.
### onlyInitializing

```solidity
modifier onlyInitializing(bytes32 storageSlot_)
```

Modifier to protect an initialization function so that it can only be invoked by functions with the
{initializer} modifier, directly or indirectly.