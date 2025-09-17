# Batcher

## Overview

#### License: MIT

```solidity
contract Batcher is IBatcher, ERC721Holder, ERC1155Holder, ReentrancyGuard
```

The Batcher module

IMPORTANT:
This contract is not meant to hold funds. Any remaining funds will eventually be swept after execution.
## Functions info

### execute (0x09c5eabe)

```solidity
function execute(bytes calldata batch_) external payable nonReentrant
```

A function to execute a batch of calls.

Reverts if any call fails.


Parameters:

| Name   | Type  | Description                                                           |
| :----- | :---- | :-------------------------------------------------------------------- |
| batch_ | bytes | encoded tuple of (address[] targets, uint256[] values, bytes[] data). |

### receive

```solidity
receive() external payable
```

