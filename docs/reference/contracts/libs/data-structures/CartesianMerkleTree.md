# CartesianMerkleTree

## Overview

#### License: MIT

```solidity
library CartesianMerkleTree
```

Cartesian Merkle Tree Module

A magnificent ZK-friendly data structure based on a Binary Search Tree + Heap + Merkle Tree. Short names: CMT, Treaple.
Possesses deterministic and idempotent properties. Can be used as a substitute for a Sparse Merkle Tree (SMT).

Gas usage for adding and removing 1,000 elements to a CMT with the keccak256 and poseidon hash functions is detailed below:

Keccak256:
- CMT.add - 249k
- CMT.remove - 181k

Poseidon:
- CMT.add - 896k
- CMT.remove - 746k

## Usage Example:

```solidity
using CartesianMerkleTree for CartesianMerkleTree.UintCMT;

CartesianMerkleTree.UintCMT internal uintTreaple;
...
uintTreaple.initialize(80);

uintTreaple.add(100);

uintTreaple.getRoot();

CartesianMerkleTree.Proof memory proof = uintTreaple.getProof(100, 0);

uintTreaple.verifyProof(proof);

uintTreaple.getNodeByKey(100);

uintTreaple.remove(100);
```
## Structs info

### UintCMT

```solidity
struct UintCMT {
	CartesianMerkleTree.CMT _treaple;
}
```

UintCMT      *
### Bytes32CMT

```solidity
struct Bytes32CMT {
	CartesianMerkleTree.CMT _treaple;
}
```

Bytes32CMT     *
### AddressCMT

```solidity
struct AddressCMT {
	CartesianMerkleTree.CMT _treaple;
}
```

AddressCMT      *
### CMT

```solidity
struct CMT {
	mapping(uint64 => CartesianMerkleTree.Node) nodes;
	uint64 merkleRootId;
	uint64 nodesCount;
	uint64 deletedNodesCount;
	uint32 desiredProofSize;
	bool isCustomHasherSet;
	function (bytes32,bytes32,bytes32) view returns (bytes32) hash3;
}
```

Defines the structure of the Cartesian Merkle Tree.



Parameters:

| Name              | Type                                                      | Description                                                                                                |
| :---------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| nodes             | mapping(uint64 => struct CartesianMerkleTree.Node)        | A mapping of the treaple's nodes, where the key is the node's index, starting from 1 upon node addition.   |
| merkleRootId      | uint64                                                    | The index of the root node.                                                                                |
| nodesCount        | uint64                                                    | The total number of nodes within the Cartesian Merkle Tree.                                                |
| deletedNodesCount | uint64                                                    | The total number of the deleted nodes within the Cartesian Merkle Tree.                                    |
| desiredProofSize  | uint32                                                    | The desired proof size of the CMT proofs.                                                                  |
| isCustomHasherSet | bool                                                      | Indicates whether custom hash function has been configured (true) or not (false).                          |
| hash3             | function (bytes32,bytes32,bytes32) view returns (bytes32) | A hash function accepting three arguments.                                                                 |

### Node

```solidity
struct Node {
	uint64 childLeft;
	uint64 childRight;
	bytes16 priority;
	bytes32 merkleHash;
	bytes32 key;
}
```

Describes a node within the Cartesian Merkle tree, including its children, hash, priority and key.



Parameters:

| Name       | Type    | Description                                                                                                                                                                                           |
| :--------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| childLeft  | uint64  | The index of the left child node.                                                                                                                                                                     |
| childRight | uint64  | The index of the right child node.                                                                                                                                                                    |
| priority   | bytes16 | The priority of the node that counts as `keccak256(key)`                                                                                                                                              |
| merkleHash | bytes32 | The hash of the node, calculated as follows: - H(k \|| child1 || child2) where k is the current node key; child1 and child2 are merkleHash values of child nodes that were sorted in ascending order  |
| key        | bytes32 | The key associated with the node.                                                                                                                                                                     |

### Proof

```solidity
struct Proof {
	bytes32 root;
	bytes32[] siblings;
	uint256 siblingsLength;
	uint256 directionBits;
	bool existence;
	bytes32 key;
	bytes32 nonExistenceKey;
}
```

Represents the proof of a node's (non-)existence within the Cartesian Merkle tree.



Parameters:

