# TypeCaster

## Library Description


License: MIT

## 

```solidity
library TypeCaster
```

This library simplifies non-obvious type castings
## Functions info

### asUint256Array

```solidity
function asUint256Array(
    bytes32[] memory from_
) internal pure returns (uint256[] memory array_)
```

The function that casts the list of `X`-type elements to the list of uint256


Parameters:

| Name  | Type      | Description                    |
| :---- | :-------- | :----------------------------- |
| from_ | bytes32[] | the list of `X`-type elements  |


Return values:

| Name   | Type      | Description         |
| :----- | :-------- | :------------------ |
| array_ | uint256[] | the list of uint256 |

### asUint256Array

```solidity
function asUint256Array(
    address[] memory from_
) internal pure returns (uint256[] memory array_)
```


### asAddressArray

```solidity
function asAddressArray(
    bytes32[] memory from_
) internal pure returns (address[] memory array_)
```

The function that casts the list of `X`-type elements to the list of addresses


Parameters:

| Name  | Type      | Description                    |
| :---- | :-------- | :----------------------------- |
| from_ | bytes32[] | the list of `X`-type elements  |


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


### asBytes32Array

```solidity
function asBytes32Array(
    uint256[] memory from_
) internal pure returns (bytes32[] memory array_)
```

The function that casts the list of `X`-type elements to the list of bytes32


Parameters:

| Name  | Type      | Description                    |
| :---- | :-------- | :----------------------------- |
| from_ | uint256[] | the list of `X`-type elements  |


Return values:

| Name   | Type      | Description         |
| :----- | :-------- | :------------------ |
| array_ | bytes32[] | the list of bytes32 |

### asBytes32Array

```solidity
function asBytes32Array(
    address[] memory from_
) internal pure returns (bytes32[] memory array_)
```


### asSingletonArray

```solidity
function asSingletonArray(
    uint256 from_
) internal pure returns (uint256[] memory array_)
```

The function to transform an element into an array


Parameters:

| Name  | Type    | Description  |
| :---- | :------ | :----------- |
| from_ | uint256 | the element  |


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


### asSingletonArray

```solidity
function asSingletonArray(
    bool from_
) internal pure returns (bool[] memory array_)
```


### asSingletonArray

```solidity
function asSingletonArray(
    string memory from_
) internal pure returns (string[] memory array_)
```


### asSingletonArray

```solidity
function asSingletonArray(
    bytes32 from_
) internal pure returns (bytes32[] memory array_)
```


### asDynamic

```solidity
function asDynamic(
    uint256[1] memory static_
) internal pure returns (uint256[] memory dynamic_)
```

The function to convert static array to dynamic


Parameters:

| Name    | Type       | Description                  |
| :------ | :--------- | :--------------------------- |
| static_ | uint256[1] | the static array to convert  |


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


### asDynamic

```solidity
function asDynamic(
    uint256[3] memory static_
) internal pure returns (uint256[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    uint256[4] memory static_
) internal pure returns (uint256[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    uint256[5] memory static_
) internal pure returns (uint256[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    address[1] memory static_
) internal pure returns (address[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    address[2] memory static_
) internal pure returns (address[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    address[3] memory static_
) internal pure returns (address[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    address[4] memory static_
) internal pure returns (address[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    address[5] memory static_
) internal pure returns (address[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bool[1] memory static_
) internal pure returns (bool[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bool[2] memory static_
) internal pure returns (bool[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bool[3] memory static_
) internal pure returns (bool[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bool[4] memory static_
) internal pure returns (bool[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bool[5] memory static_
) internal pure returns (bool[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    string[1] memory static_
) internal pure returns (string[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    string[2] memory static_
) internal pure returns (string[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    string[3] memory static_
) internal pure returns (string[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    string[4] memory static_
) internal pure returns (string[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    string[5] memory static_
) internal pure returns (string[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bytes32[1] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bytes32[2] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bytes32[3] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bytes32[4] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```


### asDynamic

```solidity
function asDynamic(
    bytes32[5] memory static_
) internal pure returns (bytes32[] memory dynamic_)
```

