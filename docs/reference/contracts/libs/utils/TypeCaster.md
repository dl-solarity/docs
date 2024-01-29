# TypeCaster

## Overview

#### License: MIT

```solidity
library TypeCaster
```

This library simplifies non-obvious type castings.

Convertions from static to dynamic arrays, singleton arrays, and arrays of different types are supported.
## Functions info

### asUint256Array

```solidity
function asUint256Array(
    bytes32[] memory from_
) internal pure returns (uint256[] memory array_)
```

The function that casts the bytes32 array to the uint256 array


Parameters:

| Name  | Type      | Description         |
| :---- | :-------- | :------------------ |
| from_ | bytes32[] | the bytes32 array   |


Return values:

| Name   | Type      | Description       |
| :----- | :-------- | :---------------- |
| array_ | uint256[] | the uint256 array |

### asUint256Array

```solidity
function asUint256Array(
    address[] memory from_
) internal pure returns (uint256[] memory array_)
```

The function that casts the address array to the uint256 array
### asAddressArray

```solidity
function asAddressArray(
    bytes32[] memory from_
) internal pure returns (address[] memory array_)
```

The function that casts the bytes32 array to the address array


Parameters:

| Name  | Type      | Description         |
| :---- | :-------- | :------------------ |
| from_ | bytes32[] | the bytes32 array   |


Return values:

| Name   | Type      | Description           |
| :----- | :-------- | :-------------------- |
| array_ | address[] | the list of addresses |

### asAddressArray

```solidity
function asAddressArray(
    uint256[] memory from_
) internal pure returns (address[] memory array_)
```

The function that casts the uint256 array to the address array
### asBytes32Array

```solidity
function asBytes32Array(
    uint256[] memory from_
) internal pure returns (bytes32[] memory array_)
```

The function that casts the uint256 array to the bytes32 array


Parameters:

| Name  | Type      | Description         |
| :---- | :-------- | :------------------ |
| from_ | uint256[] | the bytes32 array   |


Return values:

| Name   | Type      | Description           |
| :----- | :-------- | :-------------------- |
| array_ | bytes32[] | the list of addresses |

### asBytes32Array

```solidity
function asBytes32Array(
    address[] memory from_
) internal pure returns (bytes32[] memory array_)
```

The function that casts the address array to the bytes32 array
### asSingletonArray

```solidity
function asSingletonArray(
    uint256 from_
) internal pure returns (uint256[] memory array_)
```

The function to transform a uint256 element into an array


Parameters:

| Name  | Type    | Description   |
| :---- | :------ | :------------ |
| from_ | uint256 | the element   |


Return values:

| Name   | Type      | Description             |
| :----- | :-------- | :---------------------- |
| array_ | uint256[] | the element as an array |

### asSingletonArray

```solidity
function asSingletonArray(
    address from_
) internal pure returns (address[] memory array_)
```

The function to transform an address element into an array
### asSingletonArray

```solidity
function asSingletonArray(
    bool from_
) internal pure returns (bool[] memory array_)
```

The function to transform a bool element into an array
### asSingletonArray

```solidity
function asSingletonArray(
    string memory from_
) internal pure returns (string[] memory array_)
```

The function to transform a string element into an array
### asSingletonArray

```solidity
function asSingletonArray(
    bytes32 from_
) internal pure returns (bytes32[] memory array_)
```

The function to transform a bytes32 element into an array
### asDynamic

```solidity
function asDynamic(
    uint256[1] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static uint256[1] array to dynamic


Parameters:

| Name    | Type       | Description                   |
| :------ | :--------- | :---------------------------- |
| static_ | uint256[1] | the static array to convert   |


Return values:

| Name     | Type      | Description                 |
| :------- | :-------- | :-------------------------- |
| dynamic_ | uint256[] | the converted dynamic array |

### asDynamic

```solidity
function asDynamic(
    uint256[2] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static uint256[2] array to dynamic
### asDynamic

```solidity
function asDynamic(
    uint256[3] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static uint256[3] array to dynamic
### asDynamic

```solidity
function asDynamic(
    uint256[4] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static uint256[4] array to dynamic
### asDynamic

```solidity
function asDynamic(
    uint256[5] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static uint256[5] array to dynamic
### asDynamic

```solidity
function asDynamic(
    address[1] memory static_
) internal pure returns (address[] memory dynamic_)
```

The function to convert static address[1] array to dynamic
### asDynamic

```solidity
function asDynamic(
    address[2] memory static_
) internal pure returns (address[] memory dynamic_)
```

The function to convert static address[2] array to dynamic
### asDynamic

```solidity
function asDynamic(
    address[3] memory static_
) internal pure returns (address[] memory dynamic_)
```

The function to convert static address[3] array to dynamic
### asDynamic

```solidity
function asDynamic(
    address[4] memory static_
) internal pure returns (address[] memory dynamic_)
```

The function to convert static address[4] array to dynamic
### asDynamic

```solidity
function asDynamic(
    address[5] memory static_
) internal pure returns (address[] memory dynamic_)
```

The function to convert static address[5] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bool[1] memory static_
) internal pure returns (bool[] memory dynamic_)
```

The function to convert static bool[1] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bool[2] memory static_
) internal pure returns (bool[] memory dynamic_)
```

The function to convert static bool[2] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bool[3] memory static_
) internal pure returns (bool[] memory dynamic_)
```

The function to convert static bool[3] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bool[4] memory static_
) internal pure returns (bool[] memory dynamic_)
```

The function to convert static bool[4] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bool[5] memory static_
) internal pure returns (bool[] memory dynamic_)
```

The function to convert static bool[5] array to dynamic
### asDynamic

```solidity
function asDynamic(
    string[1] memory static_
) internal pure returns (string[] memory dynamic_)
```

The function to convert static string[1] array to dynamic
### asDynamic

```solidity
function asDynamic(
    string[2] memory static_
) internal pure returns (string[] memory dynamic_)
```

The function to convert static string[2] array to dynamic
### asDynamic

```solidity
function asDynamic(
    string[3] memory static_
) internal pure returns (string[] memory dynamic_)
```

The function to convert static string[3] array to dynamic
### asDynamic

```solidity
function asDynamic(
    string[4] memory static_
) internal pure returns (string[] memory dynamic_)
```

The function to convert static string[4] array to dynamic
### asDynamic

```solidity
function asDynamic(
    string[5] memory static_
) internal pure returns (string[] memory dynamic_)
```

The function to convert static string[5] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bytes32[1] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

The function to convert static bytes32[1] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bytes32[2] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

The function to convert static bytes32[2] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bytes32[3] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

The function to convert static bytes32[3] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bytes32[4] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

The function to convert static bytes32[4] array to dynamic
### asDynamic

```solidity
function asDynamic(
    bytes32[5] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

The function to convert static bytes32[5] array to dynamic