# SetHelper

## Overview

#### License: MIT

```solidity
library SetHelper
```

A simple library to work with Openzeppelin sets
## Functions info

### add

```solidity
function add(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function to insert an array of elements into the address set


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

The function to insert an array of elements into the uint256 set
### add

```solidity
function add(
    EnumerableSet.Bytes32Set storage set,
    bytes32[] memory array_
) internal
```

The function to insert an array of elements into the bytes32 set
### add

```solidity
function add(DynamicSet.BytesSet storage set, bytes[] memory array_) internal
```

The function to insert an array of elements into the bytes set
### add

```solidity
function add(DynamicSet.StringSet storage set, string[] memory array_) internal
```

The function to insert an array of elements into the string set
### strictAdd

```solidity
function strictAdd(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function for the strict insertion of an array of elements into the address set


Parameters:

| Name   | Type                            | Description                          |
| :----- | :------------------------------ | :----------------------------------- |
| set    | struct EnumerableSet.AddressSet | the set to insert the elements into  |
| array_ | address[]                       | the elements to be inserted          |

### strictAdd

```solidity
function strictAdd(
    EnumerableSet.UintSet storage set,
    uint256[] memory array_
) internal
```

The function for the strict insertion of an array of elements into the uint256 set
### strictAdd

```solidity
function strictAdd(
    EnumerableSet.Bytes32Set storage set,
    bytes32[] memory array_
) internal
```

The function for the strict insertion of an array of elements into the bytes32 set
### strictAdd

```solidity
function strictAdd(
    DynamicSet.BytesSet storage set,
    bytes[] memory array_
) internal
```

The function for the strict insertion of an array of elements into the bytes set
### strictAdd

```solidity
function strictAdd(
    DynamicSet.StringSet storage set,
    string[] memory array_
) internal
```

The function for the strict insertion of an array of elements into the string set
### remove

```solidity
function remove(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function to remove an array of elements from the address set


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

The function to remove an array of elements from the uint256 set
### remove

```solidity
function remove(
    EnumerableSet.Bytes32Set storage set,
    bytes32[] memory array_
) internal
```

The function to remove an array of elements from the bytes32 set
### remove

```solidity
function remove(
    DynamicSet.BytesSet storage set,
    bytes[] memory array_
) internal
```

The function to remove an array of elements from the bytes set
### remove

```solidity
function remove(
    DynamicSet.StringSet storage set,
    string[] memory array_
) internal
```

The function to remove an array of elements from the string set
### strictRemove

```solidity
function strictRemove(
    EnumerableSet.AddressSet storage set,
    address[] memory array_
) internal
```

The function for the strict removal of an array of elements from the address set


Parameters:

| Name   | Type                            | Description                          |
| :----- | :------------------------------ | :----------------------------------- |
| set    | struct EnumerableSet.AddressSet | the set to remove the elements from  |
| array_ | address[]                       | the elements to be removed           |

### strictRemove

```solidity
function strictRemove(
    EnumerableSet.UintSet storage set,
    uint256[] memory array_
) internal
```

The function for the strict removal of an array of elements from the uint256 set
### strictRemove

```solidity
function strictRemove(
    EnumerableSet.Bytes32Set storage set,
    bytes32[] memory array_
) internal
```

The function for the strict removal of an array of elements from the bytes32 set
### strictRemove

```solidity
function strictRemove(
    DynamicSet.BytesSet storage set,
    bytes[] memory array_
) internal
```

The function for the strict removal of an array of elements from the bytes set
### strictRemove

```solidity
function strictRemove(
    DynamicSet.StringSet storage set,
    string[] memory array_
) internal
```

The function for the strict removal of an array of elements from the string set