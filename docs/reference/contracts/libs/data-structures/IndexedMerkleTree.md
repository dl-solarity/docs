# IndexedMerkleTree

## Overview

#### License: MIT

```solidity
library IndexedMerkleTree
```

Indexed Merkle Tree Module

Gas usage for adding and updating 100 elements to an IndexedMT with the keccak256 and poseidon hash functions is detailed below:

Keccak256:
- CMT.add - 249k
- CMT.update - 250k

Poseidon:
- CMT.add - 1.13m
- CMT.update - 1.13m

Custom hashing functions can be provided before initialization to change how nodes and
leaves are hashed (useful for e.g. Poseidon-based hashing in zk environments). Default
keccak based hashing functions are used when custom hashers are not set.

## Usage Example

```solidity
using IndexedMerkleTree for IndexedMerkleTree.UintIndexedMT;

IndexedMerkleTree.UintIndexedMT internal tree;

tree.setHashers(hashFunctions);
tree.initialize();

uint256 leafIndex = tree.add(42, 0);

IndexedMerkleTree.Proof memory proof = tree.getProof(leafIndex, 42);

bool ok = tree.verifyProof(proof);
```
## Structs info

### UintIndexedMT

```solidity
struct UintIndexedMT {
	IndexedMerkleTree.IndexedMT _indexedMT;
}
```

UintIndexedMT     *
### Bytes32IndexedMT

```solidity
struct Bytes32IndexedMT {
	IndexedMerkleTree.IndexedMT _indexedMT;
}
```

Bytes32IndexedMT    *
### AddressIndexedMT

```solidity
struct AddressIndexedMT {
	IndexedMerkleTree.IndexedMT _indexedMT;
}
```

AddressIndexedMT    *
### IndexedMT

```solidity
struct IndexedMT {
	IndexedMerkleTree.LeafData[] leavesData;
	mapping(uint256 => bytes32[]) nodes;
	uint256 levelsCount;
	bool isCustomHasherSet;
	function (bytes32,bytes32) view returns (bytes32) hash2;
	function (bytes32,bytes32,bytes32,bytes32) view returns (bytes32) hash4;
}
```

Core storage structure for the Indexed Merkle tree.



Parameters:

| Name              | Type                                                              | Description                                                                                 |
| :---------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| leavesData        | struct IndexedMerkleTree.LeafData[]                               | compact storage of leaf metadata (value + pointer to next leaf).                            |
| nodes             | mapping(uint256 => bytes32[])                                     | mapping of level => array of node hashes; level 0 is leaves, top index is root.             |
| levelsCount       | uint256                                                           | current number of levels present in the tree (>= 1 after init).                             |
| isCustomHasherSet | bool                                                              | true when caller provided custom hash functions before init.                                |
| hash2             | function (bytes32,bytes32) view returns (bytes32)                 | A two-input hash function used to hash node pairs.                                          |
| hash4             | function (bytes32,bytes32,bytes32,bytes32) view returns (bytes32) | A four-input hash function used to hash leaf metadata (active flag, idx, value, nextIndex). |

### HashFunctions

```solidity
struct HashFunctions {
	function (bytes32,bytes32) view returns (bytes32) hash2;
	function (bytes32,bytes32,bytes32,bytes32) view returns (bytes32) hash4;
}
```

Container type for custom hashing functions.
### Proof

```solidity
struct Proof {
	bytes32 root;
	bytes32[] siblings;
	bool existence;
	uint256 index;
	bytes32 value;
	uint256 nextLeafIndex;
}
```

Merkle proof returned by `getProof` and used by `verifyProof`.



Parameters:

| Name          | Type      | Description                                                                                       |
| :------------ | :-------- | :------------------------------------------------------------------------------------------------ |
| root          | bytes32   | The root hash for which this proof should verify.                                                 |
| siblings      | bytes32[] | Array of sibling hashes used to reconstruct the root from the leaf.                               |
| existence     | bool      | Whether the supplied index/value exists (true) or this is an exclusion proof (false).             |
| index         | uint256   | The leaf index (position) within the leaves level used to compute the proof.                      |
| value         | bytes32   | The stored value for the leaf referenced by `index` (or candidate value for an exclusion check).  |
| nextLeafIndex | uint256   | For the indexed tree the leaf contains a pointer to the next leaf; used when hashing leaves.      |

