# ⛓️ Array Helper

## Introduction

The Array Helper library provides a collection of functions related to arrays, including the following:

* A binary search of finding the lower/upper bound of a specified element in an array.
* Computing a sum of a specific range of an array.
* Computing a prefix sum of an array.
* Reversing an array.
* Inserting an array into another array.
* Cropping an array to a specific size.

## Functions

To use the `ArrayHelper` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/arrays/ArrayHelper.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using ArrayHelper for *;
```

### lowerBound

```solidity
function lowerBound(
    uint256[] storage array,
    uint256 element_
) internal view returns (uint256 index_);
```

#### Description

It searches an `array` and returns the index that contains a value **greater or equal** to the specified `element_`. The function implements a binary search under the hood. The function returns the length of the array if no such element is found. Parameter `array` is always a **storage** array. An array has to be sorted in **ascending**.

#### Time complexity

Logarithmic.

#### Example

```solidity
uint256[] public arr = [1, 2, 2, 3];

arr.lowerBound(2); // 1
```

### upperBound

```solidity
function upperBound(
    uint256[] storage array,
    uint256 element_
) internal view returns (uint256 index_);
```

#### Description

It searches an `array` and returns the index that contains a value **greater** than the specified `element_`. The function implements a binary search under the hood. The function returns the length of the array if no such element is found. Parameter `array` is always a **storage** array. An array has to be sorted in ascending.

#### Time complexity

Logarithmic.

#### Example

```solidity
uint256[] public arr = [1, 2, 2, 3];

arr.upperBound(2); // 3
```

### getRangeSum

```solidity
function getRangeSum(
    uint256[] storage prefixes,
    uint256 beginIndex_,
    uint256 endIndex_
) internal view returns (uint256);
```

#### Description

Calculates the sum of elements in a specific range of a given `prefixes` sum array. Parameter `prefixes` is always a **storage** array. The prefix sum at the index `i` is the sum of all elements from index 0 to `i`. It will revert if `beginIndex_ > endIndex_`.

#### Time complexity

Constant.

#### Example

```solidity
uint256[] public arr = [1, 2, 3, 4];
uint256[] public prefixed = [1, 3, 6, 10];

prefixed.getRangeSum(1, 2); // 5
prefixed.getRangeSum(2, 1); // Reverts with: "ArrayHelper: wrong range"
```

### countPrefixes

```solidity
function countPrefixes(
    uint256[] memory arr_
) internal pure returns (uint256[] memory prefixes_);
```

#### Description

Calculates the `prefixes_` sum array for a given array `arr_`. The function iterates through the elements of the input array and calculates the prefix sum at each position. Parameter `arr_` is always a **memory** array, as well as `prefixes_`.

#### Time complexity

Linear.

#### Example

```solidity
uint256[] memory arr_ = new uint256[](4);
arr_[0] = 1; 
arr_[1] = 2; 
arr_[2] = 3; 
arr_[3] = 4;

uint256[] memory prefixes_ = arr_.countPrefixes();
// [1, 3, 6, 10]
```

### reverse

```solidity
function reverse(
    uint256[] memory arr_
) internal pure returns (uint256[] memory reversed_);
```

```solidity
function reverse(
    address[] memory arr_
) internal pure returns (address[] memory reversed_);
```

```solidity
function reverse(
    bool[] memory arr_
) internal pure returns (address[] memory reversed_);
```

```solidity
function reverse(
    string[] memory arr_
) internal pure returns (string[] memory reversed_);
```

```solidity
function reverse(
    bytes32[] memory arr_
) internal pure returns (bytes32[] memory reversed_);
```

#### Description

Reverses the order of elements in a given array `arr_`. The function iterates through the elements of input in reverse order and populates the corresponding positions in the result array. Parameter `arr_` is always a **memory** array, as well as `reversed_`.

#### Time complexity

Linear.

#### Example

```solidity
uint256[] memory arr_ = new uint256[](4);
arr_[0] = 1; 
arr_[1] = 2; 
arr_[2] = 3; 
arr_[3] = 4; 

uint256[] memory reversed_ = arr_.reverse();
// [4, 3, 2, 1]
```

### insert

```solidity
function insert(
    uint256[] memory to_,
    uint256 index_,
    uint256[] memory what_
) internal pure returns (uint256);
```

```solidity
function insert(
    address[] memory to_,
    uint256 index_,
    address[] memory what_
) internal pure returns (uint256);
```

```solidity
function insert(
    bool[] memory to_,
    uint256 index_,
    bool[] memory what_
) internal pure returns (uint256);
```

```solidity
function insert(
    string[] memory to_,
    uint256 index_,
    string[] memory what_
) internal pure returns (uint256);
```

```solidity
function insert(
    bytes32[] memory to_,
    uint256 index_,
    bytes32[] memory what_
) internal pure returns (uint256);
```

#### Description

Inserts the elements of one array `what_` into another array `to_` at a specified `index_`. Parameter `to_` is always a **memory** array, as well as `what_`. The function iterates through each element in `what_` and inserts it into the `to_` array at the specified index.

The function assumes that the target array `to_` has **sufficient space** to accommodate the elements being inserted.

#### Time complexity

Linear, depends on the array to be inserted `what_`.

#### Example

```solidity
uint256[] memory a_ = new uint256[](4);
uint256[] memory b_ = new uint256[](2); 
b_[0] = 1; 
b_[1] = 2;

uint256 nextIndex_ = a_.insert(1, b_);
// nextIndex_ == 3
// a_ == [0, 1, 2, 0]
```

### crop

```solidity
function crop(
    uint256[] memory array_,
    uint256 newLength_
) internal pure returns (uint256[] memory);
```

```solidity
function crop(
    address[] memory array_,
    uint256 newLength_
) internal pure returns (address[] memory);
```

```solidity
function crop(
    bool[] memory array_,
    uint256 newLength_
) internal pure returns (bool[] memory);
```

```solidity
function crop(
    string[] memory array_,
    uint256 newLength_
) internal pure returns (string[] memory);
```

```solidity
function crop(
    bytes32[] memory array_,
    uint256 newLength_
) internal pure returns (bytes32[] memory);
```

#### Description

Crops a given `array_` to a specified `newLength_`. The function uses inline assembly (`mstore`) to update the length of the array to the new length. The function then returns a reference to the modified array. Parameters `array_` and returned array accordingly always a **memory** array.

#### Time complexity

Constant.

#### Example

```solidity
uint256[] memory arr_ = new uint256[](4);
arr_[0] = 1; 
arr_[1] = 2; 
arr_[2] = 3; 
arr_[3] = 4; 

uint256[] memory cropped_ = arr_.crop(2); // [1, 2]
```