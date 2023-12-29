# StringSet

## Library Description


License: MIT

## 

```solidity
library StringSet
```

## Usage example:

```
using StringSet for StringSet.Set;

StringSet.Set internal set;
```
## Structs info

### Set

```solidity
struct Set {
	string[] _values;
	mapping(string => uint256) _indexes;
}
```


## Functions info

### add

```solidity
function add(
    StringSet.Set storage set,
    string memory value_
) internal returns (bool)
```

The function add value to set


Parameters:

| Name   | Type                 | Description      |
| :----- | :------------------- | :--------------- |
| set    | struct StringSet.Set | the set object   |
| value_ | string               | the value to add |

### remove

```solidity
function remove(
    StringSet.Set storage set,
    string memory value_
) internal returns (bool)
```

The function remove value to set


Parameters:

| Name   | Type                 | Description         |
| :----- | :------------------- | :------------------ |
| set    | struct StringSet.Set | the set object      |
| value_ | string               | the value to remove |

### contains

```solidity
function contains(
    StringSet.Set storage set,
    string memory value_
) internal view returns (bool)
```

The function returns true if value in the set


Parameters:

| Name   | Type                 | Description                 |
| :----- | :------------------- | :-------------------------- |
| set    | struct StringSet.Set | the set object              |
| value_ | string               | the value to search in set  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | true if value is in the set, false otherwise |

### length

```solidity
function length(StringSet.Set storage set) internal view returns (uint256)
```

The function returns length of set


Parameters:

| Name | Type                 | Description     |
| :--- | :------------------- | :-------------- |
| set  | struct StringSet.Set | the set object  |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | uint256 | the the number of elements in the set |

### at

```solidity
function at(
    StringSet.Set storage set,
    uint256 index_
) internal view returns (string memory)
```

The function returns value from set by index


Parameters:

| Name   | Type                 | Description               |
| :----- | :------------------- | :------------------------ |
| set    | struct StringSet.Set | the set object            |
| index_ | uint256              | the index of slot in set  |


Return values:

| Name | Type   | Description        |
| :--- | :----- | :----------------- |
| [0]  | string | the value at index |

### values

```solidity
function values(
    StringSet.Set storage set
) internal view returns (string[] memory)
```

The function that returns values the set stores, can be very expensive to call


Parameters:

| Name | Type                 | Description     |
| :--- | :------------------- | :-------------- |
| set  | struct StringSet.Set | the set object  |


Return values:

| Name | Type     | Description                |
| :--- | :------- | :------------------------- |
| [0]  | string[] | the memory array of values |
