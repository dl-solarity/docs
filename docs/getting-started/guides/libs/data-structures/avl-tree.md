# ⚖️ AVL Tree

## Introduction

The AVL Tree library offers an efficient on-chain solution for managing balanced binary search trees. Designed to maintain self-balancing height properties, the AVL Tree ensures that operations such as insertions, deletions, and lookups can be performed in logarithmic time. It also offers the flexibility to set a custom comparator function, that will be used to build the tree.

## Implementation

The `AvlTree` library is structured to handle three types of values: uint256, bytes32, and address, each facilitating different use cases. Every node in the AVL tree has a bytes32 key, allowing for the storage of different data types as keys.

The tree is simply a mapping of keys to nodes. Thanks to the structure of node which provides the parent node reference the iterative traversal of the tree is possible.The example below shows how the nodes are represented in the tree.

<figure>
    <img src={require("/static/img/docs/avl-tree-diagram.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>Nodes inside the tree</figcaption>
</figure>

## Functions

To use the `AvlTree` contract, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/data-structures/AvlTree.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using AvlTree for AvlTree.UintAVL;
using AvlTree for AvlTree.Bytes32AVL;
using AvlTree for AvlTree.AddressAVL;
```

### setComparator

```solidity
function setComparator(
    UintAVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal;
```

```solidity
function setComparator(
    Bytes32AVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal;
```

```solidity
function setComparator(
    AddressAVL storage tree,
    function(bytes32, bytes32) view returns (int256) comparator_
) internal;
```

#### Description

This function sets a custom comparator function to be used for Avl Tree construction. The comparator function takes 2 keys to compare as parameters. It is expected to return 1 if the first element to be compared is greater than the second one, -1 if it is less, 0 if they are equal. 

The operation will revert if the tree already contains at least one node.

#### Time complexity

Constant.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

function _descComparator(
    bytes32 key1_,
    bytes32 key2_
) internal pure returns (int256) {
    if (key1_ > key2_) {
        return -1;
    }

    if (key1_ < key2_) {
        return 1;
    }

    return 0;
}

uintTree.setComparator(_descComparator); 
```

### insert

```solidity
function insert(UintAVL storage tree, bytes32 key_, uint256 value_) internal;
```

```solidity
function insert(Bytes32AVL storage tree, bytes32 key_, bytes32 value_) internal;
```

```solidity
function insert(AddressAVL storage tree, bytes32 key_, address value_) internal;
```

#### Description

This function inserts a new node into the tree. The operation will revert if the key is 0 or a node with the key already exists in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(bytes32(1), 100);
uintTree.insert(bytes32(2), 200);

uintTree.size(); // 2
```

### remove

```solidity
function remove(UintAVL storage tree, bytes32 key_) internal;
```

```solidity
function remove(Bytes32AVL storage tree, bytes32 key_) internal;
```

```solidity
function remove(AddressAVL storage tree, bytes32 key_) internal;
```

#### Description

This function removes a new node from the tree. The operation will revert if the key is 0 or a node with the key doesn't exist in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(bytes32(1), 100);

uintTree.remove(bytes32(2)); // Reverts with "AvlTree: the node doesn't exist"
uintTree.remove(bytes32(1));

uintTree.size(); // 0
```

### get

```solidity
function get(UintAVL storage tree, bytes32 key_) internal view returns (uint256);
```

```solidity
function get(Bytes32AVL storage tree, bytes32 key_) internal view returns (bytes32);
```

```solidity
function get(AddressAVL storage tree, bytes32 key_) internal view returns (address);
```

#### Description

This function returns the `value` of the node with the specified key. The operation will revert if a node with the key doesn't exist in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(bytes32(3), 300);

uintTree.get(bytes32(1)); // Reverts with "AvlTree: the node doesn't exist"
uintTree.get(bytes32(3)); // 300
```

### tryGet

```solidity
function tryGet(UintAVL storage tree, bytes32 key_) internal view returns (bool, uint256);
```

```solidity
function tryGet(Bytes32AVL storage tree, bytes32 key_) internal view returns (bool, bytes32);
```

```solidity
function tryGet(AddressAVL storage tree, bytes32 key_) internal view returns (bool, address);
```

#### Description

This function tries to retrieve the value associated with the specified key. It returns true if node with the key exists, false otherwise, and the `value` of the node. The operation will not revert if a node with the key doesn't exist in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(bytes32(1), 100);

uintTree.tryGet(bytes32(2)); // (false, 0)
uintTree.tryGet(bytes32(1)); // (true, 100)
```

### size

```solidity
function size(UintAVL storage tree) internal view returns (uint64);
```

```solidity
function size(Bytes32AVL storage tree) internal view returns (uint64);
```

```solidity
function size(AddressAVL storage tree) internal view returns (uint64);
```

#### Description

This function returns the number of elements in the tree.

#### Time complexity

Constant.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(bytes32(1), 10);
uintTree.insert(bytes32(2), 20);

uintTree.size(); // 2
```

### first

```solidity
function first(UintAVL storage tree) internal view returns (Traversal.Iterator memory);
```

```solidity
function first(Bytes32AVL storage tree) internal view returns (Traversal.Iterator memory);
```

```solidity
function first(AddressAVL storage tree) internal view returns (Traversal.Iterator memory);
```

#### Description

This function returns the [iterator](#-traversal) pointing to the first (leftmost) node in the tree. The functions can be utilized for an in-order traversal of the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(bytes32(2), 20);
uintTree.insert(bytes32(1), 10);
uintTree.insert(bytes32(4), 40);

Traversal.Iterator memory iterator_ = uintTree.first();

iterator_..value(); // (bytes32(1), bytes32(10))
```

### last

```solidity
function last(UintAVL storage tree) internal view returns (Traversal.Iterator memory);
```

```solidity
function last(Bytes32AVL storage tree) internal view returns (Traversal.Iterator memory);
```

```solidity
function last(AddressAVL storage tree) internal view returns (Traversal.Iterator memory);
```

#### Description

This function returns the [iterator](#-traversal) pointing to the last (rightmost) node in the tree. The functions can be utilized for an in-order backwards traversal of the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(bytes32(2), 20);
uintTree.insert(bytes32(1), 10);
uintTree.insert(bytes32(4), 40);

Traversal.Iterator memory iterator_ = uintTree.last();

iterator_..value(); // (bytes32(4), bytes32(40))
```

### isCustomComparatorSet

```solidity
function isCustomComparatorSet(UintAVL storage tree) internal view returns (bool);
```

```solidity
function isCustomComparatorSet(Bytes32AVL storage tree) internal view returns (bool);
```

```solidity
function isCustomComparatorSet(AddressAVL storage tree) internal view returns (bool);
```

#### Description

This function returns true, if the custom comparator function was set, and false otherwise.

#### Time complexity

Constant.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

function _descComparator(
    bytes32 key1_,
    bytes32 key2_
) internal pure returns (int256) {
    if (key1_ > key2_) {
        return -1;
    }

    if (key1_ < key2_) {
        return 1;
    }

    return 0;
}

uintTree.isCustomComparatorSet(); // false

uintTree.setComparator(_descComparator);

uintTree.isCustomComparatorSet(); // true
```

# 🛤 Traversal

## Introduction

The `Traversal` library allows for in-order traversal of an AVL tree in Solidity. It provides various functions for iterating through the tree in different directions, checking for the existence of the next or previous node, and retrieving node values.

## Implementation

The iterative traversal is possible because each node in the AVL tree maintains a reference to its parent node. This parent reference allows the traversal algorithm to efficiently move up and down the tree structure without the need for recursive calls, which can be both resource-intensive and prone to stack overflow issues in deep trees.

The library also enhances gas efficiency and execution speed by leveraging inline assembly for direct storage access, rather than passing the entire tree to each function. This is achieved by storing the `treeMappingSlot` field in the `Iterator` struct.
## Example

```solidity
import {AvlTree, Traversal} from "@solarity/solidity-lib/libs/data-structures/AvlTree.sol";

using AvlTree for AvlTree.UintAVL;
using Traversal for Traversal.Iterator;

Avltree.UintAVL public uintTree;

uintTree.insert(bytes32(2), 20);
uintTree.insert(bytes32(1), 10);
uintTree.insert(bytes32(4), 40);

bytes32[] memory keys_ = new bytes32[](uintTree.size());
bytes32[] memory values_ = new bytes32[](uintTree.size());

uint256 index_;

while (iterator_.isValid()) {
    (keys_[index_], values_[index_]) = iterator_.value();

    iterator_.next();

    index_++;
}

// keys_.asUint256Array(): [1, 2, 3]
// values_.asUint256Array(): [10, 20, 30]
```
