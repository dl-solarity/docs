# ABridge

## Overview

#### License: MIT

```solidity
abstract contract ABridge is IBridge, Initializable
```

The Bridge module

The Bridge contract facilitates the permissioned transfer of assets and/or arbitrary messages
between two (or more) EVM blockchains.

To utilize the Bridge effectively, instances of this contract must be deployed on both base
and destination chains, accompanied by the setup of trusted back ends to act as signers.
The back end signatures are checked only upon redemption.

Each asset type is mapped to a handler (ERC-20, Native, Message) contract.
Handlers implement the specific dispatch/redeem logic.

During redeem, handlers may forward execution to the `IBatcher` contract for multi-step operations.
The bridge never executes batches directly and does this via a designated `batcher` contract
that can be overridden. Users are advised to construct tx batches in a way that
they are not front-runnable. E.g., USDT approve should be reset first.

IMPORTANT:
All signer addresses must differ in their first (most significant) 8 bits
in order to pass bloom (uniqueness) filtering.
## Structs info

### ABridgeStorage

```solidity
struct ABridgeStorage {
	string network;
	IBatcher batcher;
	EnumerableMap.UintToAddressMap handlers;
	EnumerableSet.AddressSet signers;
	uint256 signaturesThreshold;
	mapping(bytes32 => bool) usedNonce;
}
```


## Functions info

### dispatch (0x553fd9ba)

```solidity
function dispatch(
    uint256 assetType_,
    bytes calldata dispatchDetails_
) external payable virtual
```

A function to dispatch assets or messages to another chain.


Parameters:

| Name             | Type    | Description                                     |
| :--------------- | :------ | :---------------------------------------------- |
| assetType_       | uint256 | the asset type identifier linked to a handler.  |
| dispatchDetails_ | bytes   | encoded handler-specific dispatch data.         |

### redeem (0xcf3d88c1)

```solidity
function redeem(
    uint256 assetType_,
    bytes calldata redeemDetails_,
    bytes calldata proof_
) external virtual
```

A function to redeem an incoming cross-chain operation.

Requires enough valid signer approvals to pass threshold checks.


Parameters:

| Name           | Type    | Description                                             |
| :------------- | :------ | :------------------------------------------------------ |
| assetType_     | uint256 | the asset type identifier linked to a handler.          |
| redeemDetails_ | bytes   | encoded handler-specific redeem data.                   |
| proof_         | bytes   | a proof of signer approvals authorizing the redemption. |

### getHandlers (0x3801a828)

```solidity
function getHandlers()
    external
    view
    returns (uint256[] memory assetTypes_, address[] memory handlers_)
```

Returns the list of supported asset types and a list of their corresponding handlers
### getNetwork (0x07e4b7e9)

```solidity
function getNetwork() external view returns (string memory)
```

Returns the network name
### getBatcher (0xb63b5a2b)

```solidity
function getBatcher() external view returns (address)
```

Returns the address of the batcher used
### getSigners (0x94cf795e)

```solidity
function getSigners() external view returns (address[] memory)
```

Returns the list of current bridge signers
### getSignaturesThreshold (0x4f2c65a5)

```solidity
function getSignaturesThreshold() external view returns (uint256)
```

Returns the number of signatures for the redemption to be accepted
### nonceUsed (0x61a4422b)

```solidity
function nonceUsed(bytes32 nonce_) external view returns (bool)
```

Checks if the dispatch event exists in the contract
### assetTypeSupported (0xefe39fc8)

```solidity
function assetTypeSupported(uint256 assetType_) public view returns (bool)
```

Checks if the asset type is linked to the handler