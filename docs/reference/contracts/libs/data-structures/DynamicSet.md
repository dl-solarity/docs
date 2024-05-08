# DynamicSet

## Overview

#### License: MIT

```solidity
library DynamicSet
```

Dynamic Set Library

This library provides implementation of two sets with dynamic data types: `BytesSet` and `StingSet`.
The library can also be used to create sets that store custom structures via ABI encoding.

## Usage example:

```
using DynamicSet for DynamicSet.BytesSet;

DynamicSet.BytesSet internal _set;
```
## Structs info

### BytesSet

```solidity
struct BytesSet {
	DynamicSet.Set _inner;
}
```

BytesSet     *
### StringSet

```solidity
struct StringSet {
	DynamicSet.Set _inner;
}
```

StringSet     *
### Set

```solidity
struct Set {
	bytes[] _values;
	mapping(bytes32 => uint256) _indexes;
}
```


## Functions info

### add

```solidity
function add(
    DynamicSet.BytesSet storage set,
    bytes memory value_
) internal returns (bool)
```

The function to add a bytes value to the set


Parameters:

| Name   | Type                       | Description                     |
| :----- | :------------------------- | :------------------------------ |
| set    | struct DynamicSet.BytesSet | The BytesSet storage reference  |
| value_ | bytes                      | The value to be added           |


Return values:

| Name | Type | Description                                               |
| :--- | :--- | :-------------------------------------------------------- |
| [0]  | bool | True if the value was added successfully, false otherwise |

### remove

```solidity
function remove(
    DynamicSet.BytesSet storage set,
    bytes memory value_
) internal returns (bool)
```

The function to remove a bytes value from the set


Parameters:

| Name   | Type                       | Description                     |
| :----- | :------------------------- | :------------------------------ |
| set    | struct DynamicSet.BytesSet | The BytesSet storage reference  |
| value_ | bytes                      | The value to be removed         |


Return values:

| Name | Type | Description                                                 |
| :--- | :--- | :---------------------------------------------------------- |
| [0]  | bool | True if the value was removed successfully, false otherwise |

### contains

```solidity
function contains(
    DynamicSet.BytesSet storage set,
    bytes memory value_
) internal view returns (bool)
```

The function to check if a value is contained in the set


Parameters:

| Name   | Type                       | Description                     |
| :----- | :------------------------- | :------------------------------ |
| set    | struct DynamicSet.BytesSet | The BytesSet storage reference  |
| value_ | bytes                      | The value to be checked         |


Return values:

| Name | Type | Description                                                |
| :--- | :--- | :--------------------------------------------------------- |
| [0]  | bool | True if the value is contained in the set, false otherwise |

### length

```solidity
function length(
    DynamicSet.BytesSet storage set
) internal view returns (uint256)
```

The function to get the number of values in the set


Parameters:

| Name | Type                       | Description                     |
| :--- | :------------------------- | :------------------------------ |
| set  | struct DynamicSet.BytesSet | The BytesSet storage reference  |


Return values:

| Name | Type    | Description                     |
| :--- | :------ | :------------------------------ |
| [0]  | uint256 | The number of values in the set |

### at

```solidity
function at(
    DynamicSet.BytesSet storage set,
    uint256 index_
) internal view returns (bytes memory)
```

The function to get the value at the specified index in the set


Parameters:

| Name   | Type                       | Description                         |
| :----- | :------------------------- | :---------------------------------- |
| set    | struct DynamicSet.BytesSet | The BytesSet storage reference      |
| index_ | uint256                    | The index of the value to retrieve  |


Return values:

| Name | Type  | Description                      |
| :--- | :---- | :------------------------------- |
| [0]  | bytes | The value at the specified index |

### values

```solidity
function values(
    DynamicSet.BytesSet storage set
) internal view returns (bytes[] memory)
```

The function to get an array containing all values in the set


Parameters:

| Name | Type                       | Description                     |
| :--- | :------------------------- | :------------------------------ |
| set  | struct DynamicSet.BytesSet | The BytesSet storage reference  |


Return values:

