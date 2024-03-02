# #️⃣ Sparse Merkle Tree

## Introduction

The Sparse Merkle Tree library provides a way to efficiently store an entire Merkle Tree data structure on-chain. This includes the capability to obtain **Inclusion** or **Exclusion** Merkle Tree Proofs (MTP) directly from the contract. Additionally, the library provides the flexibility to set a custom hash function, such as the Poseidon hash function, making it ZKP-friendly. Its origin is based on the [iden3 SMTLib implementation](https://github.com/iden3/contracts/blob/master/contracts/lib/SmtLib.sol) and the ["Sparse Merkle Trees" PDF](https://docs.iden3.io/publications/pdfs/Merkle-Tree.pdf), but it has been optimized and polished.

## Implementation

The `SparseMerkleTree` library contains three main structures:

1. **SMT**: This structure stores all nodes, keeps track of their count, contains a pointer to the Root Node, and maintains the tree's depth.
2. **Node**: This structure contains information about the tree element, including its children (left and right), hash, key, value, and type.
3. **Proof Structure**: This includes the Merkle Tree Proof (MTP) and auxiliary information for the MTP proof.

These data structures store all leaves and build the tree from the top to bottom. The gas cost for addition increases linearly with each tree level. The gas cost growth can be approximated by the following formula: `y = 92,457x + 255,689`

For example, if a leaf is added at tree level `50`, the addition operation would cost `4,878,539` gas units.

In the example below, the tree contains three elements. SMT defines three different types of nodes:

* **Empty**: This means all values are zero.
* **Middle**: A node that does not contain a key and value.
* **Leaf**: A node that contains a key and value, with both child left and right set to zero.

Each node also contains a hash; for an `Empty` type node, it is zero.

For a `Middle` node, it is calculated as follows: `H(H_L || H_R)`, where `H` is the hash function used within the library, `H_L` is the hash of the left node, and `H_R` is the hash of the right node. By default, the hash function is `Keccak-256`, but it can be changed to another, such as the `Poseidon` hash function.

For a `Leaf` node, the hash is calculated like: `H(1 || k || v)`, where `1` acts as a domain separator, `k` is a key that determines where the leaf will be located in the tree, and `v` is a value representing some data.

<figure>
    <img src={require("/static/img/docs/sparse-merkle-tree.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>SMT that contains three elements</figcaption>
</figure>

When a new element is added to the tree, the binary representation of the key is used to determine the correct placement within the tree. The following steps are taken:

1. The tree is recursively navigated to find an "empty" slot (an `Empty` node) where the new `Leaf` node can be placed.
2. The path is decided based on the element's key, left is chosen for a bit value of 0 and right for a bit value of 1.
3. If a `Leaf` node is encountered during the insertion process, it is pushed down, and `Middle` nodes are inserted in their stead until a bit that differs between the leaves is identified. This scenario is illustrated on the image above. when the differing bit at position 3 leads to the creation of a branch at the tree's third level.

The aim of the implementation is to optimize gas efficiency for Sparse Merkle Tree operations while allowing flexibility with various types and values of keys. The significant updates have been made as follows:

* Optimized storage usage to reduce the number of storage slots.
* Added the ability to set custom hash functions.
* Removed methods and associated storage for managing the tree root's history.

A detailed breakdown of gas usage for the addition of 16,001 leaves (using the addBytes32 method) to a tree of size 80 is provided below:

<table>
  <tr>
    <th>Statistic</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Mean</td>
    <td>16,001</td>
  </tr>
  <tr>
    <td>Mean</td>
    <td>1,444,220 gas</td>
  </tr>
  <tr>
    <td>Std Dev</td>
    <td>209,147.6 gas</td>
  </tr>
  <tr>
    <td>Min</td>
    <td>177,853 gas</td>
  </tr>
  <tr>
    <td>25%</td>
    <td>1,317,555 gas</td>
  </tr>
  <tr>
    <td>50%</td>
    <td>1,461,562 gas</td>
  </tr>
  <tr>
    <td>75%</td>
    <td>1,554,030 gas</td>
  </tr>
  <tr>
    <td>Max</td>
    <td>2,723,812 gas</td>
  </tr>
</table>

## Functions

To use the `SparseMerkleTree` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/data-structures/SparseMerkleTree.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using SparseMerkleTree for SparseMerkleTree.UintSMT;
using SparseMerkleTree for SparseMerkleTree.Bytes32SMT;
using SparseMerkleTree for SparseMerkleTree.AddressSMT;
```

### constructor

```solidity
function initialize(UintSMT storage tree, uint256 maxDepth_) internal;
```

```solidity
function initialize(Bytes32SMT storage tree, uint256 maxDepth_) internal;
```

```solidity
function initialize(AddressSMT storage tree, uint256 maxDepth_) internal;
```

#### Description

The function is used for initializing the Sparse Merkle Tree data structure. To start working with a tree, it is required to set a maximum depth. This maximum depth is used in the `getProof` and `getNodeByKey` functions.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.initialize(20);

// Reverts: SparseMerkleTree: tree is already initialized
uintTree.initialize(25);
```

### setMaxDepth

```solidity
function setMaxDepth(UintSMT storage tree, uint256 maxDepth_) internal;
```

```solidity
function setMaxDepth(Bytes32SMT storage tree, uint256 maxDepth_) internal;
```

```solidity
function setMaxDepth(AddressSMT storage tree, uint256 maxDepth_) internal;
```

#### Description

This function sets the maximum depth of the Merkle Tree. It reverts if the provided height is less than or equal to the current Merkle Tree depth. Also, it cannot exceed 256 due to the limitations of the uint256 data type; depths greater than 256 are not feasible.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.setMaxDepth(2); 

uintTree.getMaxDepth(); // 2

// Reverts: SparseMerkleTree: max depth can only be increased
uintTree.setHeight(1);
```

### setHashers

```solidity
function setHashers(
    UintSMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal;
```

```solidity
function setHashers(
    Bytes32SMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal;
```

```solidity
function setHashers(
    AddressSMT storage tree,
    function(bytes32, bytes32) view returns (bytes32) hash2_,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal;
```

#### Description

This function sets custom hash functions to be used for Merkle Tree construction.
The function will **revert** if the tree already contains at least one leaf.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

function _hash2(bytes32 element1_, bytes32 element2_) internal pure returns (bytes32) {
    return bytes32(PoseidonUnit2L.poseidon([uint256(element1_), uint256(element2_)]));
}

function _hash3(
    bytes32 element1_,
    bytes32 element2_,
    bytes32 element3_
) internal pure returns (bytes32) {
    return
        bytes32(
            PoseidonUnit3L.poseidon(
                [uint256(element1_), uint256(element2_), uint256(element3_)]
            )
        );
}

uintTree.setHashers(_hash2, _hash3);
```

### add

```solidity
function add(UintSMT storage tree, uint256 key_, uint256 value_) internal;
```

```solidity
function add(Bytes32SMT storage tree, bytes32 key_, bytes32 value_) internal;
```

```solidity
function add(AddressSMT storage tree, bytes32 key_, address value_) internal'
```

#### Description

This function adds a new element to the tree. The algorithm for adding an element to the tree is recursive; therefore, the maximum depth specifies the point up to which the recursion can proceed.

#### Time complexity

`O(n)`, where `n` is the max depth of the tree.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.initialize(20);

// key: 3; value: 5
// Leaf hash: H(1 || 3 || 5)
uintTree.add(3, 5); 

// key: 1; value: 10
// Leaf hash: H(1 || 1 || 10)
uintTree.add(1, 10);

// 0x03a14b15187328b46952f37dbb8f36620c8f12e97e4c0dc8b147e7060337c2ab
uintTree.getRoot();
```

### root

```solidity
function getProof(UintSMT storage tree, uint256 key_) internal view returns (Proof memory);
```

```solidity
function getProof(Bytes32SMT storage tree, bytes32 key_) internal view returns (Proof memory);
```

```solidity
function getProof(AddressSMT storage tree, bytes32 key_) internal view returns (Proof memory);
```

#### Description

This function generates Inclusion/Exclusion proofs for an element in the tree. The process is as follows:

1. **Algorithm Initiation**: When a key is provided, the algorithm recursively traverses the tree.
2. **Inclusion Proof**: If the algorithm encounters a `Leaf` with exactly the same key, it will return an Inclusion proof, indicating that the element exists within the tree.
3. **Exclusion Proof with Different Key**: If the algorithm encounters a `Leaf` whose key does not match the requested one, it will return an Exclusion proof. This proof includes the data of the encountered leaf, indicating that the requested element does not exist in the tree.
4. **Exclusion Proof with Empty Node**: If the algorithm encounters an empty node, it will also return an Exclusion proof, signifying that the element does not exist in the tree.

#### Time complexity

`O(n)`, where `n` is the max depth of the tree.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.add(3, 5); 
uintTree.add(1, 10);

uintTree.getProof(3); 
// Root: 0x03a14b15187328b46952f37dbb8f36620c8f12e97e4c0dc8b147e7060337c2ab
// Siblings: [
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   0x273b79dd2dbb4163ccbee92a259242d3d728b787e5cb5b69e45509c6b8b6a19c
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   ... (x16)
//   0x0000000000000000000000000000000000000000000000000000000000000000
// ]
// existence: true
// index: 0x0000000000000000000000000000000000000000000000000000000000000003
// value: 0x0000000000000000000000000000000000000000000000000000000000000005
// auxExistence: false
// auxIndex: 0x0000000000000000000000000000000000000000000000000000000000000000
// auxValue: 0x0000000000000000000000000000000000000000000000000000000000000000

uintTree.getProof(7); 
// Root: 0x03a14b15187328b46952f37dbb8f36620c8f12e97e4c0dc8b147e7060337c2ab
// Siblings: [
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   0x273b79dd2dbb4163ccbee92a259242d3d728b787e5cb5b69e45509c6b8b6a19c
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   ... (x16)
//   0x0000000000000000000000000000000000000000000000000000000000000000
// ]
// existence: false
// index: 0x0000000000000000000000000000000000000000000000000000000000000007
// value: 0x0000000000000000000000000000000000000000000000000000000000000005
// auxExistence: true
// auxIndex: 0x0000000000000000000000000000000000000000000000000000000000000003
// auxValue: 0x0000000000000000000000000000000000000000000000000000000000000005

uintTree.getProof(2);
// Root: 0x03a14b15187328b46952f37dbb8f36620c8f12e97e4c0dc8b147e7060337c2ab
// Siblings: [
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   0x273b79dd2dbb4163ccbee92a259242d3d728b787e5cb5b69e45509c6b8b6a19c
//   0x0000000000000000000000000000000000000000000000000000000000000000
//   ... (x16)
//   0x0000000000000000000000000000000000000000000000000000000000000000
// ]
// existence: false
// index: 0x0000000000000000000000000000000000000000000000000000000000000002
// value: 0x0000000000000000000000000000000000000000000000000000000000000000
// auxExistence: false
// auxIndex: 0x0000000000000000000000000000000000000000000000000000000000000000
// auxValue: 0x0000000000000000000000000000000000000000000000000000000000000000
```

### getRoot

```solidity
function getRoot(UintSMT storage tree) internal view returns (bytes32);
```

```solidity
function getRoot(Bytes32SMT storage tree) internal view returns (bytes32);
```

```solidity
function getRoot(AddressSMT storage tree) internal view returns (bytes32);
```

#### Description

This function calculates and returns the root of the Merkle Tree based on the elements that have been previously added to the tree.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.add(3, 5); 
uintTree.add(1, 10);

// 0x03a14b15187328b46952f37dbb8f36620c8f12e97e4c0dc8b147e7060337c2ab
uintTree.getRoot();
```

### getNode

```solidity
function getNode(UintSMT storage tree, uint256 nodeId_) internal view returns (Node memory);
```

```solidity
function getNode(
    Bytes32SMT storage tree,
    uint256 nodeId_
) internal view returns (Node memory);
```

```solidity
function getNode(
    AddressSMT storage tree,
    uint256 nodeId_
) internal view returns (Node memory);
```

#### Description

This function returns a node element by its index in the tree. Each `Middle` or `Leaf` element is assigned a sequential or numerical order when added to the tree, stqarting with index 1.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.add(3, 5); 
uintTree.add(1, 10);

uintTree.getNode(1); // key: 3; value: 5; type: Leaf
uintTree.getNode(2); // key: 1; value: 10; type: Leaf
uintTree.getNode(3); // childLeft: 2; childRight: 1; type: Middle
```

### getNodeByKey

```solidity
function getNodeByKey(UintSMT storage tree, uint256 key_) internal view returns (Node memory);
```

```solidity
function getNodeByKey(
    Bytes32SMT storage tree,
    bytes32 key_
) internal view returns (Node memory);
```

```solidity
function getNodeByKey(
    AddressSMT storage tree,
    bytes32 key_
) internal view returns (Node memory);
```

#### Description

This function returns a `Leaf` node for the given key.

#### Time complexity

`O(n)`, where `n` is the max depth of the tree.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.add(3, 5); 
uintTree.add(1, 10);

uintTree.getNodeByKey(3); // key: 3; value: 5;
uintTree.getNodeByKey(10); // key: 0; value: 0;
```

### getMaxDepth

```solidity
function getMaxDepth(UintSMT storage tree) internal view returns (uint256);
```

```solidity
function getMaxDepth(Bytes32SMT storage tree) internal view returns (uint256);
```

```solidity
function getMaxDepth(AddressSMT storage tree) internal view returns (uint256)
```

#### Description

This function returns the maximum depth of the tree.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.getMaxDepth(); // 0

uintTree.setMaxDepth(20); 

uintTree.getMaxDepth(); // 20
```

### getNodesCount

```solidity
function getNodesCount(UintSMT storage tree) internal view returns (uint256);
```

```solidity
function getNodesCount(Bytes32SMT storage tree) internal view returns (uint256);
```

```solidity
function getNodesCount(AddressSMT storage tree) internal view returns (uint256);
```

#### Description

This function returns the total number of nodes (the sum of the Middle and Leaf nodes) in the Merkle Tree.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

uintTree.add(3, 5); 

uintTree.getNodesCount(); // 1; 1 Leaf node

uintTree.add(1, 10);

uintTree.getNodesCount(); // 3; 2 Leaf nodes and 1 Middle
```

### isCustomHasherSet

```solidity
function isCustomHasherSet(UintSMT storage tree) internal view returns (bool);
```

```solidity
function isCustomHasherSet(Bytes32SMT storage tree) internal view returns (bool);
```

```solidity
function isCustomHasherSet(AddressSMT storage tree) internal view returns (bool);
```

#### Description

This function returns true, if the custom hash function was set, and false otherwise.

#### Time complexity

Constant.

#### Example

```solidity
SparseMerkleTree.UintSMT public uintTree;

function _hash2(bytes32 element1_, bytes32 element2_) internal pure returns (bytes32) {
    return bytes32(PoseidonUnit2L.poseidon([uint256(element1_), uint256(element2_)]));
}

function _hash3(
    bytes32 element1_,
    bytes32 element2_,
    bytes32 element3_
) internal pure returns (bytes32) {
    return
        bytes32(
            PoseidonUnit3L.poseidon(
                [uint256(element1_), uint256(element2_), uint256(element3_)]
            )
        );
}

uintTree.isCustomHasherSet(); // false

uintTree.setHashers(_hash2, _hash3);

uintTree.isCustomHasherSet(); // true
```

## Production References

* [rarimo/voting-contracts](https://github.com/rarimo/voting-contracts) uses SMT to store commitments of users registrations.
