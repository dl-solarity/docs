# ABlockGuard

## Overview

#### License: MIT

```solidity
abstract contract ABlockGuard
```

The BlockGuard module

This module facilitates the flash-loan protection mechanism. Users may be prohibited from calling certain
functions in the same block e.g. via the Multicall.

## Usage example:

```
contract NotFlashloanable is BlockGuard {
    function deposit(uint256 amount) external lockBlock("DEPOSIT", msg.sender) {
        . . .
    }

    function withdraw(uint256 amount) external checkBlock("DEPOSIT", msg.sender) {
        . . .
    }
}
```
## Structs info

### ABlockGuardStorage

```solidity
struct ABlockGuardStorage {
	mapping(string => mapping(address => uint256)) lockedInBlocks;
}
```


## Errors info

### BlockGuardLocked

```solidity
error BlockGuardLocked(string resource, address key)
```


## Modifiers info

### lockBlock

```solidity
modifier lockBlock(string memory resource_, address key_)
```


### checkBlock

```solidity
modifier checkBlock(string memory resource_, address key_)
```


### checkLockBlock

```solidity
modifier checkLockBlock(string memory resource_, address key_)
```