| Name            | Type      | Description                                                                  |
| :-------------- | :-------- | :--------------------------------------------------------------------------- |
| root            | bytes32   | The root hash of the Cartesian Merkle tree.                                  |
| siblings        | bytes32[] | An array of sibling hashes can be used to get the Cartesian Merkle Root.     |
| siblingsLength  | uint256   | The number of siblings to be used for evidence.                              |
| directionBits   | uint256   | A path from the root to the node.                                            |
| existence       | bool      | Indicates the presence (true) or absence (false) of the node.                |
| key             | bytes32   | The key associated with the node.                                            |
| nonExistenceKey | bytes32   | The non-existence key of the auxiliary node in case when existence is false. |

## Errors info

### TreapleNotInitialized

```solidity
error TreapleNotInitialized()
```


### TreapleAlreadyInitialized

```solidity
error TreapleAlreadyInitialized()
```


### TreapleNotEmpty

```solidity
error TreapleNotEmpty()
```


### ZeroDesiredProofSize

```solidity
error ZeroDesiredProofSize()
```


### ProofSizeTooSmall

```solidity
error ProofSizeTooSmall(uint256 attemptedIndex, uint256 maxIndex)
```


### ZeroKeyProvided

```solidity
error ZeroKeyProvided()
```


### KeyAlreadyExists

```solidity
error KeyAlreadyExists()
```


### NodeDoesNotExist

```solidity
error NodeDoesNotExist()
```


## Modifiers info

### onlyInitialized

```solidity
modifier onlyInitialized(CartesianMerkleTree.CMT storage treaple)
```


## Functions info

### initialize