### LeafData

```solidity
struct LeafData {
	bytes32 value;
	uint256 nextLeafIndex;
}
```

The main leaf metadata struct


Parameters:

| Name          | Type    | Description                                         |
| :------------ | :------ | :-------------------------------------------------- |
| value         | bytes32 | The stored bytes32 value for the leaf.              |
| nextLeafIndex | uint256 | Index of the next active leaf (ZERO_IDX when none). |

## Errors info

### ZeroLeafIndex

```solidity
error ZeroLeafIndex()
```


### IndexOutOfBounds

```solidity
error IndexOutOfBounds(uint256 index, uint256 level)
```


### InvalidLowLeaf

```solidity
error InvalidLowLeaf(uint256 lowLeafIndex, bytes32 newValue)
```


### InvalidProofIndex

```solidity
error InvalidProofIndex(uint256 index, bytes32 value)
```


### NotANodeLevel

```solidity
error NotANodeLevel()
```


### NotALowLeafIndex

```solidity
error NotALowLeafIndex(uint256 leafIndex, uint256 lowLeafIndex)
```


### IndexedMerkleTreeNotInitialized

```solidity
error IndexedMerkleTreeNotInitialized()
```


### IndexedMerkleTreeAlreadyInitialized

```solidity
error IndexedMerkleTreeAlreadyInitialized()
```


## Modifiers info

### onlyInitialized

```solidity
modifier onlyInitialized(IndexedMerkleTree.IndexedMT storage tree)
```


## Functions info

### initialize

```solidity
function initialize(IndexedMerkleTree.UintIndexedMT storage tree) internal
```

Initialize the in-storage Indexed Merkle tree wrapper for uint values.

Requirements:
- The tree must not already be initialized.



Parameters:

| Name | Type                                   | Description |
| :--- | :------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.UintIndexedMT | self.       |

### setHashers

```solidity
function setHashers(
    IndexedMerkleTree.UintIndexedMT storage tree,
    IndexedMerkleTree.HashFunctions memory hashFunctions_
) internal
```

Set custom hashing functions to be used by the tree.

Requirements:
- Must be called before the tree is initialized.



Parameters:

| Name           | Type                                   | Description                                    |
| :------------- | :------------------------------------- | :--------------------------------------------- |
| tree           | struct IndexedMerkleTree.UintIndexedMT | self.                                          |
| hashFunctions_ | struct IndexedMerkleTree.HashFunctions | The hash function container (hash2 and hash4). |

### add

```solidity
function add(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 value_,
    uint256 lowLeafIndex_
) internal returns (uint256)
```

Add a new uint value to the Indexed Merkle tree.

Complexity: O(log(levels)) where levels is the current tree height.



Parameters:

| Name          | Type                                   | Description                                            |
| :------------ | :------------------------------------- | :----------------------------------------------------- |
| tree          | struct IndexedMerkleTree.UintIndexedMT | self.                                                  |
| value_        | uint256                                | The value to insert.                                   |
| lowLeafIndex_ | uint256                                | A known low leaf index indicating insertion position.  |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The new leaf index for the inserted value. |

### update

```solidity
function update(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 leafIndex_,
    uint256 currentLowLeafIndex_,
    uint256 newValue_,
    uint256 newLowLeafIndex_
) internal
```

Update an existing leaf in the Indexed Merkle tree.

Requirements:
- leafIndex_ must be valid and initialized.



Parameters:

| Name                 | Type                                   | Description                                                   |
| :------------------- | :------------------------------------- | :------------------------------------------------------------ |
| tree                 | struct IndexedMerkleTree.UintIndexedMT | self.                                                         |
| leafIndex_           | uint256                                | The index of the leaf to update.                              |
| currentLowLeafIndex_ | uint256                                | The current low-leaf insertion point that precedes the leaf.  |
| newValue_            | uint256                                | New value to set.                                             |
| newLowLeafIndex_     | uint256                                | New low-leaf pointer (may be same as currentLowLeafIndex_).   |

### getProof

```solidity
function getProof(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 index_,
    uint256 value_
) internal view returns (IndexedMerkleTree.Proof memory)
```

Generate an inclusion/exclusion proof for the leaf at `index_`.

Complexity: O(levels) to build the proof.



