# ⚙ Set Helper

## Introduction

The Set Helper library provides functions for working with [OpenZeppelin's Enumerable Sets](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol). The library promotes clean code practices by offering several functions to add or remove subsets from sets, thereby enhancing readability and maintainability

## Functions

To use the `SetHelper` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/arrays/SetHelper.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using SetHelper for *;
```

### add

```solidity
function add(
    EnumerableSet.AddressSet storage set, 
    address[] memory array_
) internal;
```

```solidity
function add(
    EnumerableSet.UintSet storage set, 
    uint256[] memory array_
) internal;
```

```solidity
function add(
    StringSet.Set storage set, 
    string[] memory array_
) internal;
```

#### Description

This function adds the provided `array_` to the provided `set`.

#### Time complexity

Linear.

#### Example

```solidity
EnumerableSet.UintSet public nums;
nums.add(1); 
nums.add(2); 

uint256[] memory arr_ = new uint256[](2);
arr_[0] = 3; 
arr_[1] = 4;

nums.add(arr_); // [1, 2, 3, 4]
```

### remove

```solidity
function remove(
    EnumerableSet.AddressSet storage set, 
    address[] memory array_
) internal;
```

```solidity
function remove(
    EnumerableSet.UintSet storage set, 
    uint256[] memory array_
) internal;
```

```solidity
function remove(
    StringSet.Set storage set, 
    string[] memory array_
) internal;
```

#### Description

This function removes the provided `array_` from the provided `set`. Parameter `set` is always a **storage** array, whereas `array_` is a **memory** array.

#### Time complexity

Linear.

#### Example

```solidity
EnumerableSet.UintSet public nums;
nums.add(1); 
nums.add(2); 
nums.add(3); 
nums.add(4);

uint256[] memory arr_ = new uint256[](4);
arr_[0] = 1; 
arr_[1] = 3; 
arr_[2] = 3; 
arr_[3] = 10;

nums.remove(arr_); // [2, 4]
```
