# ➕ Incremental Merkle Tree

## Introduction

The Incremental Merkle Tree library library provides a cost-effective and straightforward method for maintaining the Merkle Tree data structure on-chain, including the capability to retrieve its root at the contract level. It also offers the flexibility to set a custom hash function, such as the Poseidon hash function, to make it ZKP-friendly. It has been implemented following the analysis of the [Deposit Contract Verification](https://github.com/runtimeverification/deposit-contract-verification/blob/master/deposit-contract-verification.pdf).

## Implementation

The `IncrementalMerkleTree` library uses two main components: `branches`, a minimal set of subtree hashes for root calculations, and `leavesCount`, to keep track of the number of elements. This setup enables the on-chain computation of the root with logarithmic complexity. However, due to its minimalist design, generating a Merkle proof on-chain is not supported, as it requires the whole tree to be stored.

In the example below, the tree is nearly full, utilizing all `branches`. Initially, the root is set to the zero hash (`hash(0)`), so we start from the rightmost non-zero element, which is the first element in our branches field. Then, we use the second element in the `branches` array, representing the hash of a subtree. Eventually, we retrieve the tree root hash. Elements in the tree that are used to obtain the tree root are shown in the image below.

<figure>
    <img src={require("/static/img/docs/incremental-merkle-tree.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>Elements in the Merkle Tree used to determine the Merkle Tree Root</figcaption>
</figure>

The next attempt to add a new element to the tree will result in tree growth. As we complete a tree with four elements, it will attempt to add the element at index 3 to the branches array. If the array size is insufficient, the element will simply be pushed there.

in general, to retrieve the Merkle Tree Root, we need to iterate over each level of the tree. The `leavesCount` field determines which pair of elements should be hashed to obtain the parent node hash. The algorithm is as follows:

```python
root: int = zeroHashes[0]
size: int = leavesCount
treeHeight: int = len(branches)
h: int = 0

while h < treeHeight:
    if size % 2 == 1:  # if size is odd
        root = hash(branches[h], root)
    else:              # if size is even
        root = hash(root, zeroHashes[h])
    size //= 2
    h += 1

return root
```

It is also possible to manually specify the tree height beforehand. The tree height is indicated by the size of the `branches` array, meaning that if the array length is 40, then the tree size will also be 40.

In cases where the tree is almost full (only one element missing) and its height was set manually, an attempt to complete the tree will **cause a revert**. To continue using the existing tree, it is possible to resize the tree, making it larger.

The last unique feature of the Incremental Merkle Tree implementation is the ability to set custom hash functions. This is particularly useful when working in a field where a specific hash function must be used due to technical reasons or business logic (e.g., using the Poseidon hash function).

## Functions

To use the `IncrementalMerkleTree` contract, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/data-structures/IncrementalMerkleTree.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using IncrementalMerkleTree for IncrementalMerkleTree.UintIMT;
using IncrementalMerkleTree for IncrementalMerkleTree.Bytes32IMT;
using IncrementalMerkleTree for IncrementalMerkleTree.AddressIMT;
```

### setHeight

```solidity
function setHeight(UintIMT storage tree, uint256 height_) internal;
```

```solidity
function setHeight(Bytes32IMT storage tree, uint256 height_) internal;
```

```solidity
function setHeight(AddressIMT storage tree, uint256 height_) internal;
```

#### Description

This function sets the height of the Merkle Tree. It **reverts** if the provided height is less than or equal to the current Merkle Tree height. After the Tree Height is set, it will no longer grow automatically, and its height will have to be adjusted manually.

**Time complexity**

Constant.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

uintTree.setHeight(2); 

uintTree.height(); // 2

uintTree.setHeight(1);
// Reverts with 
// "IncrementalMerkleTree: the height must be greater than the current one"
```

### add

```solidity
function add(UintIMT storage tree, uint256 element_) internal;
```

```solidity
function add(Bytes32IMT storage tree, bytes32 element_) internal;
```

```solidity
function add(AddressIMT storage tree, address element_) internal;
```

#### Description

This function adds a new element to the tree. In the case where the tree has (`2^n - 1`) elements, where (`n`) is the tree height, the addition of a new element will trigger tree growth.

However, if the tree height was previously set manually, the operation will revert.

**Time complexity**

`O(log(n))`, where `n` is the number of elements in the tree.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

uintTree.add(120);

uintTree.height(); // 1

uintTree.add(200); 

// Automatic tree growth when the limit of 2^n - 1 is reached
uintTree.height(); // 2
```

### setHashers

```solidity
function setHashers(
    UintIMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal;
```

```solidity
function setHashers(
    Bytes32IMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal;
```

```solidity
function setHashers(
    AddressIMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal;
```

#### Description

This function sets custom hash functions to be used for Merkle Tree construction. The function will **revert** if the tree already contains at least one leaf.

#### **Time complexity**

Constant.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

function _hash1(bytes32 element1_) internal pure returns (bytes32) {
    return bytes32(PoseidonUnit1L.poseidon([uint256(element1_)]));
}

function _hash2(
    bytes32 element1_, 
    bytes32 element2_
) internal pure returns (bytes32) {
    return bytes32(
        PoseidonUnit2L.poseidon([uint256(element1_), uint256(element2_)])
    );
}

uintTree.setHashers(_hash1, _hash2);
```

### root

```solidity
function root(UintIMT storage tree) internal view returns (bytes32);
```

```solidity
function root(Bytes32IMT storage tree) internal view returns (bytes32);
```

```solidity
function root(AddressIMT storage tree) internal view returns (bytes32);
```

#### Description

This function calculates and returns the root of the Merkle Tree based on the elements that were added to the tree previously and the tree's height

#### **Time complexity**

`O(log(n) + h)`, where `n` is the number of elements in the tree and `h` is the height of the tree.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

uintTree.add(1);

uintTree.root(); // keccak256(keccak256(0) . keccak256(1))
```

### height

```solidity
function height(UintIMT storage tree) internal view returns (uint256);
```

```solidity
function height(Bytes32IMT storage tree) internal view returns (uint256);
```

```solidity
function height(AddressIMT storage tree) internal view returns (uint256)
```

#### Description

This function returns the tree height, which corresponds directly to the length of the `branches` array.

#### **Time complexity**

Constant.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

uintTree.add(10);

uintTree.height(); // 1

uintTree.add(200); 
uintTree.add(250); 
uintTree.add(100); 

uintTree.height(); // 3
```

### length

```solidity
function length(UintIMT storage tree) internal view returns (uint256);
```

```solidity
function length(Bytes32IMT storage tree) internal view returns (uint256);
```

```solidity
function length(AddressIMT storage tree) internal view returns (uint256);
```

#### Description

This function returns the number of leaves that have been added to the Merkle Tree.

#### **Time complexity**

Constant.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

uintTree.add(10);

uintTree.length(); // 1

uintTree.add(200); 
uintTree.add(250); 
uintTree.add(100); 

uintTree.length(); // 4
```

### isCustomHasherSet

```solidity
function isCustomHasherSet(UintIMT storage tree) internal view returns (bool);
```

```solidity
function isCustomHasherSet(Bytes32IMT storage tree) internal view returns (bool);
```

```solidity
function isCustomHasherSet(AddressIMT storage tree) internal view returns (bool);
```

#### Description

This function returns true, if the custom hash function was set, and false otherwise.

#### **Time complexity**

Constant.

#### Example

```solidity
IncrementalMerkleTree.UintIMT public uintTree;

function _hash1(bytes32 element1_) internal pure returns (bytes32) {
    return bytes32(PoseidonUnit1L.poseidon([uint256(element1_)]));
}

function _hash2(
    bytes32 element1_, 
    bytes32 element2_
) internal pure returns (bytes32) {
    return bytes32(
        PoseidonUnit2L.poseidon([uint256(element1_), uint256(element2_)])
    );
}

uintTree.isCustomHasherSet(); // false

uintTree.setHashers(_hash1, _hash2);

uintTree.isCustomHasherSet(); // true
```
