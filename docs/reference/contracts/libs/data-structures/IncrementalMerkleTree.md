# IncrementalMerkleTree

## Overview

#### License: MIT

```solidity
library IncrementalMerkleTree
```

Incremental Merkle Tree module

This implementation is a modification of the Incremental Merkle Tree data structure described
in [Deposit Contract Verification](https://github.com/runtimeverification/deposit-contract-verification/blob/master/deposit-contract-verification.pdf).

This implementation aims to optimize and improve the original data structure.

The main differences are:
- No explicit constructor; the tree is initialized when the first element is added
- Growth is not constrained; the height of the tree automatically increases as elements are added

Zero hashes are computed each time the getRoot function is called.

Gas usage for _add and _root functions (where count is the number of elements added to the tree):

| Statistic | _add         | _root            |
| --------- | ------------ | ---------------- |
| count     | 49999        | 49999            |
| mean      | 38972 gas    | 60213 gas        |
| std       | 3871 gas     | 4996 gas         |
| min       | 36251 gas    | 31238 gas        |
| 25%       | 36263 gas    | 57020 gas        |
| 50%       | 38954 gas    | 60292 gas        |
| 75%       | 41657 gas    | 63564 gas        |
| max       | 96758 gas    | 78071 gas        |

## Usage example:

```
using IncrementalMerkleTree for IncrementalMerkleTree.UintIMT;

IncrementalMerkleTree.UintIMT internal uintTree;

................................................

uintTree.add(1234);

uintTree.root();

uintTree.height();

uintTree.length();
```
## Structs info

### UintIMT

```solidity
struct UintIMT {
	IncrementalMerkleTree.IMT _tree;
}
```

UintIMT      *
### Bytes32IMT

```solidity
struct Bytes32IMT {
	IncrementalMerkleTree.IMT _tree;
}
```

Bytes32IMT     *
### AddressIMT

```solidity
struct AddressIMT {
	IncrementalMerkleTree.IMT _tree;
}
```

AddressIMT      *
### IMT

```solidity
struct IMT {
	bytes32[] branches;
	uint256 leavesCount;
	bool isStrictHeightSet;
	bool isCustomHasherSet;
	function (bytes32) view returns (bytes32) hash1;
	function (bytes32,bytes32) view returns (bytes32) hash2;
}
```

InnerIMT       *
## Errors info

### NewHeightMustBeGreater

```solidity
error NewHeightMustBeGreater(uint256 currentHeight, uint256 newHeight)
```


### TreeIsNotEmpty

```solidity
error TreeIsNotEmpty()
```


### TreeIsFull

```solidity
error TreeIsFull()
```


## Functions info

### setHeight

```solidity
function setHeight(
    IncrementalMerkleTree.UintIMT storage tree,
    uint256 height_
) internal
```

The function to set the height of the uint256 tree.
Complexity is O(1).



Parameters:

| Name    | Type                                 | Description                                                                |
| :------ | :----------------------------------- | :------------------------------------------------------------------------- |
| tree    | struct IncrementalMerkleTree.UintIMT | self.                                                                      |
| height_ | uint256                              | The new height of the Merkle tree. Should be greater than the current one. |

### add

```solidity
function add(
    IncrementalMerkleTree.UintIMT storage tree,
    uint256 element_
) internal
```

The function to add a new element to the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name     | Type                                 | Description             |
| :------- | :----------------------------------- | :---------------------- |
| tree     | struct IncrementalMerkleTree.UintIMT | self.                   |
| element_ | uint256                              | The new element to add. |

### setHashers

```solidity
function setHashers(
    IncrementalMerkleTree.UintIMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.



Parameters:

| Name   | Type                                              | Description                                   |
| :----- | :------------------------------------------------ | :-------------------------------------------- |
| tree   | struct IncrementalMerkleTree.UintIMT              | self.                                         |
| hash1_ | function (bytes32) view returns (bytes32)         | The hash function that accepts one argument.  |
| hash2_ | function (bytes32,bytes32) view returns (bytes32) | The hash function that accepts two arguments. |

### root

```solidity
function root(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (bytes32)
```

The function to return the root hash of the uint256 tree.
Complexity is O(log(n) + h), where n is the number of elements in the tree and
h is the height of the tree.



Parameters:

| Name | Type                                 | Description |
| :--- | :----------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.UintIMT | self.       |


Return values:

| Name | Type    | Description                       |
| :--- | :------ | :-------------------------------- |
| [0]  | bytes32 | The root hash of the Merkle tree. |

### verifyProof

```solidity
function verifyProof(
    IncrementalMerkleTree.UintIMT storage tree,
    bytes32[] memory siblings_,
    uint256 directionBits_,
    bytes32 leaf_
) internal view returns (bool)
```

The function to verify a proof of a leaf's existence in the uint256 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name           | Type                                 | Description                      |
| :------------- | :----------------------------------- | :------------------------------- |
| tree           | struct IncrementalMerkleTree.UintIMT | self.                            |
| siblings_      | bytes32[]                            | The siblings of the leaf.        |
| directionBits_ | uint256                              | The direction bits of the leaf.  |
| leaf_          | bytes32                              | The leaf.                        |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### height

```solidity
function height(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (uint256)
```

The function to return the height of the uint256 tree. Complexity is O(1).


Parameters:

| Name | Type                                 | Description |
| :--- | :----------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.UintIMT | self.       |


Return values:

| Name | Type    | Description                    |
| :--- | :------ | :----------------------------- |
| [0]  | uint256 | The height of the Merkle tree. |

### length

```solidity
function length(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (uint256)
```

The function to return the number of elements in the uint256 tree. Complexity is O(1).


Parameters:

| Name | Type                                 | Description |
| :--- | :----------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.UintIMT | self.       |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The number of elements in the Merkle tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (bool)
```

The function to check whether the custom hash functions are set.


Parameters:

| Name | Type                                 | Description |
| :--- | :----------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.UintIMT | self.       |


Return values:

| Name | Type | Description                                                 |
| :--- | :--- | :---------------------------------------------------------- |
| [0]  | bool | True if the custom hash functions are set, false otherwise. |

### setHeight

```solidity
function setHeight(
    IncrementalMerkleTree.Bytes32IMT storage tree,
    uint256 height_
) internal
```

The function to set the height of the bytes32 tree.
Complexity is O(1).



Parameters:

| Name    | Type                                    | Description                                                                |
| :------ | :-------------------------------------- | :------------------------------------------------------------------------- |
| tree    | struct IncrementalMerkleTree.Bytes32IMT | self.                                                                      |
| height_ | uint256                                 | The new height of the Merkle tree. Should be greater than the current one. |

### add

```solidity
function add(
    IncrementalMerkleTree.Bytes32IMT storage tree,
    bytes32 element_
) internal
```

The function to add a new element to the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.
### setHashers

```solidity
function setHashers(
    IncrementalMerkleTree.Bytes32IMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.



Parameters:

| Name   | Type                                              | Description                                   |
| :----- | :------------------------------------------------ | :-------------------------------------------- |
| tree   | struct IncrementalMerkleTree.Bytes32IMT           | self.                                         |
| hash1_ | function (bytes32) view returns (bytes32)         | The hash function that accepts one argument.  |
| hash2_ | function (bytes32,bytes32) view returns (bytes32) | The hash function that accepts two arguments. |

### root

```solidity
function root(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (bytes32)
```

The function to return the root hash of the bytes32 tree.
Complexity is O(log(n) + h), where n is the number of elements in the tree and
h is the height of the tree.
### verifyProof

```solidity
function verifyProof(
    IncrementalMerkleTree.Bytes32IMT storage tree,
    bytes32[] memory siblings_,
    uint256 directionBits_,
    bytes32 leaf_
) internal view returns (bool)
```

The function to verify a proof of a leaf's existence in the bytes32 tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name           | Type                                    | Description                      |
| :------------- | :-------------------------------------- | :------------------------------- |
| tree           | struct IncrementalMerkleTree.Bytes32IMT | self.                            |
| siblings_      | bytes32[]                               | The siblings of the leaf.        |
| directionBits_ | uint256                                 | The direction bits of the leaf.  |
| leaf_          | bytes32                                 | The leaf.                        |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### height

```solidity
function height(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (uint256)
```

The function to return the height of the bytes32 tree. Complexity is O(1).
### length

```solidity
function length(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (uint256)
```

The function to return the number of elements in the bytes32 tree. Complexity is O(1).
### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (bool)
```

The function to check whether the custom hash functions are set.


Parameters:

| Name | Type                                    | Description |
| :--- | :-------------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.Bytes32IMT | self.       |


Return values:

| Name | Type | Description                                                 |
| :--- | :--- | :---------------------------------------------------------- |
| [0]  | bool | True if the custom hash functions are set, false otherwise. |

### setHeight

```solidity
function setHeight(
    IncrementalMerkleTree.AddressIMT storage tree,
    uint256 height_
) internal
```

The function to set the height of the address tree.
Complexity is O(1).



Parameters:

| Name    | Type                                    | Description                                                                |
| :------ | :-------------------------------------- | :------------------------------------------------------------------------- |
| tree    | struct IncrementalMerkleTree.AddressIMT | self.                                                                      |
| height_ | uint256                                 | The new height of the Merkle tree. Should be greater than the current one. |

### add

```solidity
function add(
    IncrementalMerkleTree.AddressIMT storage tree,
    address element_
) internal
```

The function to add a new element to the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.
### setHashers

```solidity
function setHashers(
    IncrementalMerkleTree.AddressIMT storage tree,
    function(bytes32) view returns (bytes32) hash1_,
    function(bytes32, bytes32) view returns (bytes32) hash2_
) internal
```

The function to set a custom hash functions, that will be used to build the Merkle Tree.



Parameters:

| Name   | Type                                              | Description                                   |
| :----- | :------------------------------------------------ | :-------------------------------------------- |
| tree   | struct IncrementalMerkleTree.AddressIMT           | self.                                         |
| hash1_ | function (bytes32) view returns (bytes32)         | The hash function that accepts one argument.  |
| hash2_ | function (bytes32,bytes32) view returns (bytes32) | The hash function that accepts two arguments. |

### root

```solidity
function root(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (bytes32)
```

The function to return the root hash of the address tree.
Complexity is O(log(n) + h), where n is the number of elements in the tree and
h is the height of the tree.
### verifyProof

```solidity
function verifyProof(
    IncrementalMerkleTree.AddressIMT storage tree,
    bytes32[] memory siblings_,
    uint256 directionBits_,
    bytes32 leaf_
) internal view returns (bool)
```

The function to verify a proof of a leaf's existence in the address tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name           | Type                                    | Description                      |
| :------------- | :-------------------------------------- | :------------------------------- |
| tree           | struct IncrementalMerkleTree.AddressIMT | self.                            |
| siblings_      | bytes32[]                               | The siblings of the leaf.        |
| directionBits_ | uint256                                 | The direction bits of the leaf.  |
| leaf_          | bytes32                                 | The leaf.                        |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### height

```solidity
function height(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (uint256)
```

The function to return the height of the address tree. Complexity is O(1).
### length

```solidity
function length(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (uint256)
```

The function to return the number of elements in the address tree. Complexity is O(1).
### isCustomHasherSet

```solidity
function isCustomHasherSet(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (bool)
```

The function to check whether the custom hash functions are set.


Parameters:

| Name | Type                                    | Description |
| :--- | :-------------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.AddressIMT | self.       |


Return values:

| Name | Type | Description                                                 |
| :--- | :--- | :---------------------------------------------------------- |
| [0]  | bool | True if the custom hash functions are set, false otherwise. |
