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
    string memory source_
) internal view returns (string memory destination_)
```

Copies the contents of the source string to the destination string.



Parameters:

| Name    | Type   | Description                      |
| :------ | :----- | :------------------------------- |
| source_ | string | The source string to copy from.  |


Return values:

| Name         | Type   | Description                 |
| :----------- | :----- | :-------------------------- |
| destination_ | string | The newly allocated string. |

### copy

```solidity
function copy(
    bytes memory source_
) internal view returns (bytes memory destination_)
```

Copies the contents of the source bytes to the destination bytes.



Parameters:

| Name    | Type  | Description                     |
| :------ | :---- | :------------------------------ |
| source_ | bytes | The source bytes to copy from.  |


Return values:

| Name         | Type  | Description                |
| :----------- | :---- | :------------------------- |
| destination_ | bytes | The newly allocated bytes. |

### unsafeMemoryCopy

```solidity
function unsafeMemoryCopy(
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
function getPointer(bytes memory data) internal pure returns (uint256 pointer)
```

Returns the memory pointer of the given bytes data.
### getPointer

```solidity
function getPointer(string memory data) internal pure returns (uint256 pointer)
```

Returns the memory pointer of the given string data.