Parameters:

| Name   | Type                                   | Description                                                                 |
| :----- | :------------------------------------- | :-------------------------------------------------------------------------- |
| tree   | struct IndexedMerkleTree.UintIndexedMT | self.                                                                       |
| index_ | uint256                                | The leaf index to build the proof for.                                      |
| value_ | uint256                                | The value expected at the index (used to validate existence vs exclusion).  |


Return values:

| Name | Type                           | Description                                         |
| :--- | :----------------------------- | :-------------------------------------------------- |
| [0]  | struct IndexedMerkleTree.Proof | A merkle Proof structure for `index_` and `value_`. |

### verifyProof

```solidity
function verifyProof(
    IndexedMerkleTree.UintIndexedMT storage tree,
    IndexedMerkleTree.Proof memory proof_
) internal view returns (bool)
```

Verify a proof produced by `getProof` for this tree instance.



Parameters:

| Name   | Type                                   | Description           |
| :----- | :------------------------------------- | :-------------------- |
| tree   | struct IndexedMerkleTree.UintIndexedMT | self.                 |
| proof_ | struct IndexedMerkleTree.Proof         | The proof to verify.  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | True if the proof matches the current root, false otherwise. |

### processProof

```solidity
function processProof(
    IndexedMerkleTree.Proof memory proof_
) internal view returns (bytes32)
```

Convenience helper to process a raw Proof using the default hashers (keccak256).



Parameters:

| Name   | Type                           | Description                         |
| :----- | :----------------------------- | :---------------------------------- |
| proof_ | struct IndexedMerkleTree.Proof | A proof as returned by `getProof`.  |


Return values:

| Name | Type    | Description                                                                   |
| :--- | :------ | :---------------------------------------------------------------------------- |
| [0]  | bytes32 | The computed root when hashing the proof values using default hash functions. |

### processProof

```solidity
function processProof(
    IndexedMerkleTree.Proof memory proof_,
    IndexedMerkleTree.HashFunctions memory hashFunctions_
) internal view returns (bytes32)
```

Process a proof using the provided hash functions.



Parameters:

| Name           | Type                                   | Description                                                 |
| :------------- | :------------------------------------- | :---------------------------------------------------------- |
| proof_         | struct IndexedMerkleTree.Proof         | A proof as returned by `getProof`.                          |
| hashFunctions_ | struct IndexedMerkleTree.HashFunctions | Custom hashing functions to use when processing the proof.  |


Return values:

| Name | Type    | Description                                                            |
| :--- | :------ | :--------------------------------------------------------------------- |
| [0]  | bytes32 | The computed root when hashing the proof using the provided functions. |

### getRoot

```solidity
function getRoot(
    IndexedMerkleTree.UintIndexedMT storage tree
) internal view returns (bytes32)
```

Get the current Merkle root for the tree.



Parameters:

| Name | Type                                   | Description |
| :--- | :------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.UintIndexedMT | self.       |


Return values:

| Name | Type    | Description            |
| :--- | :------ | :--------------------- |
| [0]  | bytes32 | The bytes32 root hash. |

### getTreeLevels

```solidity
function getTreeLevels(
    IndexedMerkleTree.UintIndexedMT storage tree
) internal view returns (uint256)
```

Get the current number of levels in the Indexed Merkle tree.



Parameters:

| Name | Type                                   | Description |
| :--- | :------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.UintIndexedMT | self.       |


Return values:

| Name | Type    | Description                                                    |
| :--- | :------ | :------------------------------------------------------------- |
| [0]  | uint256 | The number of levels used by the tree (>= 1 when initialized). |

### getLeafData

```solidity
function getLeafData(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 leafIndex_
) internal view returns (IndexedMerkleTree.LeafData memory)
```

Read data for a leaf in the tree.



Parameters:

| Name       | Type                                   | Description               |
| :--------- | :------------------------------------- | :------------------------ |
| tree       | struct IndexedMerkleTree.UintIndexedMT | self.                     |
| leafIndex_ | uint256                                | The leaf index to query.  |


Return values:

| Name | Type                              | Description                                   |
| :--- | :-------------------------------- | :-------------------------------------------- |
| [0]  | struct IndexedMerkleTree.LeafData | LeafData struct with value and nextLeafIndex. |

### getNodeHash

