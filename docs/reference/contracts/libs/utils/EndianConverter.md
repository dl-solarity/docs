# EndianConverter

## Overview

#### License: MIT

```solidity
library EndianConverter
```

A library with functions for converting between little-endian and big-endian formats
## Functions info

### bytes2BEtoLE

```solidity
function bytes2BEtoLE(bytes2 input_) internal pure returns (bytes2)
```

Converts big-endian bytes2 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes2 | The bytes2 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | bytes2 | The bytes2 in little-endian encoding |

### bytes4BEtoLE

```solidity
function bytes4BEtoLE(bytes4 input_) internal pure returns (bytes4)
```

Converts big-endian bytes4 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes4 | The bytes4 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | bytes4 | The bytes4 in little-endian encoding |

### bytes8BEtoLE

```solidity
function bytes8BEtoLE(bytes8 input_) internal pure returns (bytes8)
```

Converts big-endian bytes8 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes8 | The bytes8 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | bytes8 | The bytes8 in little-endian encoding |

### bytes16BEtoLE

```solidity
function bytes16BEtoLE(bytes16 input_) internal pure returns (bytes16)
```

Converts big-endian bytes16 to little-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | bytes16 | The bytes16 to convert  |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | bytes16 | The bytes16 in little-endian encoding |

### bytes32BEtoLE

```solidity
function bytes32BEtoLE(bytes32 input_) internal pure returns (bytes32)
```

Converts big-endian bytes32 to little-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | bytes32 | The bytes32 to convert  |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | bytes32 | The bytes32 in little-endian encoding |

### bytes2LEtoBE

```solidity
function bytes2LEtoBE(bytes2 input_) internal pure returns (bytes2)
```

Converts little-endian bytes2 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes2 | The bytes2 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | bytes2 | The bytes2 in big-endian encoding |

### bytes4LEtoBE

```solidity
function bytes4LEtoBE(bytes4 input_) internal pure returns (bytes4)
```

Converts little-endian bytes4 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes4 | The bytes4 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | bytes4 | The bytes4 in big-endian encoding |

### bytes8LEtoBE

```solidity
function bytes8LEtoBE(bytes8 input_) internal pure returns (bytes8)
```

Converts little-endian bytes8 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | bytes8 | The bytes8 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | bytes8 | The bytes8 in big-endian encoding |

### bytes16LEtoBE

```solidity
function bytes16LEtoBE(bytes16 input_) internal pure returns (bytes16)
```

Converts little-endian bytes16 to big-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | bytes16 | The bytes16 to convert  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | bytes16 | The bytes16 in big-endian encoding |

### bytes32LEtoBE

```solidity
function bytes32LEtoBE(bytes32 input_) internal pure returns (bytes32)
```

Converts little-endian bytes32 to big-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | bytes32 | The bytes32 to convert  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | bytes32 | The bytes32 in big-endian encoding |

### uint16BEtoLE

```solidity
function uint16BEtoLE(uint16 input_) internal pure returns (uint16)
```

Converts big-endian uint16 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint16 | The uint16 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | uint16 | The uint16 in little-endian encoding |

### uint32BEtoLE

```solidity
function uint32BEtoLE(uint32 input_) internal pure returns (uint32)
```

Converts big-endian uint32 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint32 | The uint32 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | uint32 | The uint32 in little-endian encoding |

### uint64BEtoLE

```solidity
function uint64BEtoLE(uint64 input_) internal pure returns (uint64)
```

Converts big-endian uint64 to little-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint64 | The uint64 to convert  |


Return values:

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| [0]  | uint64 | The uint64 in little-endian encoding |

### uint128BEtoLE

```solidity
function uint128BEtoLE(uint128 input_) internal pure returns (uint128)
```

Converts big-endian uint128 to little-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | uint128 | The uint128 to convert  |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | uint128 | The uint128 in little-endian encoding |

### uint256BEtoLE

```solidity
function uint256BEtoLE(uint256 input_) internal pure returns (uint256)
```

Converts big-endian uint256 to little-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | uint256 | The uint256 to convert  |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | uint256 | The uint256 in little-endian encoding |

### uint16LEtoBE

```solidity
function uint16LEtoBE(uint16 input_) internal pure returns (uint16)
```

Converts little-endian uint16 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint16 | The uint16 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint16 | The uint16 in big-endian encoding |

### uint32LEtoBE

```solidity
function uint32LEtoBE(uint32 input_) internal pure returns (uint32)
```

Converts little-endian uint32 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint32 | The uint32 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint32 | The uint32 in big-endian encoding |

### uint64LEtoBE

```solidity
function uint64LEtoBE(uint64 input_) internal pure returns (uint64)
```

Converts little-endian uint64 to big-endian


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| input_ | uint64 | The uint64 to convert  |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint64 | The uint64 in big-endian encoding |

### uint128LEtoBE

```solidity
function uint128LEtoBE(uint128 input_) internal pure returns (uint128)
```

Converts little-endian uint128 to big-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | uint128 | The uint128 to convert  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | uint128 | The uint128 in big-endian encoding |

### uint256LEtoBE

```solidity
function uint256LEtoBE(uint256 input_) internal pure returns (uint256)
```

Converts little-endian uint256 to big-endian


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| input_ | uint256 | The uint256 to convert  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | uint256 | The uint256 in big-endian encoding |
