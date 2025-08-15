# TxParser

## Overview

#### License: MIT

```solidity
library TxParser
```

A library for parsing Bitcoin transactions.
Provides functions for parsing, formatting, and transaction ID calculation
## Structs info

### Transaction

```solidity
struct Transaction {
	TxParser.TransactionInput[] inputs;
	TxParser.TransactionOutput[] outputs;
	uint32 version;
	uint32 locktime;
	bool hasWitness;
}
```


### TransactionInput

```solidity
struct TransactionInput {
	bytes32 previousHash;
	uint32 previousIndex;
	uint32 sequence;
	bytes script;
	bytes[] witnesses;
}
```


### TransactionOutput

```solidity
struct TransactionOutput {
	uint64 value;
	bytes script;
}
```


## Errors info

### UnsupportedVersion

```solidity
error UnsupportedVersion(uint32 version)
```


### InvalidFlag

```solidity
error InvalidFlag(uint8 flag)
```


### BufferOverflow

```solidity
error BufferOverflow()
```


## Functions info

### calculateTxId

```solidity
function calculateTxId(bytes calldata data_) internal pure returns (bytes32)
```

Calculate transaction ID (hash without witness data)


Parameters:

| Name  | Type  | Description               |
| :---- | :---- | :------------------------ |
| data_ | bytes | The raw transaction data  |


Return values:

| Name | Type    | Description        |
| :--- | :------ | :----------------- |
| [0]  | bytes32 | The transaction ID |

### parseTransaction

```solidity
function parseTransaction(
    bytes calldata data_
) internal pure returns (TxParser.Transaction memory tx_, uint256 consumed_)
```

Parse a complete transaction from raw bytes


Parameters:

| Name  | Type  | Description               |
| :---- | :---- | :------------------------ |
| data_ | bytes | The raw transaction data  |


Return values:

| Name      | Type                        | Description              |
| :-------- | :-------------------------- | :----------------------- |
| tx_       | struct TxParser.Transaction | The parsed transaction   |
| consumed_ | uint256                     | Number of bytes consumed |

### formatTransaction

```solidity
function formatTransaction(
    TxParser.Transaction calldata tx_,
    bool withWitness_
) internal pure returns (bytes memory)
```

Format a transaction into raw bytes


Parameters:

| Name         | Type                        | Description                      |
| :----------- | :-------------------------- | :------------------------------- |
| tx_          | struct TxParser.Transaction | The transaction to format        |
| withWitness_ | bool                        | Whether to include witness data  |


Return values:

| Name | Type  | Description                     |
| :--- | :---- | :------------------------------ |
| [0]  | bytes | The formatted transaction bytes |

### isTransaction

```solidity
function isTransaction(bytes memory data_) internal pure returns (bool)
```

Checks whether bytes may be a valid Bitcoin transaction


Parameters:

| Name  | Type  | Description               |
| :---- | :---- | :------------------------ |
| data_ | bytes | The raw transaction data  |


Return values:

| Name | Type | Description                      |
| :--- | :--- | :------------------------------- |
| [0]  | bool | Whether the transaction is valid |

### parseCuint

```solidity
function parseCuint(
    bytes calldata data_
) internal pure returns (uint64 value_, uint8 consumed_)
```

Parse a compact unsigned integer (Bitcoin's variable length encoding)


Parameters:

| Name  | Type  | Description                                                             |
| :---- | :---- | :---------------------------------------------------------------------- |
| data_ | bytes | The byte calldata array containing the cuint in little-endian encoding  |


Return values:

| Name      | Type   | Description               |
| :-------- | :----- | :------------------------ |
| value_    | uint64 | The parsed integer value  |
| consumed_ | uint8  | Number of bytes consumed  |

### formatCuint

```solidity
function formatCuint(uint64 value_) internal pure returns (bytes memory)
```

Format an integer as a compact unsigned integer

Returns bytes in little-endian encoding


Parameters:

| Name   | Type   | Description            |
| :----- | :----- | :--------------------- |
| value_ | uint64 | The integer to encode  |


Return values:

| Name | Type  | Description       |
| :--- | :---- | :---------------- |
| [0]  | bytes | The encoded bytes |