```solidity
function getNodeHash(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 index_,
    uint256 level_
) internal view returns (bytes32)
```

Get the hash of a node at a given index and level.



Parameters:

| Name   | Type                                   | Description                               |
| :----- | :------------------------------------- | :---------------------------------------- |
| tree   | struct IndexedMerkleTree.UintIndexedMT | self.                                     |
| index_ | uint256                                | Index of the node on the provided level.  |
| level_ | uint256                                | Level to query (0 == leaves).             |


Return values:

| Name | Type    | Description    |
| :--- | :------ | :------------- |
| [0]  | bytes32 | The node hash. |

### getLeavesCount

```solidity
function getLeavesCount(
    IndexedMerkleTree.UintIndexedMT storage tree
) internal view returns (uint256)
```

Get the total number of leaves in the tree.



Parameters:

| Name | Type                                   | Description |
| :--- | :------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.UintIndexedMT | self.       |


Return values:

| Name | Type    | Description                             |
| :--- | :------ | :-------------------------------------- |
| [0]  | uint256 | The number of leaves stored at level 0. |

### getLevelNodesCount

```solidity
function getLevelNodesCount(
    IndexedMerkleTree.UintIndexedMT storage tree,
    uint256 level_
) internal view returns (uint256)
```

Get the number of nodes present at a specific level of the tree.



Parameters:

| Name   | Type                                   | Description          |
| :----- | :------------------------------------- | :------------------- |
| tree   | struct IndexedMerkleTree.UintIndexedMT | self.                |
| level_ | uint256                                | The level to query.  |


Return values:

