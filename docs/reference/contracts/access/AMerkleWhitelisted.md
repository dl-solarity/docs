# AMerkleWhitelisted

## Overview

#### License: MIT

```solidity
abstract contract AMerkleWhitelisted
```

The Whitelist Access Control module

This is a simple abstract contract that implements whitelisting logic.

The contract is based on a Merkle tree, which allows for the huge whitelists to be cheaply validated courtesy of
O(log(n)) tree complexity. The whitelist itself is stored in the tree leaves and only the root of the tree is saved on-chain.

To validate the whitelist belonging, the tree leaf (the whitelist element) has to be computed and passed to the
"root-construction" function together with the corresponding tree branches. The function will then check the
roots equality. If the roots match, the element belongs to the whitelist.

Note: the branch nodes are sorted numerically.
## Errors info

### LeafNotWhitelisted

```solidity
error LeafNotWhitelisted(bytes data)
```


### UserNotWhitelisted

```solidity
error UserNotWhitelisted(address user)
```


## Modifiers info

### onlyWhitelisted

```solidity
modifier onlyWhitelisted(bytes memory data_, bytes32[] memory merkleProof_)
```


### onlyWhitelistedUser

```solidity
modifier onlyWhitelistedUser(address user_, bytes32[] memory merkleProof_)
```


## Functions info

### getMerkleRoot (0x49590657)

```solidity
function getMerkleRoot() public view returns (bytes32)
```

The function to get the current Merkle root


Return values:

| Name | Type    | Description                                                  |
| :--- | :------ | :----------------------------------------------------------- |
| [0]  | bytes32 | the current Merkle root or zero bytes if it has not been set |
