# BlockHeader

## Overview

#### License: MIT

```solidity
library BlockHeader
```

A utility library for handling Bitcoin block headers.
Provides functions for parsing, hashing, and converting block header data
## Structs info

### HeaderData

```solidity
struct HeaderData {
	bytes32 prevBlockHash;
	bytes32 merkleRoot;
	uint32 version;
	uint32 time;
	uint32 nonce;
	bytes4 bits;
}
```

Represents the essential data contained within a Bitcoin block header


Parameters:

| Name          | Type    | Description                                       |
| :------------ | :------ | :------------------------------------------------ |
| prevBlockHash | bytes32 | The hash of the previous block                    |
| merkleRoot    | bytes32 | The Merkle root of the transactions in the block  |
| version       | uint32  | The block version number                          |
| time          | uint32  | The block's timestamp                             |
| nonce         | uint32  | The nonce used for mining                         |
| bits          | bytes4  | The encoded difficulty target for the block       |

## Errors info

### InvalidBlockHeaderDataLength

```solidity
error InvalidBlockHeaderDataLength()
```

Emitted when the provided block header data has an invalid length.
This error ensures that only correctly sized block headers are processed
## Constants info

### BLOCK_HEADER_DATA_LENGTH (0xdf9899fd)

```solidity
uint256 constant BLOCK_HEADER_DATA_LENGTH = 80
```

The standard length of a Bitcoin block header in bytes
## Functions info

### parseBlockHeader

```solidity
function parseBlockHeader(
    bytes calldata blockHeaderRaw_,
    bool returnInBEFormat_
)
    internal
    pure
    returns (BlockHeader.HeaderData memory headerData_, bytes32 blockHash_)
```

Parses a raw byte array into a structured `HeaderData` and calculates its hash.
It validates the length of the input and correctly decodes each field


Parameters:

| Name              | Type  | Description                                          |
| :---------------- | :---- | :--------------------------------------------------- |
| blockHeaderRaw_   | bytes | The raw bytes of the block header                    |
| returnInBEFormat_ | bool  | Whether to return the hashes in big-endian encoding  |


Return values:

| Name        | Type                          | Description                             |
| :---------- | :---------------------------- | :-------------------------------------- |
| headerData_ | struct BlockHeader.HeaderData | The parsed `HeaderData` structure       |
| blockHash_  | bytes32                       | The calculated hash of the block header |

### toRawBytes

```solidity
function toRawBytes(
    BlockHeader.HeaderData memory headerData_,
    bool inputInBEFormat_
) internal pure returns (bytes memory)
```

Converts a `HeaderData` structure back into its raw byte representation.
This function reconstructs the original byte sequence of the block header


Parameters:

| Name             | Type                          | Description                                                   |
| :--------------- | :---------------------------- | :------------------------------------------------------------ |
| headerData_      | struct BlockHeader.HeaderData | The `HeaderData` structure to convert                         |
| inputInBEFormat_ | bool                          | Whether headerData_ is expected to be in big-endian encoding  |


Return values:

| Name | Type  | Description                                     |
| :--- | :---- | :---------------------------------------------- |
| [0]  | bytes | The raw byte representation of the block header |
