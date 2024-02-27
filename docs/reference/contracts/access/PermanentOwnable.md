# PermanentOwnable

## Overview

#### License: MIT

```solidity
abstract contract PermanentOwnable
```

The PermanentOwnable module

Contract module which provides a basic access control mechanism, where there is
an account (an owner) that can be granted exclusive access to specific functions.

The owner is set to the address provided by the deployer. The ownership cannot be further changed.

This module will make available the modifier `onlyOwner`, which can be applied
to your functions to restrict their use to the owners.
## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```

Throws if called by any account other than the owner.
## Functions info

### owner (0x8da5cb5b)

```solidity
function owner() public view virtual returns (address)
```

Returns the address of the owner.


Return values:

| Name | Type    | Description          |
| :--- | :------ | :------------------- |
| [0]  | address | the permanent owner. |
