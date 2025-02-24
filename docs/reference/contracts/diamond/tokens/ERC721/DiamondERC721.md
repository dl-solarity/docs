# DiamondERC721

## Overview

#### License: MIT

```solidity
contract DiamondERC721 is ADiamondERC721Storage
```

The Diamond standard module

This is modified version of OpenZeppelin's ERC721 contract to be used as a Storage contract
by the Diamond Standard.
## Errors info

### ApproveToCaller

```solidity
error ApproveToCaller(address caller)
```


### ApprovalToCurrentOwner

```solidity
error ApprovalToCurrentOwner(address owner, uint256 tokenId)
```


### ConsecutiveTransfersNotSupported

```solidity
error ConsecutiveTransfersNotSupported()
```


### InvalidApprover

```solidity
error InvalidApprover(address approver, address owner)
```


### InvalidSpender

```solidity
error InvalidSpender(address spender, uint256 tokenId)
```


### NonERC721Receiver

```solidity
error NonERC721Receiver(address receiver)
```


### ReceiverIsZeroAddress

```solidity
error ReceiverIsZeroAddress()
```


### TokenAlreadyMinted

```solidity
error TokenAlreadyMinted(uint256 tokenId)
```


### UnauthorizedAccount

```solidity
error UnauthorizedAccount(address account)
```


## Functions info

### approve (0x095ea7b3)

```solidity
function approve(address to_, uint256 tokenId_) public virtual override
```

Gives permission to `to` to transfer `tokenId` token to another account.
The approval is cleared when the token is transferred.

Only a single account can be approved at a time, so approving the zero address clears previous approvals.

Requirements:

- The caller must own the token or be an approved operator.
- `tokenId` must exist.

Emits an {Approval} event.
### setApprovalForAll (0xa22cb465)

```solidity
function setApprovalForAll(
    address operator_,
    bool approved_
) public virtual override
```

Approve or remove `operator` as an operator for the caller.
Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.

Requirements:

- The `operator` cannot be the address zero.

Emits an {ApprovalForAll} event.
### transferFrom (0x23b872dd)

```solidity
function transferFrom(
    address from_,
    address to_,
    uint256 tokenId_
) public virtual override
```

Transfers `tokenId` token from `from` to `to`.

WARNING: Note that the caller is responsible to confirm that the recipient is capable of receiving ERC-721
or else they may be permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller must
understand this adds an external call which potentially creates a reentrancy vulnerability.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must be owned by `from`.
- If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.

Emits a {Transfer} event.
### safeTransferFrom (0x42842e0e)

```solidity
function safeTransferFrom(
    address from_,
    address to_,
    uint256 tokenId_
) public virtual override
```

Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
are aware of the ERC-721 protocol to prevent tokens from being forever locked.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If the caller is not `from`, it must have been allowed to move this token by either {approve} or
{setApprovalForAll}.
- If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon
a safe transfer.

Emits a {Transfer} event.
### safeTransferFrom (0xb88d4fde)

```solidity
function safeTransferFrom(
    address from_,
    address to_,
    uint256 tokenId_,
    bytes memory data_
) public virtual override
```

Safely transfers `tokenId` token from `from` to `to`.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
- If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon
a safe transfer.

Emits a {Transfer} event.