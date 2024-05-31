# ⚖️ AVL Tree

## Introduction

The AVL Tree library offers an efficient on-chain solution for managing balanced binary search trees. Designed to maintain self-balancing height properties, the AVL Tree ensures that operations such as insertions, deletions, and lookups can be performed in logarithmic time. It also offers the flexibility to set a custom comparator function, that will be used to build the tree.

## Implementation

The `AvlTree` library is structured to handle three types of keys: uint256, bytes32, and address, each facilitating different use cases. Every node in the AVL tree is equipped with a dynamic bytes `value` field, allowing for the storage of complex data types, including structs.

The tree is simply a mapping of keys to nodes. The example below shows how the nodes are represented in the tree.

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
    function(bytes32, bytes32, bytes memory, bytes memory) view returns (int8) comparator_
) internal;
```

```solidity
function setComparator(
    Bytes32AVL storage tree,
    function(bytes32, bytes32, bytes memory, bytes memory) view returns (int8) comparator_
) internal;
```

```solidity
function setComparator(
    AddressAVL storage tree,
    function(bytes32, bytes32, bytes memory, bytes memory) view returns (int8) comparator_
) internal;
```

#### Description

This function sets a custom comparator function to be used for Avl Tree construction. The comparator function takes 2 keys and 2 values as parameters to enable the implementation of flexible comparing logic. It is expected to return 1 if the first element to be compared is greater than the second one, -1 if it is less, 0 if they are equal. 

The operation will revert if the tree already contains at least one node.

#### Time complexity

Constant.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

function _descComparator(
    bytes32 key1_,
    bytes32 key2_,
    bytes memory,
    bytes memory
) internal pure returns (int8) {
    if (key1_ > key2_) return -1;
    if (key1_ < key2_) return 1;
    return 0;
}

uintTree.setComparator(_descComparator); 
```

### insert

```solidity
function insert(UintAVL storage tree, uint256 key_, bytes memory value_) internal;
```

```solidity
function insert(Bytes32AVL storage tree, bytes32 key_, bytes memory value_) internal;
```

```solidity
function insert(AddressAVL storage tree, address key_, bytes memory value_) internal;
```

#### Description

This function inserts a new node into the tree. The operation will revert if the key is 0 or a node with the key already exists in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(1, abi.encode(100));
uintTree.insert(2, abi.encode(200));

uintTree.treeSize(); // 2
```

### remove

```solidity
function remove(UintAVL storage tree, uint256 key_) internal;
```

```solidity
function remove(Bytes32AVL storage tree, bytes32 key_) internal;
```

```solidity
function remove(AddressAVL storage tree, address key_) internal;
```

#### Description

This function removes a new node from the tree. The operation will revert if the key is 0 or a node with the key doesn't exist in the tree.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(1, abi.encode(100));

uintTree.remove(2); // Reverts with "AvlTree: the node doesn't exist"
uintTree.remove(1);

uintTree.treeSize(); // 0
```

### search

```solidity
function search(UintAVL storage tree, uint256 key_) internal view returns (bool);
```

```solidity
function search(Bytes32AVL storage tree, bytes32 key_) internal view returns (bool);
```

```solidity
function search(AddressAVL storage tree, address key_) internal view returns (bool);
```

#### Description

This function returns true, if a node with the specified key exists in the tree, and false otherwise.

#### Time complexity

Constant.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(3, abi.encode(300));

uintTree.search(1); // false
uintTree.search(3); // true
```

### getValue

```solidity
function getValue(UintAVL storage tree, uint256 key_) internal view returns (bytes storage);
```

```solidity
function getValue(Bytes32AVL storage tree, bytes32 key_) internal view returns (bytes storage);
```

```solidity
function getValue(AddressAVL storage tree, address key_) internal view returns (bytes storage);
```

#### Description

This function returns the `value` of the node with the specified key. The operation will revert if a node with the key doesn't exist in the tree.

#### Time complexity

Constant.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(1, abi.encode(100));

bytes memory bytesValue_ = uintTree.getValue(1);
abi.decode(bytesValue_, (uint256)); // 100

uintTree.getValue(2); // Reverts with "AvlTree: node with such key doesn't exist"
```

### getMin

```solidity
function getMin(UintAVL storage tree) internal view returns (uint256);
```

```solidity
function getMin(Bytes32AVL storage tree) internal view returns (bytes32);
```

```solidity
function getMin(AddressAVL storage tree) internal view returns (address);
```

#### Description

This function returns the minimum key from the tree or in other words the leftmost node of the tree. Returns 0 if the tree is empty.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(10, abi.encode(10));
uintTree.insert(2, abi.encode(20));
uintTree.insert(3, abi.encode(30));

