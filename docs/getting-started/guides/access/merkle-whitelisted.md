# 📗 Merkle Whitelisted

## Introduction

The Merkle Whitelisted module is an abstract utility used in modules that require verifying if certain data, such as a user address, is present within the Merkle Tree using the [OpenZeppelin's Merkle Proof library](https://docs.openzeppelin.com/contracts/5.x/api/utils#MerkleProof) for proof verification.

> The tree and the proofs can be generated using [OpenZeppelin's JavaScript library](https://github.com/OpenZeppelin/merkle-tree). You will find a quick start guide in the README.

## Implementation

The Merkle tree enables efficient validation of huge whitelists due to its logarithmic complexity. Whitelist data or user addresses are stored in the leaves, **with only the tree root saved on-chain**. This approach is cost-effective for large lists but incurs overhead for off-chain Merkle Proof generation and membership verification.

The `AMerkleWhitelisted` is an abstract contract that implements whitelisting logic using the Merkle Tree data structure. To validate whitelist membership, the leaf (whitelist element) and the corresponding branch (proof) are passed to the validation function to check for matching roots, indicating whitelist membership.

## Example

Start by creating a utility contract that inherits the functionalities of `AMerkleWhitelisted`. The contract includes the `protectedFunctionUser` method that is restricted to whitelisted addresses. Alongside this, the contract has the `setMerkleRoot` method for setting and updating Merkle tree roots, access to which is also restricted by the `Ownable` contract.

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

import "@solarity/solidity-lib/access-control/AMerkleWhitelisted.sol";

contract MerkleProtectedContract is AMerkleWhitelisted, Ownable {
    constructor() Ownable(msg.sender) {}

    function setMerkleRoot(bytes32 merkleRoot_) external onlyOwner {
        _setMerkleRoot(merkleRoot_);
    }

    function protectedFunctionUser(
        bytes32[] calldata merkleProof_
    ) external onlyWhitelistedUser(msg.sender, merkleProof_) { /* ... */ }
}
```

Then deploy the created contract and set the Merkle tree root. The Merkle tree root is usually computed off-chain. To keep things simple, let's create a Merkle tree with just one leaf, which is `whitelistedUser_`.

```solidity
MerkleProtectedContract public merkleProtectedContract;

merkleProtectedContract = new MerkleProtectedContract();

address whitelistedUser_ = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

bytes32 merkleLeaf_ = keccak256(abi.encodePacked(whitelistedUser_));
bytes32 zeroHash_ = keccak256(abi.encodePacked(bytes32(0)));

bytes32 merkleRoot_ = keccak256(abi.encodePacked(merkleLeaf_, zeroHash_));

merkleProtectedContract.setMerkleRoot(merkleRoot_);
```

Now we can verify if the correct user is whitelisted and if only that user is allowed to call the protected method.

```solidity
import "@solarity/solidity-lib/libs/utils/TypeCaster.sol";

using TypeCaster for *;

bytes32[] memory merkleProof_ = zeroHash_.asSingletonArray();

address unknownUser_ = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

merkleProtectedContract.isWhitelistedUser(whitelistedUser_, merkleProof_); // true
merkleProtectedContract.isWhitelistedUser(unknownUser_, merkleProof_);     // false

// Reverts with "MerkleWhitelisted: not whitelisted" if called by the unknownUser_
merkleProtectedContract.protectedFunctionUser(merkleProof_);
```

## Production References

* [q-dev/q-gdk/base-modules](https://gitlab.com/q-dev/q-gdk/module-integration-demo) uses the Merkle Whitelisted module to implement the basic AirDrop functionality.
