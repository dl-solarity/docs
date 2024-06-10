# AvlTree

## Overview

#### License: MIT

```solidity
library AvlTree
```

AVL Tree module

This library provides implementation of three sets with dynamic `value` types:
`UintAVL`, `Bytes32AVL` and `AddressAVL`.

Each element in the tree has a bytes32 `key` field to allow storing values
associated with different types of keys

The implementation supports setting custom comparator function

Gas usage for _insert and _remove functions (where count is the number of elements added to the tree):

| Statistic | _insert      | _remove          |
| --------- | ------------ | ---------------- |
| count     | 5000         | 5000             |
| mean      | 222,578 gas  | 115,744 gas      |
| min       | 110,520 gas  | 34,461 gas       |
| max       | 263,275 gas  | 171,815 gas      |

## Usage example:

```
using AvlTree for AvlTree.UintAVL;
using Traversal for Traversal.Iterator;

AvlTree.UintAVL internal uintTree;

................................................

uintTree.setComparator(comparatorFunction);

uintTree.insert(bytes32(1), 1234);
uintTree.insert(bytes32(3), 100);

uintTree.tryGet(bytes32(1));

uintTree.remove(bytes32(1));

................................................

Traversal.Iterator memory iterator_ = uintTree.first();

bytes32[] memory keys_ = new bytes32[](_uintTree.size());
bytes32[] memory values_ = new bytes32[](_uintTree.size());

while (iterator_.isValid()) {
     (keys_[i], values_[i]) = iterator_.value();
     iterator_.next();
}
```
## Structs info

### UintAVL

```solidity
struct UintAVL {
	AvlTree.Tree _tree;
}
```

UintAVL      *
### Bytes32AVL

```solidity
struct Bytes32AVL {
	AvlTree.Tree _tree;
}
```

Bytes32AVL     *
### AddressAVL

```solidity
struct AddressAVL {
	AvlTree.Tree _tree;
}
```

AddressAVL     *
### Node

```solidity
struct Node {
	bytes32 key;
	bytes32 value;
	uint64 height;
	uint64 parent;
	uint64 left;
	uint64 right;
}
```

Internal Tree     *
### Tree

```solidity
struct Tree {
	uint64 root;
	uint64 totalCount;
	uint64 removedCount;
	bool isCustomComparatorSet;
	mapping(uint64 => AvlTree.Node) tree;
	function (bytes32,bytes32) view returns (int256) comparator;
}
```


## Functions info

### setComparator

```solidity
function setComparator(
    AvlTree.UintAVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal
```

The function to set a custom comparator function, that will be used to build the uint256 tree.


Parameters:

| Name        | Type                                             | Description                                             |
| :---------- | :----------------------------------------------- | :------------------------------------------------------ |
| tree        | struct AvlTree.UintAVL                           | self.                                                   |
| comparator_ | function (bytes32,bytes32) view returns (int256) | The function that accepts keys of the nodes to compare. |

### insert

```solidity
function insert(
    AvlTree.UintAVL storage tree,
    bytes32 key_,
    uint256 value_
) internal
```

The function to insert a node into the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name   | Type                   | Description          |
| :----- | :--------------------- | :------------------- |
| tree   | struct AvlTree.UintAVL | self.                |
| key_   | bytes32                | the key to insert.   |
| value_ | uint256                | the value to insert. |

### remove

```solidity
function remove(AvlTree.UintAVL storage tree, bytes32 key_) internal
```

The function to remove a node from the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name | Type                   | Description                    |
| :--- | :--------------------- | :----------------------------- |
| tree | struct AvlTree.UintAVL | self.                          |
| key_ | bytes32                | the key of the node to remove. |

### get

```solidity
function get(
    AvlTree.UintAVL storage tree,
    bytes32 key_
) internal view returns (uint256)
```

The function to retrieve the value associated with a key in the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.

Note: Reverts if the node with the specified key doesn't exist.



Parameters:

| Name | Type                   | Description                         |
| :--- | :--------------------- | :---------------------------------- |
| tree | struct AvlTree.UintAVL | self.                               |
| key_ | bytes32                | the key to retrieve the value for.  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | uint256 | The value associated with the key. |

### tryGet

```solidity
function tryGet(
    AvlTree.UintAVL storage tree,
    bytes32 key_
) internal view returns (bool, uint256)
```

The function to try to retrieve the value associated with a key in the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.


Does not revert if the node with the specified key doesn't exist.



Parameters:

| Name | Type                   | Description                                            |
| :--- | :--------------------- | :----------------------------------------------------- |
| tree | struct AvlTree.UintAVL | self.                                                  |
| key_ | bytes32                | the key of the node to try to retrieve the value for.  |


Return values:

| Name | Type    | Description                                                       |
| :--- | :------ | :---------------------------------------------------------------- |
| [0]  | bool    | True if the node with the specified key exists, false otherwise.  |
| [1]  | uint256 | The value associated with the key.                                |

### size

