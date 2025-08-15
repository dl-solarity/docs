# TxMerkleProof

## Overview

#### License: MIT

```solidity
library TxMerkleProof
```

A library for verifying transaction inclusion in Bitcoin block.
Provides functions for processing and verifying Merkle tree proofs
## Errors info

### InvalidMerkleNode

```solidity
error InvalidMerkleNode()
```

Emitted when the concateneted hashes of the Merkle tree is a valid Bitcoin transaction.
This error ensures that insertion attack is not possible
## Functions info

### verify

```solidity
function verify(
    bytes32[] memory proof_,
    bytes32 root_,
    bytes32 leaf_,
    uint256 txIndex_
) internal pure returns (bool)
```

Returns true if `leaf_` can be proven to be part of a Merkle tree
defined by `root_`. Uses double SHA-256 hashing


Parameters:

| Name     | Type      | Description                                                                 |
| :------- | :-------- | :-------------------------------------------------------------------------- |
| proof_   | bytes32[] | The array of sibling hashes from the leaf to the root                       |
| root_    | bytes32   | Merkle root in little-endian format                                         |
| leaf_    | bytes32   | Element that need to be proven included in a tree                           |
| txIndex_ | uint256   | The transaction index in the block, indicating hashing order for each pair  |


Return values:

| Name | Type | Description                                   |
| :--- | :--- | :-------------------------------------------- |
| [0]  | bool | Whether the leaf is the part of a Merkle tree |

### processProof

```solidity
function processProof(
    bytes32[] memory proof_,
    bytes32 leaf_,
    uint256 txIndex_
) internal pure returns (bytes32)
```

Returns the rebuilt hash obtained by traversing the Merkle tree
from `leaf_` using `proof_`. A `proof_` is valid if and only if the rebuilt
hash matches the given tree root. The pre-images are hashed in the order
calculated by the `txIndex_` position. Uses double SHA-256 hashing


Parameters:

| Name     | Type      | Description                                                                 |
| :------- | :-------- | :-------------------------------------------------------------------------- |
| proof_   | bytes32[] | The array of sibling hashes from the leaf to the root                       |
| leaf_    | bytes32   | The leaf of the Merkle tree                                                 |
| txIndex_ | uint256   | The transaction index in the block, indicating hashing order for each pair  |


Return values:

| Name | Type    | Description              |
| :--- | :------ | :----------------------- |
| [0]  | bytes32 | The computed Merkle root |
