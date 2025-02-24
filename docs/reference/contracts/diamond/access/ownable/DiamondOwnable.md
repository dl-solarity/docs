# DiamondOwnable

## Overview

#### License: MIT

```solidity
contract DiamondOwnable is ADiamondOwnableStorage
```

The Diamond standard module

This is modified version of OpenZeppelin's Ownable contract to be used as a Storage contract
by the Diamond Standard.
## Events info

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```


## Errors info

### InvalidOwner

```solidity
error InvalidOwner()
```


## Functions info

### transferOwnership (0xf2fde38b)

```solidity
function transferOwnership(address newOwner_) public virtual onlyOwner
```

The function to transfer the Diamond ownership


Parameters:

| Name      | Type    | Description                  |
| :-------- | :------ | :--------------------------- |
| newOwner_ | address | the new owner of the Diamond |

### renounceOwnership (0x715018a6)

```solidity
function renounceOwnership() public virtual onlyOwner
```

The function to leave Diamond without an owner