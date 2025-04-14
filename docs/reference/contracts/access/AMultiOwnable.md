# AMultiOwnable

## Overview

#### License: MIT

```solidity
abstract contract AMultiOwnable is IMultiOwnable, Initializable
```

The MultiOwnable module

Contract module which provides a basic access control mechanism, where there is a list of
owner addresses those can be granted exclusive access to specific functions.

All owners are equal in their access, they can add new owners, also remove each other and themselves.

By default, the owner account will be the one that deploys the contract.

This module will make available the modifier `onlyOwner`, which can be applied
to your functions to restrict their use to the owners.
## Structs info

### AMultiOwnableStorage

```solidity
struct AMultiOwnableStorage {
	EnumerableSet.AddressSet owners;
}
```


## Errors info

### InvalidOwner

```solidity
error InvalidOwner()
```


### UnauthorizedAccount

```solidity
error UnauthorizedAccount(address account)
```


## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```


## Functions info

### addOwners (0x6c46a2c5)

```solidity
function addOwners(address[] memory newOwners_) public override onlyOwner
```

The function to add equally rightful owners to the contract


Parameters:

| Name       | Type      | Description            |
| :--------- | :-------- | :--------------------- |
| newOwners_ | address[] | the owners to be added |

### removeOwners (0xa9a5e3af)

```solidity
function removeOwners(address[] memory oldOwners_) public override onlyOwner
```

The function to remove owners from the contract


Parameters:

| Name       | Type      | Description                                                 |
| :--------- | :-------- | :---------------------------------------------------------- |
| oldOwners_ | address[] | the owners to be removed. Note that one can remove themself |

### renounceOwnership (0x715018a6)

```solidity
function renounceOwnership() public override onlyOwner
```

The function to remove yourself from the owners list

Note: renouncing ownership may leave the contract without an owner,
thereby disabling any functionality that is only available to the owner.
### getOwners (0xa0e67e2b)

```solidity
function getOwners() public view override returns (address[] memory)
```

The function to get the list of current owners. Be careful, O(n) complexity


Return values:

| Name | Type      | Description                |
| :--- | :-------- | :------------------------- |
| [0]  | address[] | the list of current owners |

### isOwner (0x2f54bf6e)

```solidity
function isOwner(address address_) public view override returns (bool)
```

The function to check the ownership of a user


Parameters:

| Name     | Type    | Description        |
| :------- | :------ | :----------------- |
| address_ | address | the user to check  |


Return values:

| Name | Type | Description                                |
| :--- | :--- | :----------------------------------------- |
| [0]  | bool | true if address_ is owner, false otherwise |
