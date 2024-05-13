# MemoryUtils

## Overview

#### License: MIT

```solidity
library MemoryUtils
```

A library that provides utility functions for memory manipulation in Solidity.
## Functions info

### copy

```solidity
function copy(
    bytes memory source_
) internal view returns (bytes memory destination_)
```

Copies the contents of the source bytes to the destination bytes. strings can be casted
to bytes in order to use this function.



Parameters:

| Name    | Type  | Description                     |
| :------ | :---- | :------------------------------ |
| source_ | bytes | The source bytes to copy from.  |


Return values:

| Name         | Type  | Description                |
| :----------- | :---- | :------------------------- |
| destination_ | bytes | The newly allocated bytes. |

### copy

```solidity
function copy(
    bytes32[] memory source_
) internal view returns (bytes32[] memory destination_)
```

Copies the contents of the source bytes32 array to the destination bytes32 array.
uint256[], address[] array can be casted to bytes32[] via `TypeCaster` library.



Parameters:

| Name    | Type      | Description                             |
| :------ | :-------- | :-------------------------------------- |
| source_ | bytes32[] | The source bytes32 array to copy from.  |


Return values:

| Name         | Type      | Description                        |
| :----------- | :-------- | :--------------------------------- |
| destination_ | bytes32[] | The newly allocated bytes32 array. |

### unsafeCopy

```solidity
function unsafeCopy(
    uint256 sourcePointer_,
    uint256 destinationPointer_,
    uint256 size_
) internal view
```

Copies memory from one location to another efficiently via identity precompile.

This function does not account for free memory pointer and should be used with caution.

This signature of calling identity precompile is:
staticcall(gas(), address(0x04), argsOffset, argsSize, retOffset, retSize)

Parameters:

| Name                | Type    | Description                                                |
| :------------------ | :------ | :--------------------------------------------------------- |
| sourcePointer_      | uint256 | The offset in the memory from which to copy.               |
| destinationPointer_ | uint256 | The offset in the memory where the result will be copied.  |
| size_               | uint256 | The size of the memory to copy.                            |

### getPointer

```solidity
function getPointer(
    bytes memory data_
) internal pure returns (uint256 pointer_)
```

Returns the memory pointer to the given bytes starting position including the length.
### getPointer

```solidity
function getPointer(
    bytes32[] memory data_
) internal pure returns (uint256 pointer_)
```

Returns the memory pointer to the given bytes starting position including the length.
Cast uint256[] and address[] to bytes32[] via `TypeCaster` library.
### getDataPointer

```solidity
function getDataPointer(
    bytes memory data_
) internal pure returns (uint256 pointer_)
```

Returns the memory pointer to the given bytes data starting position skipping the length.
### getDataPointer

```solidity
function getDataPointer(
    bytes32[] memory data_
) internal pure returns (uint256 pointer_)
```

Returns the memory pointer to the given bytes data starting position skipping the length.
Cast uint256[] and address[] to bytes32[] via `TypeCaster` library.