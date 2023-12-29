# SetHelper

## Library Description


License: MIT

## 

```solidity
library SetHelper
```

A simple library to work with sets
## Functions info

### add

```solidity
function add(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function to insert an array of elements into the set


Parameters:

| Name   | Type                            | Description                          |
| :----- | :------------------------------ | :----------------------------------- |
| set    | struct EnumerableSet.AddressSet | the set to insert the elements into  |
| array_ | address[]                       | the elements to be inserted          |

### add

```solidity
function add(
    EnumerableSet.UintSet storage set,
    uint256[] memory array_
) internal
```


### add

```solidity
function add(StringSet.Set storage set, string[] memory array_) internal
```


### remove

```solidity
function remove(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function to remove an array of elements from the set


Parameters:

| Name   | Type                            | Description                          |
| :----- | :------------------------------ | :----------------------------------- |
| set    | struct EnumerableSet.AddressSet | the set to remove the elements from  |
| array_ | address[]                       | the elements to be removed           |

### remove

```solidity
function remove(
    EnumerableSet.UintSet storage set,
    uint256[] memory array_
) internal
```


### remove

```solidity
function remove(StringSet.Set storage set, string[] memory array_) internal
```