```solidity
function initialize(
    CartesianMerkleTree.UintCMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to initialize the Cartesian Merkle tree.
Under the hood it sets the desired proof size of the CMT proofs, therefore can be considered
alias function for the `setDesiredProofSize`.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                               | Description                               |
| :---------------- | :--------------------------------- | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.UintCMT | self.                                     |
| desiredProofSize_ | uint32                             | The desired proof size of the CMT proofs. |

### setHasher

```solidity
function setHasher(
    CartesianMerkleTree.UintCMT storage treaple,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash function, that will be used to build the Cartesian Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name    | Type                                                      | Description                                     |
| :------ | :-------------------------------------------------------- | :---------------------------------------------- |
| treaple | struct CartesianMerkleTree.UintCMT                        | self.                                           |
| hash3_  | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### setDesiredProofSize

```solidity
function setDesiredProofSize(
    CartesianMerkleTree.UintCMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to set a desired proof size, that will be used to build the Cartesian Merkle Tree proofs.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                               | Description                               |
| :---------------- | :--------------------------------- | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.UintCMT | self.                                     |
| desiredProofSize_ | uint32                             | The desired proof size of the CMT proofs. |

### add

```solidity
function add(
    CartesianMerkleTree.UintCMT storage treaple,
    uint256 key_
) internal
```

The function to add a new element to the uint256 treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                               | Description             |
| :------ | :--------------------------------- | :---------------------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.                   |
| key_    | uint256                            | The key of the element. |

### remove

```solidity
function remove(
    CartesianMerkleTree.UintCMT storage treaple,
    uint256 key_
) internal
```

The function to remove an element from the uint256 treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                               | Description             |
| :------ | :--------------------------------- | :---------------------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.                   |
| key_    | uint256                            | The key of the element. |

### getProof

```solidity
function getProof(
    CartesianMerkleTree.UintCMT storage treaple,
    uint256 key_,
    uint32 desiredProofSize_
) internal view returns (CartesianMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name              | Type                               | Description                                |
| :---------------- | :--------------------------------- | :----------------------------------------- |
| treaple           | struct CartesianMerkleTree.UintCMT | self.                                      |
| key_              | uint256                            | The key of the element.                    |
| desiredProofSize_ | uint32                             | The desired siblings length in the proof.  |


Return values:

| Name | Type                             | Description       |
| :--- | :------------------------------- | :---------------- |
| [0]  | struct CartesianMerkleTree.Proof | CMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    CartesianMerkleTree.UintCMT storage treaple,
    CartesianMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                               | Description            |
| :------ | :--------------------------------- | :--------------------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.                  |
| proof_  | struct CartesianMerkleTree.Proof   | The CMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### getRoot

```solidity
function getRoot(
    CartesianMerkleTree.UintCMT storage treaple
) internal view returns (bytes32)
```

The function to get the root of the Cartesian Merkle Tree.
Complexity is O(1).



Parameters:

| Name    | Type                               | Description |
| :------ | :--------------------------------- | :---------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.       |


Return values:

| Name | Type    | Description                            |
| :--- | :------ | :------------------------------------- |
| [0]  | bytes32 | The root of the Cartesian Merkle Tree. |

### getNode

```solidity
function getNode(
    CartesianMerkleTree.UintCMT storage treaple,
    uint256 nodeId_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                               | Description             |
| :------ | :--------------------------------- | :---------------------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.                   |
| nodeId_ | uint256                            | The index of the node.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    CartesianMerkleTree.UintCMT storage treaple,
    uint256 key_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                               | Description              |
| :------ | :--------------------------------- | :----------------------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.                    |
| key_    | uint256                            | The key of the element.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getDesiredProofSize

```solidity
function getDesiredProofSize(
    CartesianMerkleTree.UintCMT storage treaple
) internal view returns (uint256)
```

The function to get the desired proof size value.



Parameters:

| Name    | Type                               | Description |
| :------ | :--------------------------------- | :---------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.       |


Return values:

| Name | Type    | Description                   |
| :--- | :------ | :---------------------------- |
| [0]  | uint256 | The desired proof size value. |

### getNodesCount

```solidity
function getNodesCount(
    CartesianMerkleTree.UintCMT storage treaple
) internal view returns (uint64)
```

The function to get the number of nodes in the Cartesian Merkle Tree.



Parameters:

| Name    | Type                               | Description |
| :------ | :--------------------------------- | :---------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.       |


Return values:

| Name | Type   | Description                                       |
| :--- | :----- | :------------------------------------------------ |
| [0]  | uint64 | The number of nodes in the Cartesian Merkle Tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    CartesianMerkleTree.UintCMT storage treaple
) internal view returns (bool)
```

The function to check if custom hash function is set.



Parameters:

| Name    | Type                               | Description |
| :------ | :--------------------------------- | :---------- |
| treaple | struct CartesianMerkleTree.UintCMT | self.       |


Return values:

| Name | Type | Description                                           |
| :--- | :--- | :---------------------------------------------------- |
| [0]  | bool | True if custom hash function is set, otherwise false. |

### initialize

```solidity
function initialize(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to initialize the Cartesian Merkle tree.
Under the hood it sets the desired proof size of the CMT proofs, therefore can be considered
alias function for the `setDesiredProofSize`.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                                  | Description                               |
| :---------------- | :------------------------------------ | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.Bytes32CMT | self.                                     |
| desiredProofSize_ | uint32                                | The desired proof size of the CMT proofs. |

### setHasher

```solidity
function setHasher(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash function, that will be used to build the Cartesian Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name    | Type                                                      | Description                                     |
| :------ | :-------------------------------------------------------- | :---------------------------------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT                     | self.                                           |
| hash3_  | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### setDesiredProofSize

```solidity
function setDesiredProofSize(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to set a desired proof size, that will be used to build the Cartesian Merkle Tree proofs.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                                  | Description                               |
| :---------------- | :------------------------------------ | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.Bytes32CMT | self.                                     |
| desiredProofSize_ | uint32                                | The desired proof size of the CMT proofs. |

### add

```solidity
function add(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    bytes32 key_
) internal
```

The function to add a new element to the bytes32 treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.                   |
| key_    | bytes32                               | The key of the element. |

### remove

```solidity
function remove(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    bytes32 key_
) internal
```

The function to remove an element from the bytes32 treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.                   |
| key_    | bytes32                               | The key of the element. |

### getProof

```solidity
function getProof(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    bytes32 key_,
    uint32 desiredProofSize_
) internal view returns (CartesianMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name              | Type                                  | Description                                |
| :---------------- | :------------------------------------ | :----------------------------------------- |
| treaple           | struct CartesianMerkleTree.Bytes32CMT | self.                                      |
| key_              | bytes32                               | The key of the element.                    |
| desiredProofSize_ | uint32                                | The desired siblings length in the proof.  |


Return values:

| Name | Type                             | Description       |
| :--- | :------------------------------- | :---------------- |
| [0]  | struct CartesianMerkleTree.Proof | CMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    CartesianMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description            |
| :------ | :------------------------------------ | :--------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.                  |
| proof_  | struct CartesianMerkleTree.Proof      | The CMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### processProof

```solidity
function processProof(
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_,
    CartesianMerkleTree.Proof memory proof_
) internal view returns (bytes32)
```

The function to process the proof for inclusion or exclusion of a node in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name   | Type                                                      | Description                                      |
| :----- | :-------------------------------------------------------- | :----------------------------------------------- |
| hash3_ | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments.  |
| proof_ | struct CartesianMerkleTree.Proof                          | The CMT proof struct.                            |


Return values:

| Name | Type    | Description                              |
| :--- | :------ | :--------------------------------------- |
| [0]  | bytes32 | The calculated root hash from the proof. |

### getRoot

```solidity
function getRoot(
    CartesianMerkleTree.Bytes32CMT storage treaple
) internal view returns (bytes32)
```

The function to get the root of the Cartesian Merkle Tree.
Complexity is O(1).



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.       |


Return values:

| Name | Type    | Description                            |
| :--- | :------ | :------------------------------------- |
| [0]  | bytes32 | The root of the Cartesian Merkle Tree. |

### getNode

```solidity
function getNode(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    uint256 nodeId_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.                   |
| nodeId_ | uint256                               | The index of the node.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    CartesianMerkleTree.Bytes32CMT storage treaple,
    bytes32 key_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description              |
| :------ | :------------------------------------ | :----------------------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.                    |
| key_    | bytes32                               | The key of the element.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getDesiredProofSize

```solidity
function getDesiredProofSize(
    CartesianMerkleTree.Bytes32CMT storage treaple
) internal view returns (uint256)
```

The function to get the desired proof size value.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.       |


Return values:

| Name | Type    | Description                   |
| :--- | :------ | :---------------------------- |
| [0]  | uint256 | The desired proof size value. |

### getNodesCount

```solidity
function getNodesCount(
    CartesianMerkleTree.Bytes32CMT storage treaple
) internal view returns (uint64)
```

The function to get the number of nodes in the Cartesian Merkle Tree.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.       |


Return values:

| Name | Type   | Description                                       |
| :--- | :----- | :------------------------------------------------ |
| [0]  | uint64 | The number of nodes in the Cartesian Merkle Tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    CartesianMerkleTree.Bytes32CMT storage treaple
) internal view returns (bool)
```

The function to check if custom hash function is set.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.Bytes32CMT | self.       |


Return values:

| Name | Type | Description                                           |
| :--- | :--- | :---------------------------------------------------- |
| [0]  | bool | True if custom hash function is set, otherwise false. |

### initialize

```solidity
function initialize(
    CartesianMerkleTree.AddressCMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to initialize the Cartesian Merkle tree.
Under the hood it sets the desired proof size of the CMT proofs, therefore can be considered
alias function for the `setDesiredProofSize`.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                                  | Description                               |
| :---------------- | :------------------------------------ | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.AddressCMT | self.                                     |
| desiredProofSize_ | uint32                                | The desired proof size of the CMT proofs. |

### setHasher

```solidity
function setHasher(
    CartesianMerkleTree.AddressCMT storage treaple,
    function(bytes32, bytes32, bytes32) view returns (bytes32) hash3_
) internal
```

The function to set a custom hash function, that will be used to build the Cartesian Merkle Tree.

Requirements:
- The tree must be empty.



Parameters:

| Name    | Type                                                      | Description                                     |
| :------ | :-------------------------------------------------------- | :---------------------------------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT                     | self.                                           |
| hash3_  | function (bytes32,bytes32,bytes32) view returns (bytes32) | The hash function that accepts three arguments. |

### setDesiredProofSize

```solidity
function setDesiredProofSize(
    CartesianMerkleTree.AddressCMT storage treaple,
    uint32 desiredProofSize_
) internal
```

The function to set a desired proof size, that will be used to build the Cartesian Merkle Tree proofs.

Requirements:
- The desired proof size value must be greater than 0.



Parameters:

| Name              | Type                                  | Description                               |
| :---------------- | :------------------------------------ | :---------------------------------------- |
| treaple           | struct CartesianMerkleTree.AddressCMT | self.                                     |
| desiredProofSize_ | uint32                                | The desired proof size of the CMT proofs. |

### add

```solidity
function add(
    CartesianMerkleTree.AddressCMT storage treaple,
    address key_
) internal
```

The function to add a new element to the address treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.                   |
| key_    | address                               | The key of the element. |

### remove

```solidity
function remove(
    CartesianMerkleTree.AddressCMT storage treaple,
    address key_
) internal
```

The function to remove an element from the address treaple.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.                   |
| key_    | address                               | The key of the element. |

### getProof

```solidity
function getProof(
    CartesianMerkleTree.AddressCMT storage treaple,
    address key_,
    uint32 desiredProofSize_
) internal view returns (CartesianMerkleTree.Proof memory)
```

The function to get the proof if a node with specific key exists or not exists in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name              | Type                                  | Description                                |
| :---------------- | :------------------------------------ | :----------------------------------------- |
| treaple           | struct CartesianMerkleTree.AddressCMT | self.                                      |
| key_              | address                               | The key of the element.                    |
| desiredProofSize_ | uint32                                | The desired siblings length in the proof.  |


Return values:

| Name | Type                             | Description       |
| :--- | :------------------------------- | :---------------- |
| [0]  | struct CartesianMerkleTree.Proof | CMT proof struct. |

### verifyProof

```solidity
function verifyProof(
    CartesianMerkleTree.AddressCMT storage treaple,
    CartesianMerkleTree.Proof memory proof_
) internal view returns (bool)
```

The function to verify the proof for inclusion or exclusion of a node in the CMT.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description            |
| :------ | :------------------------------------ | :--------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.                  |
| proof_  | struct CartesianMerkleTree.Proof      | The CMT proof struct.  |


Return values:

| Name | Type | Description                                  |
| :--- | :--- | :------------------------------------------- |
| [0]  | bool | True if the proof is valid, false otherwise. |

### getRoot

```solidity
function getRoot(
    CartesianMerkleTree.AddressCMT storage treaple
) internal view returns (bytes32)
```

The function to get the root of the Cartesian Merkle Tree.
Complexity is O(1).



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.       |


Return values:

| Name | Type    | Description                            |
| :--- | :------ | :------------------------------------- |
| [0]  | bytes32 | The root of the Cartesian Merkle Tree. |

### getNode

```solidity
function getNode(
    CartesianMerkleTree.AddressCMT storage treaple,
    uint256 nodeId_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its index.
Complexity is O(1).



Parameters:

| Name    | Type                                  | Description             |
| :------ | :------------------------------------ | :---------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.                   |
| nodeId_ | uint256                               | The index of the node.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getNodeByKey

```solidity
function getNodeByKey(
    CartesianMerkleTree.AddressCMT storage treaple,
    address key_
) internal view returns (CartesianMerkleTree.Node memory)
```

The function to get the node by its key.
Complexity is O(log(n)), where n is the max depth of the treaple.



Parameters:

| Name    | Type                                  | Description              |
| :------ | :------------------------------------ | :----------------------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.                    |
| key_    | address                               | The key of the element.  |


Return values:

| Name | Type                            | Description |
| :--- | :------------------------------ | :---------- |
| [0]  | struct CartesianMerkleTree.Node | The node.   |

### getDesiredProofSize

```solidity
function getDesiredProofSize(
    CartesianMerkleTree.AddressCMT storage treaple
) internal view returns (uint256)
```

The function to get the desired proof size value.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.       |


Return values:

| Name | Type    | Description                   |
| :--- | :------ | :---------------------------- |
| [0]  | uint256 | The desired proof size value. |

### getNodesCount

```solidity
function getNodesCount(
    CartesianMerkleTree.AddressCMT storage treaple
) internal view returns (uint64)
```

The function to get the number of nodes in the Cartesian Merkle Tree.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.       |


Return values:

| Name | Type   | Description                                       |
| :--- | :----- | :------------------------------------------------ |
| [0]  | uint64 | The number of nodes in the Cartesian Merkle Tree. |

### isCustomHasherSet

```solidity
function isCustomHasherSet(
    CartesianMerkleTree.AddressCMT storage treaple
) internal view returns (bool)
```

The function to check if custom hash function is set.



Parameters:

| Name    | Type                                  | Description |
| :------ | :------------------------------------ | :---------- |
| treaple | struct CartesianMerkleTree.AddressCMT | self.       |


Return values:

| Name | Type | Description                                           |
| :--- | :--- | :---------------------------------------------------- |
| [0]  | bool | True if custom hash function is set, otherwise false. |