```solidity
function size(AvlTree.UintAVL storage tree) internal view returns (uint64)
```

The function to retrieve the size of the uint256 tree.


Parameters:

| Name | Type                   | Description |
| :--- | :--------------------- | :---------- |
| tree | struct AvlTree.UintAVL | self.       |


Return values:

| Name | Type   | Description           |
| :--- | :----- | :-------------------- |
| [0]  | uint64 | The size of the tree. |

### first

```solidity
function first(
    AvlTree.UintAVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the first (leftmost) node in the uint256 tree.

The functions can be utilized for an in-order traversal of the tree.


Parameters:

| Name | Type                   | Description |
| :--- | :--------------------- | :---------- |
| tree | struct AvlTree.UintAVL | self.       |


Return values:

| Name | Type                      | Description                              |
| :--- | :------------------------ | :--------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the first node. |

### last

```solidity
function last(
    AvlTree.UintAVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the last (rightmost) node in the uint256 tree.

The functions can be utilized for an in-order backwards traversal of the tree.


Parameters:

| Name | Type                   | Description |
| :--- | :--------------------- | :---------- |
| tree | struct AvlTree.UintAVL | self.       |


Return values:

| Name | Type                      | Description                             |
| :--- | :------------------------ | :-------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the last node. |

### isCustomComparatorSet

```solidity
function isCustomComparatorSet(
    AvlTree.UintAVL storage tree
) internal view returns (bool)
```

The function to check whether the custom comparator function is set for the uint256 tree.


Parameters:

| Name | Type                   | Description |
| :--- | :--------------------- | :---------- |
| tree | struct AvlTree.UintAVL | self.       |


Return values:

| Name | Type | Description                                                     |
| :--- | :--- | :-------------------------------------------------------------- |
| [0]  | bool | True if the custom comparator function is set, false otherwise. |

### setComparator

```solidity
function setComparator(
    AvlTree.Bytes32AVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal
```

The function to set a custom comparator function, that will be used to build the bytes32 tree.


Parameters:

| Name        | Type                                             | Description                                                        |
| :---------- | :----------------------------------------------- | :----------------------------------------------------------------- |
| tree        | struct AvlTree.Bytes32AVL                        | self.                                                              |
| comparator_ | function (bytes32,bytes32) view returns (int256) | The function that accepts keys and values of the nodes to compare. |

### insert

```solidity
function insert(
    AvlTree.Bytes32AVL storage tree,
    bytes32 key_,
    bytes32 value_
) internal
```

The function to insert a node into the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name   | Type                      | Description          |
| :----- | :------------------------ | :------------------- |
| tree   | struct AvlTree.Bytes32AVL | self.                |
| key_   | bytes32                   | the key to insert.   |
| value_ | bytes32                   | the value to insert. |

### remove

```solidity
function remove(AvlTree.Bytes32AVL storage tree, bytes32 key_) internal
```

The function to remove a node from the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name | Type                      | Description                    |
| :--- | :------------------------ | :----------------------------- |
| tree | struct AvlTree.Bytes32AVL | self.                          |
| key_ | bytes32                   | the key of the node to remove. |

### get

```solidity
function get(
    AvlTree.Bytes32AVL storage tree,
    bytes32 key_
) internal view returns (bytes32)
```

The function to retrieve the value associated with a key in the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.

Note: Reverts if the node with the specified key doesn't exist.



Parameters:

| Name | Type                      | Description                         |
| :--- | :------------------------ | :---------------------------------- |
| tree | struct AvlTree.Bytes32AVL | self.                               |
| key_ | bytes32                   | the key to retrieve the value for.  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | bytes32 | The value associated with the key. |

### tryGet

```solidity
function tryGet(
    AvlTree.Bytes32AVL storage tree,
    bytes32 key_
) internal view returns (bool, bytes32)
```

The function to try to retrieve the value associated with a key in the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.


Does not revert if the node with the specified key doesn't exist.



Parameters:

| Name | Type                      | Description                                            |
| :--- | :------------------------ | :----------------------------------------------------- |
| tree | struct AvlTree.Bytes32AVL | self.                                                  |
| key_ | bytes32                   | the key of the node to try to retrieve the value for.  |


Return values:

| Name | Type    | Description                                                       |
| :--- | :------ | :---------------------------------------------------------------- |
| [0]  | bool    | True if the node with the specified key exists, false otherwise.  |
| [1]  | bytes32 | The value associated with the key.                                |

### size

```solidity
function size(AvlTree.Bytes32AVL storage tree) internal view returns (uint64)
```

The function to retrieve the size of the bytes32 tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.Bytes32AVL | self.       |


Return values:

| Name | Type   | Description           |
| :--- | :----- | :-------------------- |
| [0]  | uint64 | The size of the tree. |

### first

```solidity
function first(
    AvlTree.Bytes32AVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the first (leftmost) node in the bytes32 tree.

The functions can be utilized for an in-order traversal of the tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.Bytes32AVL | self.       |


Return values:

| Name | Type                      | Description                              |
| :--- | :------------------------ | :--------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the first node. |

### last

```solidity
function last(
    AvlTree.Bytes32AVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the last (rightmost) node in the bytes32 tree.

The functions can be utilized for an in-order backwards traversal of the tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.Bytes32AVL | self.       |


Return values:

| Name | Type                      | Description                             |
| :--- | :------------------------ | :-------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the last node. |

### isCustomComparatorSet

```solidity
function isCustomComparatorSet(
    AvlTree.Bytes32AVL storage tree
) internal view returns (bool)
```

The function to check whether the custom comparator function is set for the bytes32 tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.Bytes32AVL | self.       |


Return values:

| Name | Type | Description                                                     |
| :--- | :--- | :-------------------------------------------------------------- |
| [0]  | bool | True if the custom comparator function is set, false otherwise. |

### setComparator

```solidity
function setComparator(
    AvlTree.AddressAVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal
```

The function to set a custom comparator function, that will be used to build the address tree.


Parameters:

| Name        | Type                                             | Description                                                        |
| :---------- | :----------------------------------------------- | :----------------------------------------------------------------- |
| tree        | struct AvlTree.AddressAVL                        | self.                                                              |
| comparator_ | function (bytes32,bytes32) view returns (int256) | The function that accepts keys and values of the nodes to compare. |

### insert

```solidity
function insert(
    AvlTree.AddressAVL storage tree,
    bytes32 key_,
    address value_
) internal
```

The function to insert a node into the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name   | Type                      | Description          |
| :----- | :------------------------ | :------------------- |
| tree   | struct AvlTree.AddressAVL | self.                |
| key_   | bytes32                   | The key to insert.   |
| value_ | address                   | The value to insert. |

### remove

```solidity
function remove(AvlTree.AddressAVL storage tree, bytes32 key_) internal
```

The function to remove a node from the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name | Type                      | Description                    |
| :--- | :------------------------ | :----------------------------- |
| tree | struct AvlTree.AddressAVL | self.                          |
| key_ | bytes32                   | the key of the node to remove. |

### get

```solidity
function get(
    AvlTree.AddressAVL storage tree,
    bytes32 key_
) internal view returns (address)
```

The function to retrieve the value associated with a key in the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.

Note: Reverts if the node with the specified key doesn't exist.



Parameters:

| Name | Type                      | Description                         |
| :--- | :------------------------ | :---------------------------------- |
| tree | struct AvlTree.AddressAVL | self.                               |
| key_ | bytes32                   | the key to retrieve the value for.  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | address | The value associated with the key. |

### tryGet

```solidity
function tryGet(
    AvlTree.AddressAVL storage tree,
    bytes32 key_
) internal view returns (bool, address)
```

The function to try to retrieve the value associated with a key in the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.


Does not revert if the node with the specified key doesn't exist.



Parameters:

| Name | Type                      | Description                                            |
| :--- | :------------------------ | :----------------------------------------------------- |
| tree | struct AvlTree.AddressAVL | self.                                                  |
| key_ | bytes32                   | the key of the node to try to retrieve the value for.  |


Return values:

| Name | Type    | Description                                                       |
| :--- | :------ | :---------------------------------------------------------------- |
| [0]  | bool    | True if the node with the specified key exists, false otherwise.  |
| [1]  | address | The value associated with the key.                                |

### size

```solidity
function size(AvlTree.AddressAVL storage tree) internal view returns (uint64)
```

The function to retrieve the size of the address tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.AddressAVL | self.       |


Return values:

| Name | Type   | Description           |
| :--- | :----- | :-------------------- |
| [0]  | uint64 | The size of the tree. |

### first

```solidity
function first(
    AvlTree.AddressAVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the first (leftmost) node in the address tree.

The functions can be utilized for an in-order traversal of the tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.AddressAVL | self.       |


Return values:

| Name | Type                      | Description                              |
| :--- | :------------------------ | :--------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the first node. |

### last

```solidity
function last(
    AvlTree.AddressAVL storage tree
) internal view returns (Traversal.Iterator memory)
```

The function to get the iterator pointing to the last (rightmost) node in the address tree.

The functions can be utilized for an in-order backwards traversal of the tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.AddressAVL | self.       |


Return values:

| Name | Type                      | Description                             |
| :--- | :------------------------ | :-------------------------------------- |
| [0]  | struct Traversal.Iterator | The iterator pointing to the last node. |

### isCustomComparatorSet

```solidity
function isCustomComparatorSet(
    AvlTree.AddressAVL storage tree
) internal view returns (bool)
```

The function to check whether the custom comparator function is set for the address tree.


Parameters:

| Name | Type                      | Description |
| :--- | :------------------------ | :---------- |
| tree | struct AvlTree.AddressAVL | self.       |


Return values:

| Name | Type | Description                                                     |
| :--- | :--- | :-------------------------------------------------------------- |
| [0]  | bool | True if the custom comparator function is set, false otherwise. |
