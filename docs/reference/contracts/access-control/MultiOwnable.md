# MultiOwnable

## Abstract Contract Description


License: MIT

## 

```solidity
abstract contract MultiOwnable is IMultiOwnable, Initializable
```

The MultiOwnable module

Contract module which provides a basic access control mechanism, where there is a list of
owner addresses those can be granted exclusive access to specific functions.
All owners are equal in their access, they can add new owners, also remove each other and themself.

By default, the owner account will be the one that deploys the contract.

This module will make available the modifier `onlyOwner`, which can be applied
to your functions to restrict their use to the owners.
## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```


## Functions info

### addOwners (0x6c46a2c5)

```solidity
function addOwners(
    address[] memory newOwners_
) public virtual override onlyOwner
```

Owner can add new owners to the contract's owners list.


Parameters:

| Name       | Type      | Description                               |
| :--------- | :-------- | :---------------------------------------- |
| newOwners_ | address[] | the array of addresses to add to _owners. |

### removeOwners (0xa9a5e3af)

```solidity
function removeOwners(
    address[] memory oldOwners_
) public virtual override onlyOwner
```

Owner can remove the array of owners from the contract's owners list.


Parameters:

| Name       | Type      | Description                                   |
| :--------- | :-------- | :-------------------------------------------- |
| oldOwners_ | address[] | the array of addresses to remove from _owners |

### renounceOwnership (0x715018a6)

```solidity
function renounceOwnership() public virtual override onlyOwner
```

Allows to remove yourself from list of owners.
     
Note: renouncing ownership may leave the contract without an owner,
thereby disabling any functionality that is only available to the owner.
### getOwners (0xa0e67e2b)

```solidity
function getOwners() public view virtual override returns (address[] memory)
```

Returns the addresses of the current owners.

Returns a copy of the whole Set of owners.


Return values:

| Name | Type      | Description             |
| :--- | :-------- | :---------------------- |
| [0]  | address[] | the array of addresses. |

### isOwner (0x2f54bf6e)

```solidity
function isOwner(address address_) public view virtual override returns (bool)
```

Returns true if address is in the contract's owners list.


Parameters:

| Name     | Type    | Description            |
| :------- | :------ | :--------------------- |
| address_ | address | the address to check.  |


Return values:

| Name | Type | Description                      |
| :--- | :--- | :------------------------------- |
| [0]  | bool | whether the _address in _owners. |