| Name | Type    | Description                                 |
| :--- | :------ | :------------------------------------------ |
| [0]  | uint256 | The number of nodes in the specified level. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IndexedMerkleTree.UintIndexedMT storage tree
) internal view returns (bool)
```

Returns true when custom hash functions were provided before initialization.



Parameters:

| Name | Type                                   | Description |
| :--- | :------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.UintIndexedMT | self.       |


Return values:

| Name | Type | Description                                      |
| :--- | :--- | :----------------------------------------------- |
| [0]  | bool | True if custom hashers are set, false otherwise. |

### initialize

```solidity
function initialize(IndexedMerkleTree.Bytes32IndexedMT storage tree) internal
```

Initialize the in-storage Indexed Merkle tree wrapper for bytes32 values.

Requirements:
- The tree must not already be initialized.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.Bytes32IndexedMT | self.       |

### setHashers

```solidity
function setHashers(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    IndexedMerkleTree.HashFunctions memory hashFunctions_
) internal
```

Set custom hashing functions to be used by the tree.

Requirements:
- Must be called before the tree is initialized.



Parameters:

| Name           | Type                                      | Description                                    |
| :------------- | :---------------------------------------- | :--------------------------------------------- |
| tree           | struct IndexedMerkleTree.Bytes32IndexedMT | self.                                          |
| hashFunctions_ | struct IndexedMerkleTree.HashFunctions    | The hash function container (hash2 and hash4). |

### add

```solidity
function add(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    bytes32 value_,
    uint256 lowLeafIndex_
) internal returns (uint256)
```

Add a new bytes32 value to the Indexed Merkle tree.

Complexity: O(log(levels)) where levels is the current tree height.



Parameters:

| Name          | Type                                      | Description                                            |
| :------------ | :---------------------------------------- | :----------------------------------------------------- |
| tree          | struct IndexedMerkleTree.Bytes32IndexedMT | self.                                                  |
| value_        | bytes32                                   | The value to insert.                                   |
| lowLeafIndex_ | uint256                                   | A known low leaf index indicating insertion position.  |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The new leaf index for the inserted value. |

### update

```solidity
function update(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    uint256 leafIndex_,
    uint256 currentLowLeafIndex_,
    bytes32 newValue_,
    uint256 newLowLeafIndex_
) internal
```

Update an existing leaf in the Indexed Merkle tree.

Requirements:
- leafIndex_ must be valid and initialized.



Parameters:

| Name                 | Type                                      | Description                                                   |
| :------------------- | :---------------------------------------- | :------------------------------------------------------------ |
| tree                 | struct IndexedMerkleTree.Bytes32IndexedMT | self.                                                         |
| leafIndex_           | uint256                                   | The index of the leaf to update.                              |
| currentLowLeafIndex_ | uint256                                   | The current low-leaf insertion point that precedes the leaf.  |
| newValue_            | bytes32                                   | New value to set.                                             |
| newLowLeafIndex_     | uint256                                   | New low-leaf pointer (may be same as currentLowLeafIndex_).   |

### getProof

```solidity
function getProof(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    uint256 index_,
    bytes32 value_
) internal view returns (IndexedMerkleTree.Proof memory)
```

Generate an inclusion/exclusion proof for the leaf at `index_`.

Complexity: O(levels) to build the proof.



Parameters:

| Name   | Type                                      | Description                                                                 |
| :----- | :---------------------------------------- | :-------------------------------------------------------------------------- |
| tree   | struct IndexedMerkleTree.Bytes32IndexedMT | self.                                                                       |
| index_ | uint256                                   | The leaf index to build the proof for.                                      |
| value_ | bytes32                                   | The value expected at the index (used to validate existence vs exclusion).  |


Return values:

| Name | Type                           | Description                                         |
| :--- | :----------------------------- | :-------------------------------------------------- |
| [0]  | struct IndexedMerkleTree.Proof | A merkle Proof structure for `index_` and `value_`. |

### verifyProof

```solidity
function verifyProof(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    IndexedMerkleTree.Proof memory proof_
) internal view returns (bool)
```

Verify a proof produced by `getProof` for this tree instance.



Parameters:

| Name   | Type                                      | Description           |
| :----- | :---------------------------------------- | :-------------------- |
| tree   | struct IndexedMerkleTree.Bytes32IndexedMT | self.                 |
| proof_ | struct IndexedMerkleTree.Proof            | The proof to verify.  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | True if the proof matches the current root, false otherwise. |

### getRoot

```solidity
function getRoot(
    IndexedMerkleTree.Bytes32IndexedMT storage tree
) internal view returns (bytes32)
```

Get the current Merkle root for the tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.Bytes32IndexedMT | self.       |


Return values:

| Name | Type    | Description            |
| :--- | :------ | :--------------------- |
| [0]  | bytes32 | The bytes32 root hash. |

### getTreeLevels

```solidity
function getTreeLevels(
    IndexedMerkleTree.Bytes32IndexedMT storage tree
) internal view returns (uint256)
```

Get the current number of levels in the Indexed Merkle tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.Bytes32IndexedMT | self.       |


Return values:

| Name | Type    | Description                                                    |
| :--- | :------ | :------------------------------------------------------------- |
| [0]  | uint256 | The number of levels used by the tree (>= 1 when initialized). |

### getLeafData

```solidity
function getLeafData(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    uint256 leafIndex_
) internal view returns (IndexedMerkleTree.LeafData memory)
```

Read data for a leaf in the tree.



Parameters:

| Name       | Type                                      | Description               |
| :--------- | :---------------------------------------- | :------------------------ |
| tree       | struct IndexedMerkleTree.Bytes32IndexedMT | self.                     |
| leafIndex_ | uint256                                   | The leaf index to query.  |


Return values:

| Name | Type                              | Description                                   |
| :--- | :-------------------------------- | :-------------------------------------------- |
| [0]  | struct IndexedMerkleTree.LeafData | LeafData struct with value and nextLeafIndex. |

### getNodeHash

```solidity
function getNodeHash(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    uint256 index_,
    uint256 level_
) internal view returns (bytes32)
```

Get the hash of a node at a given index and level.



Parameters:

| Name   | Type                                      | Description                               |
| :----- | :---------------------------------------- | :---------------------------------------- |
| tree   | struct IndexedMerkleTree.Bytes32IndexedMT | self.                                     |
| index_ | uint256                                   | Index of the node on the provided level.  |
| level_ | uint256                                   | Level to query (0 == leaves).             |


Return values:

| Name | Type    | Description    |
| :--- | :------ | :------------- |
| [0]  | bytes32 | The node hash. |

### getLeavesCount

```solidity
function getLeavesCount(
    IndexedMerkleTree.Bytes32IndexedMT storage tree
) internal view returns (uint256)
```

Get the total number of leaves in the tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.Bytes32IndexedMT | self.       |


Return values:

| Name | Type    | Description                             |
| :--- | :------ | :-------------------------------------- |
| [0]  | uint256 | The number of leaves stored at level 0. |

### getLevelNodesCount

```solidity
function getLevelNodesCount(
    IndexedMerkleTree.Bytes32IndexedMT storage tree,
    uint256 level_
) internal view returns (uint256)
```

Get the number of nodes present at a specific level of the tree.



Parameters:

| Name   | Type                                      | Description          |
| :----- | :---------------------------------------- | :------------------- |
| tree   | struct IndexedMerkleTree.Bytes32IndexedMT | self.                |
| level_ | uint256                                   | The level to query.  |


Return values:

| Name | Type    | Description                                 |
| :--- | :------ | :------------------------------------------ |
| [0]  | uint256 | The number of nodes in the specified level. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IndexedMerkleTree.Bytes32IndexedMT storage tree
) internal view returns (bool)
```

