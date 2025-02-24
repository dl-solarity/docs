# ArrayHelper

## Overview

#### License: MIT

```solidity
library ArrayHelper
```

A simple library to work with arrays
## Errors info

### InvalidRange

```solidity
error InvalidRange(uint256 beginIndex, uint256 endIndex)
```


## Functions info

### lowerBound

```solidity
function lowerBound(
    uint256[] storage array,
    uint256 element_
) internal view returns (uint256 index_)
```

The function that searches for the index of the first occurring element, which is
greater than or equal to the `element_`. The time complexity is O(log n)


Parameters:

| Name     | Type      | Description             |
| :------- | :-------- | :---------------------- |
| array    | uint256[] | the array to search in  |
| element_ | uint256   | the element             |


Return values:

| Name   | Type    | Description                                                                    |
| :----- | :------ | :----------------------------------------------------------------------------- |
| index_ | uint256 | the index of the found element or the length of the `array` if no such element |

### upperBound

```solidity
function upperBound(
    uint256[] storage array,
    uint256 element_
) internal view returns (uint256 index_)
```

The function that searches for the index of the first occurring element, which is
greater than the `element_`. The time complexity is O(log n)


Parameters:

| Name     | Type      | Description             |
| :------- | :-------- | :---------------------- |
| array    | uint256[] | the array to search in  |
| element_ | uint256   | the element             |


Return values:

| Name   | Type    | Description                                                                    |
| :----- | :------ | :----------------------------------------------------------------------------- |
| index_ | uint256 | the index of the found element or the length of the `array` if no such element |

### contains

```solidity
function contains(
    uint256[] storage array,
    uint256 element_
) internal view returns (bool)
```

The function that searches for the `element_` and returns whether it is present in the array.
The time complexity is O(log n)


Parameters:

| Name     | Type      | Description             |
| :------- | :-------- | :---------------------- |
| array    | uint256[] | the array to search in  |
| element_ | uint256   | the element             |


Return values:

| Name | Type | Description                                    |
| :--- | :--- | :--------------------------------------------- |
| [0]  | bool | whether the `element_` is present in the array |

### getRangeSum

```solidity
function getRangeSum(
    uint256[] storage prefixes,
    uint256 beginIndex_,
    uint256 endIndex_
) internal view returns (uint256)
```

The function that calculates the sum of all array elements from `beginIndex_` to
`endIndex_` inclusive using its prefix sum array


Parameters:

| Name        | Type    | Description                           |
| :---------- | :------ | :------------------------------------ |
| beginIndex_ | uint256 | the index of the first range element  |
| endIndex_   | uint256 | the index of the last range element   |


Return values:

| Name | Type    | Description                          |
| :--- | :------ | :----------------------------------- |
| [0]  | uint256 | the sum of all elements of the range |

### countPrefixes

```solidity
function countPrefixes(
    uint256[] memory arr_
) internal pure returns (uint256[] memory prefixes_)
```

The function to compute the prefix sum array


Parameters:

| Name | Type      | Description                                               |
| :--- | :-------- | :-------------------------------------------------------- |
| arr_ | uint256[] | the initial array to be turned into the prefix sum array  |


Return values:

| Name      | Type      | Description          |
| :-------- | :-------- | :------------------- |
| prefixes_ | uint256[] | the prefix sum array |

### reverse

```solidity
function reverse(
    uint256[] memory arr_
) internal pure returns (uint256[] memory reversed_)
```

The function to reverse a uint256 array


Parameters:

| Name | Type      | Description           |
| :--- | :-------- | :-------------------- |
| arr_ | uint256[] | the array to reverse  |


Return values:

| Name      | Type      | Description        |
| :-------- | :-------- | :----------------- |
| reversed_ | uint256[] | the reversed array |

### reverse

```solidity
function reverse(
    address[] memory arr_
) internal pure returns (address[] memory reversed_)
```

The function to reverse an address array
### reverse

```solidity
function reverse(
    bool[] memory arr_
) internal pure returns (bool[] memory reversed_)
```

The function to reverse a bool array
### reverse

```solidity
function reverse(
    string[] memory arr_
) internal pure returns (string[] memory reversed_)
```

The function to reverse a string array
### reverse

```solidity
function reverse(
    bytes32[] memory arr_
) internal pure returns (bytes32[] memory reversed_)
```

The function to reverse a bytes32 array
### insert

```solidity
function insert(
    uint256[] memory to_,
    uint256 index_,
    uint256[] memory what_
) internal pure returns (uint256)
```

The function to insert a uint256 array into the other array


Parameters:

| Name   | Type      | Description                   |
| :----- | :-------- | :---------------------------- |
| to_    | uint256[] | the array to insert into      |
| index_ | uint256   | the insertion starting index  |
| what_  | uint256[] | the array to be inserted      |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | the index to start the next insertion from |

### insert

```solidity
function insert(
    address[] memory to_,
    uint256 index_,
    address[] memory what_
) internal pure returns (uint256)
```

The function to insert an address array into the other array
### insert

```solidity
function insert(
    bool[] memory to_,
    uint256 index_,
    bool[] memory what_
) internal pure returns (uint256)
```

The function to insert a bool array into the other array
### insert

```solidity
function insert(
    string[] memory to_,
    uint256 index_,
    string[] memory what_
) internal pure returns (uint256)
```

The function to insert a string array into the other array
### insert

```solidity
function insert(
    bytes32[] memory to_,
    uint256 index_,
    bytes32[] memory what_
) internal pure returns (uint256)
```

The function to insert a bytes32 array into the other array
### crop

```solidity
function crop(
    uint256[] memory array_,
    uint256 newLength_
) internal pure returns (uint256[] memory)
```

The function to crop a uint256 array


Parameters:

| Name       | Type      | Description                                            |
| :--------- | :-------- | :----------------------------------------------------- |
| array_     | uint256[] | the array to crop                                      |
| newLength_ | uint256   | the new length of the array (has to be less or equal)  |


Return values:

| Name | Type      | Description          |
| :--- | :-------- | :------------------- |
| [0]  | uint256[] | ref to cropped array |

### crop

```solidity
function crop(
    address[] memory array_,
    uint256 newLength_
) internal pure returns (address[] memory)
```

The function to crop an address array
### crop

```solidity
function crop(
    bool[] memory array_,
    uint256 newLength_
) internal pure returns (bool[] memory)
```

The function to crop a bool array
### crop

```solidity
function crop(
    string[] memory array_,
    uint256 newLength_
) internal pure returns (string[] memory)
```

The function to crop a string array
### crop

```solidity
function crop(
    bytes32[] memory array_,
    uint256 newLength_
) internal pure returns (bytes32[] memory)
```

The function to crop a bytes32 array