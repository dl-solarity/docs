# 📓 Paginator

## Introduction

The Paginator library provides pagination functionality for arrays and [OpenZeppelin's Enumerable Sets](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol). This makes it possible to retrieve specific portions of data, making it useful for managing large datasets efficiently.

A smart contract possesses limitless storage capacity, allowing for the storage of extensive data. However, due to the finite _gas limit_ and _execution time_ constraints, retrieving such voluminous data in a single request is often impossible. Pagination serves as a practical tool, facilitating the retrieval of information through a series of smaller requests.

## Functions

To use the `Paginator` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/arrays/Paginator.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using Paginator for *;
```

### part

```solidity
function part(
    uint256[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (uint256[] memory list_);
```

```solidity
function part(
    address[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_);
```

```solidity
function part(
    bytes32[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_);
```

```solidity
function part(
    EnumerableSet.UintSet storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (uint256[] memory list_);
```

```solidity
function part(
    EnumerableSet.AddressSet storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_);
```

```solidity
function part(
    EnumerableSet.Bytes32Set storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_);
```

```solidity
function part(
    StringSet.Set storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (string[] memory list_);
```

#### Description

This function returns a portion of an `arr`, starting from the `offset_` index and including `limit_` elements. A parameter `set` is always a **storage** array, whereas a result `list_` is a **memory** array.

#### Time complexity

Linear, depends on a `limit_`.

#### Example

```solidity
EnumerableSet.UintSet public nums;
nums.add(1); 
nums.add(2); 
nums.add(3); 
nums.add(4); 

nums.part(0, 99); // [1, 2, 3, 4]
nums.part(2, 99); // [3, 4]
nums.part(1, 1);  // [2]
```