Returns true when custom hash functions were provided before initialization.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.Bytes32IndexedMT | self.       |


Return values:

| Name | Type | Description                                      |
| :--- | :--- | :----------------------------------------------- |
| [0]  | bool | True if custom hashers are set, false otherwise. |

### initialize

```solidity
function initialize(IndexedMerkleTree.AddressIndexedMT storage tree) internal
```

Initialize the in-storage Indexed Merkle tree wrapper for address values.

Requirements:
- The tree must not already be initialized.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.AddressIndexedMT | self.       |

### setHashers

```solidity
function setHashers(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    IndexedMerkleTree.HashFunctions memory hashFunctions_
) internal
```

Set custom hashing functions to be used by the tree.

Requirements:
- Must be called before the tree is initialized.



Parameters:

| Name           | Type                                      | Description                                    |
| :------------- | :---------------------------------------- | :--------------------------------------------- |
| tree           | struct IndexedMerkleTree.AddressIndexedMT | self.                                          |
| hashFunctions_ | struct IndexedMerkleTree.HashFunctions    | The hash function container (hash2 and hash4). |

### add

```solidity
function add(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    address value_,
    uint256 lowLeafIndex_
) internal returns (uint256)
```

Add a new address value to the Indexed Merkle tree.

Complexity: O(log(levels)) where levels is the current tree height.



Parameters:

| Name          | Type                                      | Description                                            |
| :------------ | :---------------------------------------- | :----------------------------------------------------- |
| tree          | struct IndexedMerkleTree.AddressIndexedMT | self.                                                  |
| value_        | address                                   | The address value to insert.                           |
| lowLeafIndex_ | uint256                                   | A known low leaf index indicating insertion position.  |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The new leaf index for the inserted value. |

### update

```solidity
function update(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    uint256 leafIndex_,
    uint256 currentLowLeafIndex_,
    address newValue_,
    uint256 newLowLeafIndex_
) internal
```

Update an existing leaf in the Indexed Merkle tree.

Requirements:
- leafIndex_ must be valid and initialized.



Parameters:

| Name                 | Type                                      | Description                                                   |
| :------------------- | :---------------------------------------- | :------------------------------------------------------------ |
| tree                 | struct IndexedMerkleTree.AddressIndexedMT | self.                                                         |
| leafIndex_           | uint256                                   | The index of the leaf to update.                              |
| currentLowLeafIndex_ | uint256                                   | The current low-leaf insertion point that precedes the leaf.  |
| newValue_            | address                                   | New address value to set.                                     |
| newLowLeafIndex_     | uint256                                   | New low-leaf pointer (may be same as currentLowLeafIndex_).   |

### getProof

```solidity
function getProof(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    uint256 index_,
    address value_
) internal view returns (IndexedMerkleTree.Proof memory)
```

Generate an inclusion/exclusion proof for the leaf at `index_`.

Complexity: O(levels) to build the proof.



Parameters:

| Name   | Type                                      | Description                                                                 |
| :----- | :---------------------------------------- | :-------------------------------------------------------------------------- |
| tree   | struct IndexedMerkleTree.AddressIndexedMT | self.                                                                       |
| index_ | uint256                                   | The leaf index to build the proof for.                                      |
| value_ | address                                   | The value expected at the index (used to validate existence vs exclusion).  |


Return values:

| Name | Type                           | Description                                         |
| :--- | :----------------------------- | :-------------------------------------------------- |
| [0]  | struct IndexedMerkleTree.Proof | A merkle Proof structure for `index_` and `value_`. |

