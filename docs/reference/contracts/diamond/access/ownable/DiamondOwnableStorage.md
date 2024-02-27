# DiamondOwnableStorage

## Overview

#### License: MIT

```solidity
abstract contract DiamondOwnableStorage is InitializableStorage
```

The Diamond standard module

This is an Ownable Storage contract with Diamond Standard support
## Structs info

### DOStorage

```solidity
struct DOStorage {
	address owner;
}
```


## Constants info

### DIAMOND_OWNABLE_STORAGE_SLOT (0x4ac3371e)

```solidity
bytes32 constant DIAMOND_OWNABLE_STORAGE_SLOT = keccak256("diamond.standard.diamond.ownable.storage")
```


## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```


## Functions info

### owner (0x8da5cb5b)

```solidity
function owner() public view virtual returns (address)
```

The function to get the Diamond owner


Return values:

| Name | Type    | Description              |
| :--- | :------ | :----------------------- |
| [0]  | address | the owner of the Diamond |
