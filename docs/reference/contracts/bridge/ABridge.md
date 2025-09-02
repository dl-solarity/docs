# ABridge

## Overview

#### License: MIT

```solidity
abstract contract ABridge is IBridge, Initializable, AERC20Handler, AERC721Handler, AERC1155Handler, ANativeHandler
```

The Bridge module

The Bridge contract facilitates the permissioned transfer of assets (ERC-20, ERC-721, ERC-1155, Native)
between two (or more) EVM blockchains.

To utilize the Bridge effectively, instances of this contract must be deployed on both base and destination chains,
accompanied by the setup of trusted back ends to act as signers.

The Bridge contract supports both "liquidity pool" and "mint-and-burn" methods for managing assets.
The back end signatures are checked only upon token withdrawals. If "mint-and-burn" method is used,
the ERC-20 tokens are required to support ERC-7802 interface.

The Bridge is also suitable for bridged USDC tokens, utilizing their interface
(https://github.com/circlefin/stablecoin-evm/blob/master/doc/bridged_USDC_standard.md).

IMPORTANT:
All signer addresses must differ in their first (most significant) 8 bits in order to pass bloom (uniqueness) filtering.
## Structs info

### ABridgeStorage

```solidity
struct ABridgeStorage {
	uint256 signaturesThreshold;
	mapping(bytes32 => bool) usedHashes;
	EnumerableSet.AddressSet signers;
}
```


## Functions info

### depositERC20 (0xfacd085f)

```solidity
function depositERC20(
    address token_,
    uint256 amount_,
    string calldata receiver_,
    string calldata network_,
    IBridge.ERC20BridgingType operationType_
) external virtual override
```

Deposits ERC20 tokens for bridging, emitting a `DepositedERC20` event.


Parameters:

| Name           | Type                           | Description                                                                                       |
| :------------- | :----------------------------- | :------------------------------------------------------------------------------------------------ |
| token_         | address                        | The address of the deposited token.                                                               |
| amount_        | uint256                        | The amount of deposited tokens.                                                                   |
| receiver_      | string                         | The receiver's address in the destination network, used as an informational field for the event.  |
| network_       | string                         | The name of the destination network, used as an informational field for the event.                |
| operationType_ | enum IBridge.ERC20BridgingType | The type of bridging operation being performed.                                                   |

### depositERC721 (0x86259187)

```solidity
function depositERC721(
    address token_,
    uint256 tokenId_,
    string calldata receiver_,
    string calldata network_,
    IBridge.ERC721BridgingType operationType_
) external virtual override
```

Deposits ERC721 tokens for bridging, emitting a `DepositedERC721` event.


Parameters:

| Name           | Type                            | Description                                                                                       |
| :------------- | :------------------------------ | :------------------------------------------------------------------------------------------------ |
| token_         | address                         | The address of the deposited token.                                                               |
| tokenId_       | uint256                         | The ID of the deposited token.                                                                    |
| receiver_      | string                          | The receiver's address in the destination network, used as an informational field for the event.  |
| network_       | string                          | The name of the destination network, used as an informational field for the event.                |
| operationType_ | enum IBridge.ERC721BridgingType | The type of bridging operation being performed.                                                   |

### depositERC1155 (0x125f8f88)

```solidity
function depositERC1155(
    address token_,
    uint256 tokenId_,
    uint256 amount_,
    string calldata receiver_,
    string calldata network_,
    IBridge.ERC1155BridgingType operationType_
) external virtual override
```

Deposits ERC1155 tokens for bridging, emitting a `DepositedERC1155` event.


Parameters:

| Name           | Type                             | Description                                                                                       |
| :------------- | :------------------------------- | :------------------------------------------------------------------------------------------------ |
| token_         | address                          | The address of the deposited tokens.                                                              |
| tokenId_       | uint256                          | The ID of the deposited tokens.                                                                   |
| amount_        | uint256                          | The amount of deposited tokens.                                                                   |
| receiver_      | string                           | The receiver's address in the destination network, used as an informational field for the event.  |
| network_       | string                           | The name of the destination network, used as an informational field for the event.                |
| operationType_ | enum IBridge.ERC1155BridgingType | The type of bridging operation being performed.                                                   |

### depositNative (0x8609d28c)

```solidity
function depositNative(
    string calldata receiver_,
    string calldata network_
) external payable virtual override
```

function for depositing native currency, emits event DepositedNative


Parameters:

| Name      | Type   | Description                                                               |
| :-------- | :----- | :------------------------------------------------------------------------ |
| receiver_ | string | the receiver address in destination network, information field for event  |
| network_  | string | the network name of destination network, information field for event      |

### withdrawERC20 (0x0481fd35)

```solidity
function withdrawERC20(
    address token_,
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    IBridge.ERC20BridgingType operationType_,
    bytes[] calldata signatures_
) external virtual override
```

Withdraws ERC20 tokens.


Parameters:

| Name           | Type                           | Description                                                           |
| :------------- | :----------------------------- | :-------------------------------------------------------------------- |
| token_         | address                        | The address of the token to withdraw.                                 |
| amount_        | uint256                        | The amount of tokens to withdraw.                                     |
| receiver_      | address                        | The address of the withdrawal recipient.                              |
| txHash_        | bytes32                        | The hash of the deposit transaction.                                  |
| txNonce_       | uint256                        | The nonce of the deposit transaction.                                 |
| operationType_ | enum IBridge.ERC20BridgingType | The type of bridging operation.                                       |
| signatures_    | bytes[]                        | An array of signatures, formed by signing a sign hash by each signer. |

### withdrawERC721 (0xd9efd273)

```solidity
function withdrawERC721(
    address token_,
    uint256 tokenId_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    string calldata tokenURI_,
    IBridge.ERC721BridgingType operationType_,
    bytes[] calldata signatures_
) external virtual override
```

Withdraws ERC721 tokens.


Parameters:

| Name           | Type                            | Description                                                           |
| :------------- | :------------------------------ | :-------------------------------------------------------------------- |
| token_         | address                         | The address of the token to withdraw.                                 |
| tokenId_       | uint256                         | The ID of the token to withdraw.                                      |
| receiver_      | address                         | The address of the withdrawal recipient.                              |
| txHash_        | bytes32                         | The hash of the deposit transaction.                                  |
| txNonce_       | uint256                         | The nonce of the deposit transaction.                                 |
| tokenURI_      | string                          | The string URI of the token metadata.                                 |
| operationType_ | enum IBridge.ERC721BridgingType | The type of bridging operation.                                       |
| signatures_    | bytes[]                         | An array of signatures, formed by signing a sign hash by each signer. |

### withdrawERC1155 (0xaeb6f88f)

```solidity
function withdrawERC1155(
    address token_,
    uint256 tokenId_,
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    string calldata tokenURI_,
    IBridge.ERC1155BridgingType operationType_,
    bytes[] calldata signatures_
) external virtual override
```

Withdraws ERC1155 tokens.


Parameters:

| Name           | Type                             | Description                                                           |
| :------------- | :------------------------------- | :-------------------------------------------------------------------- |
| token_         | address                          | The address of the token to withdraw.                                 |
| tokenId_       | uint256                          | The ID of the token to withdraw.                                      |
| amount_        | uint256                          | The amount of tokens to withdraw.                                     |
| receiver_      | address                          | The address of the withdrawal recipient.                              |
| txHash_        | bytes32                          | The hash of the deposit transaction.                                  |
| txNonce_       | uint256                          | The nonce of the deposit transaction.                                 |
| tokenURI_      | string                           | The string URI of the token metadata.                                 |
| operationType_ | enum IBridge.ERC1155BridgingType | The type of bridging operation.                                       |
| signatures_    | bytes[]                          | An array of signatures, formed by signing a sign hash by each signer. |

### withdrawNative (0x1c3d9c87)

```solidity
function withdrawNative(
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    bytes[] calldata signatures_
) external virtual override
```

Withdraws native currency.


Parameters:

| Name        | Type    | Description                                                           |
| :---------- | :------ | :-------------------------------------------------------------------- |
| amount_     | uint256 | The amount of native currency to withdraw.                            |
| receiver_   | address | The address of the withdrawal recipient.                              |
| txHash_     | bytes32 | The hash of the deposit transaction.                                  |
| txNonce_    | uint256 | The nonce of the deposit transaction.                                 |
| signatures_ | bytes[] | An array of signatures, formed by signing a sign hash by each signer. |

### getSigners (0x94cf795e)

```solidity
function getSigners() external view returns (address[] memory)
```

Returns the list of current bridge signers
### getSignaturesThreshold (0x4f2c65a5)

```solidity
function getSignaturesThreshold() external view returns (uint256)
```

Returns the number of signatures for the withdrawal to be accepted
### containsHash (0x0430285a)

```solidity
function containsHash(
    bytes32 txHash_,
    uint256 txNonce_
) external view returns (bool)
```

Checks if the deposit event exists in the contract