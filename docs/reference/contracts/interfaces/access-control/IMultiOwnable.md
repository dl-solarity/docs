# IMultiOwnable

## Interface Description


License: MIT

## 

```solidity
interface IMultiOwnable
```

The MultiOwnable module
## Events info

### OwnersAdded

```solidity
event OwnersAdded(address[] newOwners)
```


### OwnersRemoved

```solidity
event OwnersRemoved(address[] removedOwners)
```


## Functions info

### addOwners (0x6c46a2c5)

```solidity
function addOwners(address[] calldata newOwners_) external
```

Owner can add new owners to the contract's owners list.


Parameters:

| Name       | Type      | Description                               |
| :--------- | :-------- | :---------------------------------------- |
| newOwners_ | address[] | the array of addresses to add to _owners. |

### removeOwners (0xa9a5e3af)

```solidity
function removeOwners(address[] calldata oldOwners_) external
```

Owner can remove the array of owners from the contract's owners list.


Parameters:

| Name       | Type      | Description                                   |
| :--------- | :-------- | :-------------------------------------------- |
| oldOwners_ | address[] | the array of addresses to remove from _owners |

### renounceOwnership (0x715018a6)

```solidity
function renounceOwnership() external
```

Allows to remove yourself from list of owners.
     
Note: renouncing ownership may leave the contract without an owner,
thereby disabling any functionality that is only available to the owner.
### getOwners (0xa0e67e2b)

```solidity
function getOwners() external view returns (address[] memory)
```

Returns the addresses of the current owners.

Returns a copy of the whole Set of owners.


Return values:

| Name | Type      | Description             |
| :--- | :-------- | :---------------------- |
| [0]  | address[] | the array of addresses. |

### isOwner (0x2f54bf6e)

```solidity
function isOwner(address address_) external view returns (bool)
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
