# MerkleWhitelisted

## Overview

#### License: MIT

```solidity
abstract contract MerkleWhitelisted
```

The Whitelist Access Control module

This is a simple abstract contract that implements whitelisting logic.

The contract is based on a Merkle tree, which allows for the huge whitelists to be cheaply validated courtesy of
O(log(n)) tree complexity. The whitelist itself is stored in the tree leaves and only the root of the tree is saved on-chain.

To validate the whitelist belonging, the tree leaf (the whitelist element) has to be computed and passed to the
"root-construction" function together with the corresponding tree branches. The function will then check the
roots equality. If the roots match, the element belongs to the whitelist.

Note: the branch nodes are sorted numerically.
## Modifiers info

### onlyWhitelisted

```solidity
modifier onlyWhitelisted(bytes memory data_, bytes32[] calldata merkleProof_)
```


### onlyWhitelistedUser

```solidity
modifier onlyWhitelistedUser(address user_, bytes32[] calldata merkleProof_)
```


## Functions info

### isWhitelisted (0x7ea25896)

```solidity
function isWhitelisted(
    bytes32 leaf_,
    bytes32[] calldata merkleProof_
) public view returns (bool)
```

The function to check if the leaf belongs to the Merkle tree


Parameters:

| Name         | Type      | Description                                     |
| :----------- | :-------- | :---------------------------------------------- |
| leaf_        | bytes32   | the leaf to be checked                          |
| merkleProof_ | bytes32[] | the path from the leaf to the Merkle tree root  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | true if the leaf belongs to the Merkle tree, false otherwise |

### isWhitelistedUser (0xa188491c)

```solidity
function isWhitelistedUser(
    address user_,
    bytes32[] calldata merkleProof_
) public view returns (bool)
```

The function to check if the user belongs to the Merkle tree


Parameters:

| Name         | Type      | Description                                     |
| :----------- | :-------- | :---------------------------------------------- |
| user_        | address   | the user to be checked                          |
| merkleProof_ | bytes32[] | the path from the user to the Merkle tree root  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | true if the user belongs to the Merkle tree, false otherwise |

### getMerkleRoot (0x49590657)

```solidity
function getMerkleRoot() public view returns (bytes32)
```

The function to get the current Merkle root


Return values:

| Name | Type    | Description                                                  |
| :--- | :------ | :----------------------------------------------------------- |
| [0]  | bytes32 | the current Merkle root or zero bytes if it has not been set |