| Name | Type    | Description                               |
| :--- | :------ | :---------------------------------------- |
| [0]  | bytes[] | An array containing all values in the set |

### add

```solidity
function add(
    DynamicSet.StringSet storage set,
    string memory value_
) internal returns (bool)
```

The function to add a string value to the set


Parameters:

| Name   | Type                        | Description                      |
| :----- | :-------------------------- | :------------------------------- |
| set    | struct DynamicSet.StringSet | The StringSet storage reference  |
| value_ | string                      | The value to be added            |


Return values:

| Name | Type | Description                                               |
| :--- | :--- | :-------------------------------------------------------- |
| [0]  | bool | True if the value was added successfully, false otherwise |

### remove

```solidity
function remove(
    DynamicSet.StringSet storage set,
    string memory value_
) internal returns (bool)
```

The function to remove a string value from the set


Parameters:

| Name   | Type                        | Description                      |
| :----- | :-------------------------- | :------------------------------- |
| set    | struct DynamicSet.StringSet | The StringSet storage reference  |
| value_ | string                      | The value to be removed          |


Return values:

| Name | Type | Description                                                 |
| :--- | :--- | :---------------------------------------------------------- |
| [0]  | bool | True if the value was removed successfully, false otherwise |

### contains

```solidity
function contains(
    DynamicSet.StringSet storage set,
    string memory value_
) internal view returns (bool)
```

The function to check if a value is contained in the set


Parameters:

| Name   | Type                        | Description                      |
| :----- | :-------------------------- | :------------------------------- |
| set    | struct DynamicSet.StringSet | The StringSet storage reference  |
| value_ | string                      | The value to be checked          |


Return values:

| Name | Type | Description                                                |
| :--- | :--- | :--------------------------------------------------------- |
| [0]  | bool | True if the value is contained in the set, false otherwise |

### length

```solidity
function length(
    DynamicSet.StringSet storage set
) internal view returns (uint256)
```

The function to get the number of values in the set


Parameters:

| Name | Type                        | Description                      |
| :--- | :-------------------------- | :------------------------------- |
| set  | struct DynamicSet.StringSet | The StringSet storage reference  |


Return values:

| Name | Type    | Description                     |
| :--- | :------ | :------------------------------ |
| [0]  | uint256 | The number of values in the set |

### at

```solidity
function at(
    DynamicSet.StringSet storage set,
    uint256 index_
) internal view returns (string memory)
```

The function to get the value at the specified index in the set


Parameters:

| Name   | Type                        | Description                         |
| :----- | :-------------------------- | :---------------------------------- |
| set    | struct DynamicSet.StringSet | The StringSet storage reference     |
| index_ | uint256                     | The index of the value to retrieve  |


Return values:

| Name | Type   | Description                      |
| :--- | :----- | :------------------------------- |
| [0]  | string | The value at the specified index |

### values

```solidity
function values(
    DynamicSet.StringSet storage set
) internal view returns (string[] memory values_)
```

The function to get an array containing all values in the set


Parameters:

| Name | Type                        | Description                      |
| :--- | :-------------------------- | :------------------------------- |
| set  | struct DynamicSet.StringSet | The StringSet storage reference  |


Return values:

| Name    | Type     | Description                               |
| :------ | :------- | :---------------------------------------- |
| values_ | string[] | An array containing all values in the set |

### _add

```solidity
function _add(
    DynamicSet.Set storage set,
    bytes memory value_
) internal returns (bool)
```


### _remove

```solidity
function _remove(
    DynamicSet.Set storage set,
    bytes memory value_
) internal returns (bool)
```


### _contains

```solidity
function _contains(
    DynamicSet.Set storage set,
    bytes memory value_
) internal view returns (bool)
```


### _length

```solidity
function _length(DynamicSet.Set storage set) internal view returns (uint256)
```


### _at

```solidity
function _at(
    DynamicSet.Set storage set,
    uint256 index_
) internal view returns (bytes memory)
```


### _values

```solidity
function _values(
    DynamicSet.Set storage set
) internal view returns (bytes[] memory)
```

