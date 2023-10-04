# IncrementalMerkleTree

## Library Description


License: MIT

## 

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
| count     | 106000       | 106000           |
| mean      | 36619 gas    | 71941 gas        |
| std       | 3617 gas     | 4324 gas         |
| min       | 34053 gas    | 28670 gas        |
| 25%       | 34077 gas    | 69715 gas        |
| 50%       | 36598 gas    | 72641 gas        |
| 75%       | 39143 gas    | 75557 gas        |
| max       | 94661 gas    | 75637 gas        |

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


### Bytes32IMT

```solidity
struct Bytes32IMT {
	IncrementalMerkleTree.IMT _tree;
}
```


### AddressIMT

```solidity
struct AddressIMT {
	IncrementalMerkleTree.IMT _tree;
}
```


### IMT

```solidity
struct IMT {
	bytes32[] branches;
	uint256 leavesCount;
}
```


## Functions info

### add

```solidity
function add(
    IncrementalMerkleTree.UintIMT storage tree,
    uint256 element_
) internal
```

The function to add a new element to the tree.
Complexity is O(log(n)), where n is the number of elements in the tree.



Parameters:

| Name     | Type                                 | Description             |
| :------- | :----------------------------------- | :---------------------- |
| tree     | struct IncrementalMerkleTree.UintIMT | self.                   |
| element_ | uint256                              | The new element to add. |

### root

```solidity
function root(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (bytes32)
```

The function to return the root hash of the tree.
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

### height

```solidity
function height(
    IncrementalMerkleTree.UintIMT storage tree
) internal view returns (uint256)
```

The function to return the height of the tree. Complexity is O(1).


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

The function to return the number of elements in the tree. Complexity is O(1).


Parameters:

| Name | Type                                 | Description |
| :--- | :----------------------------------- | :---------- |
| tree | struct IncrementalMerkleTree.UintIMT | self.       |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The number of elements in the Merkle tree. |

### add

```solidity
function add(
    IncrementalMerkleTree.Bytes32IMT storage tree,
    bytes32 element_
) internal
```


### root

```solidity
function root(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (bytes32)
```


### height

```solidity
function height(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (uint256)
```


### length

```solidity
function length(
    IncrementalMerkleTree.Bytes32IMT storage tree
) internal view returns (uint256)
```


### add

```solidity
function add(
    IncrementalMerkleTree.AddressIMT storage tree,
    address element_
) internal
```


### root

```solidity
function root(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (bytes32)
```


### height

```solidity
function height(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (uint256)
```


### length

```solidity
function length(
    IncrementalMerkleTree.AddressIMT storage tree
) internal view returns (uint256)
```

