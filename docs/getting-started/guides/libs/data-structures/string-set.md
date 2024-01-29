# 🔤 String Set

## Introduction

The String Set library was created by analogy with the [OpenZeppelin's Enumerable Set](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol) due to the absence of string implementation in it. A String Set is a collection of distinct strings, that allows for efficient operations with them.

## Implementation

The `StringSet` data structure is constructed using a mapping while incorporating an additional array, enabling operations such as retrieval by index and fetching all values with constant time complexity.

## Functions

To use the `StringSet` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/data-structures/StringSet.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using StringSet for StringSet.Set;
```

### add

```solidity
function add(Set storage set, string memory value_) internal returns (bool);
```

#### Description

This function adds a string to the `set` if it doesn't already exist. Returns `true` if the `value_` was added, `false` if it already existed.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set; // []

bool isAdded_;
isAdded_ = set.add("a"); // true,  ["a"]
isAdded_ = set.add("b"); // true,  ["a", "b"]
isAdded_ = set.add("b"); // false, ["a", "b"]
```

### remove

```solidity
function remove(Set storage set, string memory value_) internal returns (bool);
```

#### Description

This function removes a string from the `set` if it exists. Returns `true` if the `value_` was removed, `false` if it already existed.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set;

set.add("a"); 
set.add("b");

bool isRemoved_;
isRemoved_ = set.remove("b"); // true, ["a"]
isRemoved_ = set.remove("b"); // false,  ["a"]
isRemoved_ = set.remove("a"); // true, []
```

### contains

```solidity
function contains(Set storage set, string memory value_) internal view returns (bool);
```

#### Description

This function checks if a value is in the `set`. Returns `true` if the `value_` is in the set, `false` otherwise.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set;

set.add("a"); 
set.add("b");

set.contains("a"); // true
set.contains("c"); // false
```

### length

```solidity
function length(Set storage set) internal view returns (uint256);
```

#### Description

This function returns the number of elements in the `set`.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set;

set.length();  // 0

set.add("a");
set.length(); // 1
```

### at

```solidity
function at(Set storage set, uint256 index_) internal view returns (string memory);
```

#### Description

This function returns the value at a specific `index_` in the `set`.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set;

set.add("a"); 
set.add("b");

set.at(1); // "b"
set.at(5); // Reverts
```

### values

```solidity
function values(Set storage set) internal view returns (string[] memory);
```

#### Description

This function returns a whole array of all values stored in the `set`.

#### Time complexity

Constant.

#### Example

```solidity
StringSet.Set public set;

set.add("a"); 
set.add("b");

set.values(); // ["a", "b"] as a memory array
```