### verifyProof

```solidity
function verifyProof(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    IndexedMerkleTree.Proof memory proof_
) internal view returns (bool)
```

Verify a proof produced by `getProof` for this tree instance.



Parameters:

| Name   | Type                                      | Description           |
| :----- | :---------------------------------------- | :-------------------- |
| tree   | struct IndexedMerkleTree.AddressIndexedMT | self.                 |
| proof_ | struct IndexedMerkleTree.Proof            | The proof to verify.  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | True if the proof matches the current root, false otherwise. |

### getRoot

```solidity
function getRoot(
    IndexedMerkleTree.AddressIndexedMT storage tree
) internal view returns (bytes32)
```

Get the current Merkle root for the tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.AddressIndexedMT | self.       |


Return values:

| Name | Type    | Description            |
| :--- | :------ | :--------------------- |
| [0]  | bytes32 | The bytes32 root hash. |

### getTreeLevels

```solidity
function getTreeLevels(
    IndexedMerkleTree.AddressIndexedMT storage tree
) internal view returns (uint256)
```

Get the current number of levels in the Indexed Merkle tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.AddressIndexedMT | self.       |


Return values:

| Name | Type    | Description                                                    |
| :--- | :------ | :------------------------------------------------------------- |
| [0]  | uint256 | The number of levels used by the tree (>= 1 when initialized). |

### getLeafData

```solidity
function getLeafData(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    uint256 leafIndex_
) internal view returns (IndexedMerkleTree.LeafData memory)
```

Read data for a leaf in the tree.



Parameters:

| Name       | Type                                      | Description               |
| :--------- | :---------------------------------------- | :------------------------ |
| tree       | struct IndexedMerkleTree.AddressIndexedMT | self.                     |
| leafIndex_ | uint256                                   | The leaf index to query.  |


Return values:

| Name | Type                              | Description                                   |
| :--- | :-------------------------------- | :-------------------------------------------- |
| [0]  | struct IndexedMerkleTree.LeafData | LeafData struct with value and nextLeafIndex. |

### getNodeHash

```solidity
function getNodeHash(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    uint256 index_,
    uint256 level_
) internal view returns (bytes32)
```

Get the hash of a node at a given index and level.



Parameters:

| Name   | Type                                      | Description                               |
| :----- | :---------------------------------------- | :---------------------------------------- |
| tree   | struct IndexedMerkleTree.AddressIndexedMT | self.                                     |
| index_ | uint256                                   | Index of the node on the provided level.  |
| level_ | uint256                                   | Level to query (0 == leaves).             |


Return values:

| Name | Type    | Description    |
| :--- | :------ | :------------- |
| [0]  | bytes32 | The node hash. |

### getLeavesCount

```solidity
function getLeavesCount(
    IndexedMerkleTree.AddressIndexedMT storage tree
) internal view returns (uint256)
```

Get the total number of leaves in the tree.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.AddressIndexedMT | self.       |


Return values:

| Name | Type    | Description                             |
| :--- | :------ | :-------------------------------------- |
| [0]  | uint256 | The number of leaves stored at level 0. |

### getLevelNodesCount

```solidity
function getLevelNodesCount(
    IndexedMerkleTree.AddressIndexedMT storage tree,
    uint256 level_
) internal view returns (uint256)
```

Get the number of nodes present at a specific level of the tree.



Parameters:

| Name   | Type                                      | Description          |
| :----- | :---------------------------------------- | :------------------- |
| tree   | struct IndexedMerkleTree.AddressIndexedMT | self.                |
| level_ | uint256                                   | The level to query.  |


Return values:

| Name | Type    | Description                                 |
| :--- | :------ | :------------------------------------------ |
| [0]  | uint256 | The number of nodes in the specified level. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IndexedMerkleTree.AddressIndexedMT storage tree
) internal view returns (bool)
```

Returns true when custom hash functions were provided before initialization.



Parameters:

| Name | Type                                      | Description |
| :--- | :---------------------------------------- | :---------- |
| tree | struct IndexedMerkleTree.AddressIndexedMT | self.       |


Return values:

| Name | Type | Description                                      |
| :--- | :--- | :----------------------------------------------- |
| [0]  | bool | True if custom hashers are set, false otherwise. |
