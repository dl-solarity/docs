# SparseMerkleTree

## Overview

#### License: MIT

```solidity
library SparseMerkleTree
```

Sparse Merkle Tree Module

This implementation modifies and optimizes the Sparse Merkle Tree data structure as described
in [Sparse Merkle Trees](https://docs.iden3.io/publications/pdfs/Merkle-Tree.pdf), originally implemented in
the [iden3/contracts repository](https://github.com/iden3/contracts/blob/8815bf53e989311d94301f4c513436c1ff776911/contracts/lib/SmtLib.sol).

It aims to provide more gas-efficient operations for the Sparse Merkle Tree while offering flexibility
in using different types of keys and values.

The main differences from the original implementation include:
- Added the ability to remove or update nodes in the tree.
- Optimized storage usage to reduce the number of storage slots.
- Added the ability to set custom hash functions.
- Removed methods and associated storage for managing the tree root's history.

Gas usage for adding (addUint) 20,000 leaves to a tree of size 80 "based" on the Poseidon Hash function is detailed below:

| Statistic |     Add       |
|-----------|-------------- |
| Count     | 20,000        |
| Mean      | 890,446 gas |
| Std Dev   | 147,775 gas |
| Min       | 177,797 gas   |
| 25%       | 784,961 gas   |
| 50%       | 866,482 gas   |
| 75%       | 959,075 gas   |
| Max       | 1,937,554 gas |

The gas cost increases linearly with the depth of the leaves added. This growth can be approximated by the following formula:
Linear regression formula: y = 46,377x + 215,088

This implies that adding an element at depth 80 would approximately cost 3.93M gas.

On the other hand, the growth of the gas cost for removing leaves can be approximated by the following formula:
Linear regression formula: y = 44840*x + 88821

This implies that removing an element at depth 80 would approximately cost 3.68M gas.

## Usage Example:

```solidity
using SparseMerkleTree for SparseMerkleTree.UintSMT;

SparseMerkleTree.UintSMT internal uintTree;
...
uintTree.initialize(80);

uintTree.add(100, 500);

uintTree.getRoot();

SparseMerkleTree.Proof memory proof = uintTree.getProof(100);

uintTree.verifyProof(proof);

uintTree.getNodeByKey(100);

uintTree.remove(100);
```
## Enums info

### NodeType

```solidity
enum NodeType {
	 EMPTY,
	 LEAF,
	 MIDDLE
}
```

The type of the node in the Merkle tree.
## Structs info

### UintSMT

```solidity
struct UintSMT {
	SparseMerkleTree.SMT _tree;
}
```

UintSMT      *
### Bytes32SMT

```solidity
struct Bytes32SMT {
	SparseMerkleTree.SMT _tree;
}
```

Bytes32SMT     *
### AddressSMT

```solidity
struct AddressSMT {
	SparseMerkleTree.SMT _tree;
}
```

AddressSMT      *
### SMT

```solidity
struct SMT {
	mapping(uint256 => SparseMerkleTree.Node) nodes;
	uint64 merkleRootId;
	uint64 nodesCount;
	uint64 deletedNodesCount;
	uint32 maxDepth;
	bool isCustomHasherSet;
	function (bytes32,bytes32) view returns (bytes32) hash2;
	function (bytes32,bytes32,bytes32) view returns (bytes32) hash3;
}
```

Defines the structure of the Sparse Merkle Tree.



Parameters:

| Name              | Type                                                      | Description                                                                                                                                                                                                                                                            |
| :---------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nodes             | mapping(uint256 => struct SparseMerkleTree.Node)          | A mapping of the tree's nodes, where the key is the node's index, starting from 1 upon node addition. This approach differs from the original implementation, which utilized a hash as the key: H(k \|| v || 1) for leaf nodes and H(left || right) for middle nodes.  |
| merkleRootId      | uint64                                                    | The index of the root node.                                                                                                                                                                                                                                            |
| maxDepth          | uint32                                                    | The maximum depth of the Merkle tree.                                                                                                                                                                                                                                  |
| nodesCount        | uint64                                                    | The total number of nodes within the Merkle tree.                                                                                                                                                                                                                      |
| isCustomHasherSet | bool                                                      | Indicates whether custom hash functions have been configured (true) or not (false).                                                                                                                                                                                    |
| hash2             | function (bytes32,bytes32) view returns (bytes32)         | A hash function accepting two arguments.                                                                                                                                                                                                                               |
| hash3             | function (bytes32,bytes32,bytes32) view returns (bytes32) | A hash function accepting three arguments.                                                                                                                                                                                                                             |

### Node

```solidity
struct Node {
	SparseMerkleTree.NodeType nodeType;
	uint64 childLeft;
	uint64 childRight;
	bytes32 nodeHash;
	bytes32 key;
	bytes32 value;
}
```

Describes a node within the Merkle tree, including its type, children, hash, and key-value pair.



Parameters:

| Name       | Type                           | Description                                                                                                                                                                                                         |
| :--------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nodeType   | enum SparseMerkleTree.NodeType | The type of the node.                                                                                                                                                                                               |
| childLeft  | uint64                         | The index of the left child node.                                                                                                                                                                                   |
| childRight | uint64                         | The index of the right child node.                                                                                                                                                                                  |
| nodeHash   | bytes32                        | The hash of the node, calculated as follows: - For leaf nodes, H(k \|| v || 1) where k is the key and v is the value; - For middle nodes, H(left || right) where left and right are the hashes of the child nodes.  |
| key        | bytes32                        | The key associated with the node.                                                                                                                                                                                   |
| value      | bytes32                        | The value associated with the node.                                                                                                                                                                                 |

### Proof

```solidity
struct Proof {
	bytes32 root;
	bytes32[] siblings;
	bool existence;
	bytes32 key;
	bytes32 value;
	bool auxExistence;
	bytes32 auxKey;
	bytes32 auxValue;
}
```

Represents the proof of a node's (non-)existence within the Merkle tree.



Parameters:

| Name         | Type      | Description                                                             |
| :----------- | :-------- | :---------------------------------------------------------------------- |
| root         | bytes32   | The root hash of the Merkle tree.                                       |
| siblings     | bytes32[] | An array of sibling hashes can be used to get the Merkle Root.          |
| existence    | bool      | Indicates the presence (true) or absence (false) of the node.           |
| key          | bytes32   | The key associated with the node.                                       |
| value        | bytes32   | The value associated with the node.                                     |
| auxExistence | bool      | Indicates the presence (true) or absence (false) of an auxiliary node.  |
| auxKey       | bytes32   | The key of the auxiliary node.                                          |
| auxValue     | bytes32   | The value of the auxiliary node.                                        |

## Errors info

### KeyAlreadyExists

```solidity
error KeyAlreadyExists(bytes32 key)
```


### LeafDoesNotMatch

```solidity
error LeafDoesNotMatch(bytes32 currentKey, bytes32 key)
```


### MaxDepthExceedsHardCap

```solidity
error MaxDepthExceedsHardCap(uint32 maxDepth)
```


### MaxDepthIsZero

```solidity
error MaxDepthIsZero()
```


### MaxDepthReached

```solidity
error MaxDepthReached()
```


### NewMaxDepthMustBeLarger

```solidity
error NewMaxDepthMustBeLarger(uint32 currentDepth, uint32 newDepth)
```


### NodeDoesNotExist

```solidity
error NodeDoesNotExist(uint256 nodeId)
```


### TreeAlreadyInitialized

```solidity
error TreeAlreadyInitialized()
```


### TreeNotInitialized

```solidity
error TreeNotInitialized()
```


### TreeIsNotEmpty

```solidity
error TreeIsNotEmpty()
```


## Modifiers info

### onlyInitialized

```solidity
modifier onlyInitialized(SparseMerkleTree.SMT storage tree)
```


## Functions info

### initialize

```solidity
function initialize(
    SparseMerkleTree.UintSMT storage tree,
    uint32 maxDepth_
) internal
```

The function to initialize the Merkle tree.
Under the hood it sets the maximum depth of the Merkle tree, therefore can be considered
alias function for the `setMaxDepth`.

Requirements:
- The current tree depth must be 0.



Parameters:

| Name      | Type                            | Description                       |
| :-------- | :------------------------------ | :-------------------------------- |
| tree      | struct SparseMerkleTree.UintSMT | self.                             |
| maxDepth_ | uint32                          | The max depth of the Merkle tree. |

### setMaxDepth

```solidity
function setMaxDepth(
    SparseMerkleTree.UintSMT storage tree,
    uint32 maxDepth_
) internal
```

The function to set the maximum depth of the Merkle tree. Complexity is O(1).

Requirements:
- The max depth must be greater than zero.
- The max depth can only be increased.
- The max depth is less than or equal to MAX_DEPTH_HARD_CAP (256).



Parameters:

| Name      | Type                            | Description                       |
| :-------- | :------------------------------ | :-------------------------------- |
| tree      | struct SparseMerkleTree.UintSMT | self.                             |
| maxDepth_ | uint32                          | The max depth of the Merkle tree. |

### setHashers

```solidity
function setHashers(
    SparseMerkleTree.UintSMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name   | Type                                                      | Description                                     |
| :----- | :-------------------------------------------------------- | :---------------------------------------------- |
| tree   | struct SparseMerkleTree.UintSMT                           | self.                                           |
| hash2_ | function (bytes32,bytes32) view returns (bytes32)         | The hash function that accepts two argument.    |
| hash3_ | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### add

```solidity
function add(
    SparseMerkleTree.UintSMT storage tree,
    bytes32 key_,
    uint256 value_
) internal
```

The function to add a new element to the uint256 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                            | Description               |
| :----- | :------------------------------ | :------------------------ |
| tree   | struct SparseMerkleTree.UintSMT | self.                     |
| key_   | bytes32                         | The key of the element.   |
| value_ | uint256                         | The value of the element. |

### remove

```solidity
function remove(SparseMerkleTree.UintSMT storage tree, bytes32 key_) internal
```

The function to remove a (leaf) element from the uint256 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                            | Description             |
| :--- | :------------------------------ | :---------------------- |
| tree | struct SparseMerkleTree.UintSMT | self.                   |
| key_ | bytes32                         | The key of the element. |

### update

```solidity
function update(
    SparseMerkleTree.UintSMT storage tree,
    bytes32 key_,
    uint256 newValue_
) internal
```

The function to update a (leaf) element in the uint256 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name      | Type                            | Description                   |
| :-------- | :------------------------------ | :---------------------------- |
| tree      | struct SparseMerkleTree.UintSMT | self.                         |
| key_      | bytes32                         | The key of the element.       |
| newValue_ | uint256                         | The new value of the element. |

### getProof

```solidity
function getProof(
    SparseMerkleTree.UintSMT storage tree,
    bytes32 key_
) internal view returns (SparseMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                            | Description              |
| :--- | :------------------------------ | :----------------------- |
| tree | struct SparseMerkleTree.UintSMT | self.                    |
| key_ | bytes32                         | The key of the element.  |


Return values:

| Name | Type                          | Description       |
| :--- | :---------------------------- | :---------------- |
| [0]  | struct SparseMerkleTree.Proof | SMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    SparseMerkleTree.UintSMT storage tree,
    SparseMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                            | Description            |
| :----- | :------------------------------ | :--------------------- |
| tree   | struct SparseMerkleTree.UintSMT | self.                  |
| proof_ | struct SparseMerkleTree.Proof   | The SMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### getRoot

```solidity
function getRoot(
    SparseMerkleTree.UintSMT storage tree
) internal view returns (bytes32)
```

The function to get the root of the Merkle tree.
Complexity is O(1).



Parameters:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| tree | struct SparseMerkleTree.UintSMT | self.       |


Return values:

| Name | Type    | Description                  |
| :--- | :------ | :--------------------------- |
| [0]  | bytes32 | The root of the Merkle tree. |

### getNode

```solidity
function getNode(
    SparseMerkleTree.UintSMT storage tree,
    uint256 nodeId_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                            | Description             |
| :------ | :------------------------------ | :---------------------- |
| tree    | struct SparseMerkleTree.UintSMT | self.                   |
| nodeId_ | uint256                         | The index of the node.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    SparseMerkleTree.UintSMT storage tree,
    uint256 key_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                            | Description              |
| :--- | :------------------------------ | :----------------------- |
| tree | struct SparseMerkleTree.UintSMT | self.                    |
| key_ | uint256                         | The key of the element.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getMaxDepth

```solidity
function getMaxDepth(
    SparseMerkleTree.UintSMT storage tree
) internal view returns (uint64)
```

The function to get the max depth of the Merkle tree.



Parameters:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| tree | struct SparseMerkleTree.UintSMT | self.       |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint64 | The max depth of the Merkle tree. |

### getNodesCount

```solidity
function getNodesCount(
    SparseMerkleTree.UintSMT storage tree
) internal view returns (uint64)
```

The function to get the number of nodes in the Merkle tree.



Parameters:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| tree | struct SparseMerkleTree.UintSMT | self.       |


Return values:

| Name | Type   | Description                             |
| :--- | :----- | :-------------------------------------- |
| [0]  | uint64 | The number of nodes in the Merkle tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    SparseMerkleTree.UintSMT storage tree
) internal view returns (bool)
```

The function to check if custom hash functions are set.



Parameters:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| tree | struct SparseMerkleTree.UintSMT | self.       |


Return values:

| Name | Type | Description                                             |
| :--- | :--- | :------------------------------------------------------ |
| [0]  | bool | True if custom hash functions are set, otherwise false. |

### initialize

```solidity
function initialize(
    SparseMerkleTree.Bytes32SMT storage tree,
    uint32 maxDepth_
) internal
```

The function to initialize the Merkle tree.
Under the hood it sets the maximum depth of the Merkle tree, therefore can be considered
alias function for the `setMaxDepth`.

Requirements:
- The current tree depth must be 0.



Parameters:

| Name      | Type                               | Description                       |
| :-------- | :--------------------------------- | :-------------------------------- |
| tree      | struct SparseMerkleTree.Bytes32SMT | self.                             |
| maxDepth_ | uint32                             | The max depth of the Merkle tree. |

### setMaxDepth

```solidity
function setMaxDepth(
    SparseMerkleTree.Bytes32SMT storage tree,
    uint32 maxDepth_
) internal
```

The function to set the maximum depth of the Merkle tree. Complexity is O(1).

Requirements:
- The max depth must be greater than zero.
- The max depth can only be increased.
- The max depth is less than or equal to MAX_DEPTH_HARD_CAP (256).



Parameters:

| Name      | Type                               | Description                       |
| :-------- | :--------------------------------- | :-------------------------------- |
| tree      | struct SparseMerkleTree.Bytes32SMT | self.                             |
| maxDepth_ | uint32                             | The max depth of the Merkle tree. |

### setHashers

```solidity
function setHashers(
    SparseMerkleTree.Bytes32SMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name   | Type                                                      | Description                                     |
| :----- | :-------------------------------------------------------- | :---------------------------------------------- |
| tree   | struct SparseMerkleTree.Bytes32SMT                        | self.                                           |
| hash2_ | function (bytes32,bytes32) view returns (bytes32)         | The hash function that accepts two argument.    |
| hash3_ | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### add

```solidity
function add(
    SparseMerkleTree.Bytes32SMT storage tree,
    bytes32 key_,
    bytes32 value_
) internal
```

The function to add a new element to the bytes32 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                               | Description               |
| :----- | :--------------------------------- | :------------------------ |
| tree   | struct SparseMerkleTree.Bytes32SMT | self.                     |
| key_   | bytes32                            | The key of the element.   |
| value_ | bytes32                            | The value of the element. |

### remove

```solidity
function remove(
    SparseMerkleTree.Bytes32SMT storage tree,
    bytes32 key_
) internal
```

The function to remove a (leaf) element from the bytes32 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description             |
| :--- | :--------------------------------- | :---------------------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.                   |
| key_ | bytes32                            | The key of the element. |

### update

```solidity
function update(
    SparseMerkleTree.Bytes32SMT storage tree,
    bytes32 key_,
    bytes32 newValue_
) internal
```

The function to update a (leaf) element in the bytes32 tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name      | Type                               | Description                   |
| :-------- | :--------------------------------- | :---------------------------- |
| tree      | struct SparseMerkleTree.Bytes32SMT | self.                         |
| key_      | bytes32                            | The key of the element.       |
| newValue_ | bytes32                            | The new value of the element. |

### getProof

```solidity
function getProof(
    SparseMerkleTree.Bytes32SMT storage tree,
    bytes32 key_
) internal view returns (SparseMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description              |
| :--- | :--------------------------------- | :----------------------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.                    |
| key_ | bytes32                            | The key of the element.  |


Return values:

| Name | Type                          | Description       |
| :--- | :---------------------------- | :---------------- |
| [0]  | struct SparseMerkleTree.Proof | SMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    SparseMerkleTree.Bytes32SMT storage tree,
    SparseMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                               | Description            |
| :----- | :--------------------------------- | :--------------------- |
| tree   | struct SparseMerkleTree.Bytes32SMT | self.                  |
| proof_ | struct SparseMerkleTree.Proof      | The SMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### getRoot

```solidity
function getRoot(
    SparseMerkleTree.Bytes32SMT storage tree
) internal view returns (bytes32)
```

The function to get the root of the Merkle tree.
Complexity is O(1).



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.       |


Return values:

| Name | Type    | Description                  |
| :--- | :------ | :--------------------------- |
| [0]  | bytes32 | The root of the Merkle tree. |

### getNode

```solidity
function getNode(
    SparseMerkleTree.Bytes32SMT storage tree,
    uint256 nodeId_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                               | Description             |
| :------ | :--------------------------------- | :---------------------- |
| tree    | struct SparseMerkleTree.Bytes32SMT | self.                   |
| nodeId_ | uint256                            | The index of the node.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    SparseMerkleTree.Bytes32SMT storage tree,
    bytes32 key_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description              |
| :--- | :--------------------------------- | :----------------------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.                    |
| key_ | bytes32                            | The key of the element.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getMaxDepth

```solidity
function getMaxDepth(
    SparseMerkleTree.Bytes32SMT storage tree
) internal view returns (uint64)
```

The function to get the max depth of the Merkle tree.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.       |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint64 | The max depth of the Merkle tree. |

### getNodesCount

```solidity
function getNodesCount(
    SparseMerkleTree.Bytes32SMT storage tree
) internal view returns (uint64)
```

The function to get the number of nodes in the Merkle tree.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.       |


Return values:

| Name | Type   | Description                             |
| :--- | :----- | :-------------------------------------- |
| [0]  | uint64 | The number of nodes in the Merkle tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    SparseMerkleTree.Bytes32SMT storage tree
) internal view returns (bool)
```

The function to check if custom hash functions are set.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.Bytes32SMT | self.       |


Return values:

| Name | Type | Description                                             |
| :--- | :--- | :------------------------------------------------------ |
| [0]  | bool | True if custom hash functions are set, otherwise false. |

### initialize

```solidity
function initialize(
    SparseMerkleTree.AddressSMT storage tree,
    uint32 maxDepth_
) internal
```

The function to initialize the Merkle tree.
Under the hood it sets the maximum depth of the Merkle tree, therefore can be considered
alias function for the `setMaxDepth`.

Requirements:
- The current tree depth must be 0.



Parameters:

| Name      | Type                               | Description                       |
| :-------- | :--------------------------------- | :-------------------------------- |
| tree      | struct SparseMerkleTree.AddressSMT | self.                             |
| maxDepth_ | uint32                             | The max depth of the Merkle tree. |

### setMaxDepth

```solidity
function setMaxDepth(
    SparseMerkleTree.AddressSMT storage tree,
    uint32 maxDepth_
) internal
```

The function to set the maximum depth of the Merkle tree. Complexity is O(1).

Requirements:
- The max depth must be greater than zero.
- The max depth can only be increased.
- The max depth is less than or equal to MAX_DEPTH_HARD_CAP (256).



Parameters:

| Name      | Type                               | Description                       |
| :-------- | :--------------------------------- | :-------------------------------- |
| tree      | struct SparseMerkleTree.AddressSMT | self.                             |
| maxDepth_ | uint32                             | The max depth of the Merkle tree. |

### setHashers

```solidity
function setHashers(
    SparseMerkleTree.AddressSMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name   | Type                                                      | Description                                     |
| :----- | :-------------------------------------------------------- | :---------------------------------------------- |
| tree   | struct SparseMerkleTree.AddressSMT                        | self.                                           |
| hash2_ | function (bytes32,bytes32) view returns (bytes32)         | The hash function that accepts two argument.    |
| hash3_ | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### add

```solidity
function add(
    SparseMerkleTree.AddressSMT storage tree,
    bytes32 key_,
    address value_
) internal
```

The function to add a new element to the address tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                               | Description               |
| :----- | :--------------------------------- | :------------------------ |
| tree   | struct SparseMerkleTree.AddressSMT | self.                     |
| key_   | bytes32                            | The key of the element.   |
| value_ | address                            | The value of the element. |

### remove

```solidity
function remove(
    SparseMerkleTree.AddressSMT storage tree,
    bytes32 key_
) internal
```

The function to remove a (leaf) element from the address tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description             |
| :--- | :--------------------------------- | :---------------------- |
| tree | struct SparseMerkleTree.AddressSMT | self.                   |
| key_ | bytes32                            | The key of the element. |

### update

```solidity
function update(
    SparseMerkleTree.AddressSMT storage tree,
    bytes32 key_,
    address newValue_
) internal
```

The function to update a (leaf) element in the address tree.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name      | Type                               | Description                   |
| :-------- | :--------------------------------- | :---------------------------- |
| tree      | struct SparseMerkleTree.AddressSMT | self.                         |
| key_      | bytes32                            | The key of the element.       |
| newValue_ | address                            | The new value of the element. |

### getProof

```solidity
function getProof(
    SparseMerkleTree.AddressSMT storage tree,
    bytes32 key_
) internal view returns (SparseMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description              |
| :--- | :--------------------------------- | :----------------------- |
| tree | struct SparseMerkleTree.AddressSMT | self.                    |
| key_ | bytes32                            | The key of the element.  |


Return values:

| Name | Type                          | Description       |
| :--- | :---------------------------- | :---------------- |
| [0]  | struct SparseMerkleTree.Proof | SMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    SparseMerkleTree.AddressSMT storage tree,
    SparseMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the SMT.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name   | Type                               | Description            |
| :----- | :--------------------------------- | :--------------------- |
| tree   | struct SparseMerkleTree.AddressSMT | self.                  |
| proof_ | struct SparseMerkleTree.Proof      | The SMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### getRoot

```solidity
function getRoot(
    SparseMerkleTree.AddressSMT storage tree
) internal view returns (bytes32)
```

The function to get the root of the Merkle tree.
Complexity is O(1).



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.AddressSMT | self.       |


Return values:

| Name | Type    | Description                  |
| :--- | :------ | :--------------------------- |
| [0]  | bytes32 | The root of the Merkle tree. |

### getNode

```solidity
function getNode(
    SparseMerkleTree.AddressSMT storage tree,
    uint256 nodeId_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                               | Description             |
| :------ | :--------------------------------- | :---------------------- |
| tree    | struct SparseMerkleTree.AddressSMT | self.                   |
| nodeId_ | uint256                            | The index of the node.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    SparseMerkleTree.AddressSMT storage tree,
    bytes32 key_
) internal view returns (SparseMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the tree.



Parameters:

| Name | Type                               | Description              |
| :--- | :--------------------------------- | :----------------------- |
| tree | struct SparseMerkleTree.AddressSMT | self.                    |
| key_ | bytes32                            | The key of the element.  |


Return values:

| Name | Type                         | Description |
| :--- | :--------------------------- | :---------- |
| [0]  | struct SparseMerkleTree.Node | The node.   |

### getMaxDepth

```solidity
function getMaxDepth(
    SparseMerkleTree.AddressSMT storage tree
) internal view returns (uint64)
```

The function to get the max depth of the Merkle tree.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.AddressSMT | self.       |


Return values:

| Name | Type   | Description                       |
| :--- | :----- | :-------------------------------- |
| [0]  | uint64 | The max depth of the Merkle tree. |

### getNodesCount

```solidity
function getNodesCount(
    SparseMerkleTree.AddressSMT storage tree
) internal view returns (uint64)
```

The function to get the number of nodes in the Merkle tree.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.AddressSMT | self.       |


Return values:

| Name | Type   | Description                             |
| :--- | :----- | :-------------------------------------- |
| [0]  | uint64 | The number of nodes in the Merkle tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    SparseMerkleTree.AddressSMT storage tree
) internal view returns (bool)
```

The function to check if custom hash functions are set.



Parameters:

| Name | Type                               | Description |
| :--- | :--------------------------------- | :---------- |
| tree | struct SparseMerkleTree.AddressSMT | self.       |


Return values:

| Name | Type | Description                                             |
| :--- | :--- | :------------------------------------------------------ |
| [0]  | bool | True if custom hash functions are set, otherwise false. |
