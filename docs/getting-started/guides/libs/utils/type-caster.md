# ➡ Type Caster

## Introduction

The Type Caster library provides functions to simplify non-obvious type castings in Solidity. It supports conversions from static to dynamic arrays, singleton arrays, and arrays of different types.

## Functions

To use the library, you need to import it:

To use the `TypeCaster` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/utils/TypeCaster.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using TypeCaster for *;
```

### asUint256Array

```solidity
function asUint256Array(
    bytes32[] memory from_
) internal pure returns (uint256[] memory array_);
```

```solidity
function asUint256Array(
    address[] memory from_
) internal pure returns (uint256[] memory array_);
```

#### Description

Converts a `from_` array to a `uint256` array using assembly. Parameters `from_` and returned `array_` always a **memory** array.

#### Time complexity

Constant.

#### Example

```solidity
bytes32[] memory bytesArray_ = new bytes32[](2);
bytesArray_[0] = bytes32(0); 
bytesArray_[1] = bytes32(uint256(1));

uint256[] memory intArray_ = bytesArray_.asUint256Array(); // [0, 1]
```

### asAddressArray

```solidity
function asAddressArray(
    bytes32[] memory from_
) internal pure returns (address[] memory array_);
```

```solidity
function asAddressArray(
    uint256[] memory from_
) internal pure returns (address[] memory array_);
```

#### Description

Converts a `from_` array to a `address` array using assembly. Parameters `from_` and returned `array_` always a **memory** array.

#### Time complexity

Constant.

#### Example

```solidity
bytes32[] memory bytesArray_ = new bytes32[](2);
bytesArray_[0] = bytes32(0); 
bytesArray_[1] = bytes32(uint256(1));

address[] memory addressArray_ = bytesArray_.asAddressArray(); 
// [address(0), address(1)]
```

### asBytes32Array

```solidity
function asBytes32Array(
    uint256[] memory from_
) internal pure returns (bytes32[] memory array_);
```

```solidity
function asBytes32Array(
    address[] memory from_
) internal pure returns (bytes32[] memory array_);
```

#### Description

Converts a `from_` array to a `bytes32` array using assembly. Parameters `from_` and returned `array_` always a **memory** array.

#### Time complexity

Constant.

#### Example

```solidity
uint256[] memory intArr_ = new uint256[](2);
intArr_[0] = 0; 
intArr_[1] = 1;

bytes32[] memory bytesArr_ = intArr_.asBytes32Array(); // [bytes32(0), bytes32(1)]
```

### asSingletonArray

```solidity
function asSingletonArray(
    uint256 from_
) internal pure returns (uint256[] memory array_);
```

```solidity
function asSingletonArray(
    address from_
) internal pure returns (address[] memory array_);
```

```solidity
function asSingletonArray(
    bool from_
) internal pure returns (bool[] memory array_);
```

```solidity
function asSingletonArray(
    string memory from_
) internal pure returns (string[] memory array_);
```

```solidity
function asSingletonArray(
    bytes32 from_
) internal pure returns (bytes32[] memory array_);
```

#### Description

Converts a `from_` element into a singleton `array_`. Returned `array_` always a **memory** array.

#### Time complexity

Constant.

#### Example

```solidity
uint256 value_ = 1;

uint256[] memory arr_ = value_.asSingletonArray(); // [1]
```

### asDynamic

```solidity
function asDynamic(
    uint256[1..5] memory static_
) internal pure returns (uint256[] memory dynamic_);
```

```solidity
function asDynamic(
    address[1..5] memory static_
) internal pure returns (address[] memory dynamic_);
```

```solidity
function asDynamic(
    bool[1..5] memory static_
) internal pure returns (bool[] memory dynamic_);
```

```solidity
function asDynamic(
    string[1..5] memory static_
) internal pure returns (string[] memory dynamic_);
```

```solidity
function asDynamic(
    bytes32[1..5] memory static_
) internal pure returns (bytes32[] memory dynamic_);
```

#### Description

Converts a static `from_` array into a `dynamic_` array. Parameter `static_` is always a **memory** array, as well as `dynamic_`.

#### Time complexity

Linear.

#### Example

```solidity
bool[2] memory staticArray_ = [true, false];

bool[] memory dynamicArray_ = staticArray_.asDynamic(); // [true, false]
```