uintTree.getMin(); // 2
```

### getMax

```solidity
function getMax(UintAVL storage tree) internal view returns (uint256);
```

```solidity
function getMax(Bytes32AVL storage tree) internal view returns (bytes32);
```

```solidity
function getMax(AddressAVL storage tree) internal view returns (address);
```

#### Description

This function returns the maximum key from the tree or in other words the rightmost node of the tree. Returns 0 if the tree is empty.

#### Time complexity

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
AvlTree.UintAVL public uintTree;

uintTree.insert(10, abi.encode(10));
uintTree.insert(2, abi.encode(20));
uintTree.insert(3, abi.encode(30));

uintTree.getMax(); // 10
```

### root

```solidity
function root(UintAVL storage tree) internal view returns (uint256);
```

```solidity
function root(Bytes32AVL storage tree) internal view returns (bytes32);
```

```solidity
function root(AddressAVL storage tree) internal view returns (address);
```

#### Description

This function returns the key of the root node in the tree. Returns 0 if the tree is empty.

#### Time complexity

Constant.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(10, abi.encode(10));
uintTree.insert(5, abi.encode(10));
uintTree.insert(2, abi.encode(10));

uintTree.root(); // 5
```

### treeSize

```solidity
function treeSize(UintAVL storage tree) internal view returns (uint256);
```

```solidity
function treeSize(Bytes32AVL storage tree) internal view returns (uint256);
```

```solidity
function treeSize(AddressAVL storage tree) internal view returns (uint256);
```

#### Description

This function returns the number of elements in the tree.

#### Time complexity

Constant.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(1, abi.encode(10));
uintTree.insert(2, abi.encode(20));

uintTree.treeSize(); // 2
```

### inOrderTraversal

```solidity
function inOrderTraversal(UintAVL storage tree) internal view returns (uint256[] memory);
```

```solidity
function inOrderTraversal(Bytes32AVL storage tree) internal view returns (bytes32[] memory);
```

```solidity
function inOrderTraversal(AddressAVL storage tree) internal view returns (address[] memory);
```

#### Description

This function returns an array of keys in in-order traversal. It recursively visits the left subtree, the node itself, and then the right subtree. The function is particularly useful when it is required to process or display data in its natural, sequential order.

#### Time complexity

`O(n)`, where `n` is the number of elements in the tree.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(5, abi.encode(50));
uintTree.insert(1, abi.encode(10));
uintTree.insert(2, abi.encode(20));

uintTree.inOrderTraversal(); // [1, 2, 5]
```

### preOrderTraversal

```solidity
function preOrderTraversal(UintAVL storage tree) internal view returns (uint256[] memory);
```

```solidity
function preOrderTraversal(Bytes32AVL storage tree) internal view returns (bytes32[] memory);
```

```solidity
function preOrderTraversal(AddressAVL storage tree) internal view returns (address[] memory);
```

#### Description

This function returns an array of keys in pre-order traversal. It visits the current node first (processing the root node first), then recursively visits the left subtree followed by the right subtree. The function can be particularly useful when it is required to create a copy of the tree or explore the structure before the subtrees are examined.

#### Time complexity

`O(n)`, where `n` is the number of elements in the tree.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(5, abi.encode(50));
uintTree.insert(1, abi.encode(10));
uintTree.insert(2, abi.encode(20));

uintTree.preOrderTraversal(); // [2, 1, 5]
```

### postOrderTraversal

```solidity
function postOrderTraversal(UintAVL storage tree) internal view returns (uint256[] memory);
```

```solidity
function postOrderTraversal(Bytes32AVL storage tree) internal view returns (bytes32[] memory);
```

```solidity
function postOrderTraversal(AddressAVL storage tree) internal view returns (address[] memory);
```

#### Description

This function returns an array of keys in post-order traversal. It first recursively visits the left and right subtrees before processing the current node (root node last). The function can be particularly useful when subtrees need to be processed before their respective parent nodes.


#### Time complexity

`O(n)`, where `n` is the number of elements in the tree.

#### Example

```solidity
Avltree.UintAVL public uintTree;

uintTree.insert(5, abi.encode(50));
uintTree.insert(1, abi.encode(10));
uintTree.insert(2, abi.encode(20));

uintTree.postOrderTraversal(); // [1, 5, 2]
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
    bytes32 key2_,
    bytes memory,
    bytes memory
) internal pure returns (int8) {
    if (key1_ > key2_) return -1;
    if (key1_ < key2_) return 1;
    return 0;
}

uintTree.isCustomComparatorSet(); // false

uintTree.setComparator(_descComparator);

uintTree.isCustomComparatorSet(); // true
```
