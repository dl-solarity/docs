# Paginator

## Overview

#### License: MIT

```solidity
library Paginator
```

Library for pagination.

Supports the following data types `uin256[]`, `address[]`, `bytes32[]`, `UintSet`,
`AddressSet`, `BytesSet`, `StringSet`.
## Functions info

### part

```solidity
function part(
    uint256[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (uint256[] memory list_)
```

Returns part of a uint256 array

Examples:
- part([4, 5, 6, 7], 0, 4) will return [4, 5, 6, 7]
- part([4, 5, 6, 7], 2, 4) will return [6, 7]
- part([4, 5, 6, 7], 2, 1) will return [6]



Parameters:

| Name    | Type      | Description                                |
| :------ | :-------- | :----------------------------------------- |
| arr     | uint256[] | the storage array                          |
| offset_ | uint256   | the starting index in the array            |
| limit_  | uint256   | the number of elements after the `offset_` |

### part

```solidity
function part(
    address[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_)
```

Returns part of an address array
### part

```solidity
function part(
    bytes32[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_)
```

Returns part of a bytes32 array
### part

```solidity
function part(
    EnumerableSet.UintSet storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (uint256[] memory list_)
```

Returns part of a uint256 set


Parameters:

| Name    | Type                         | Description                               |
| :------ | :--------------------------- | :---------------------------------------- |
| set     | struct EnumerableSet.UintSet | the storage set                           |
| offset_ | uint256                      | the starting index in the set             |
| limit_  | uint256                      | the number of elements after the `offset` |

### part

```solidity
function part(
    EnumerableSet.AddressSet storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_)
```

Returns part of an address set
### part

```solidity
function part(
    EnumerableSet.Bytes32Set storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_)
```

Returns part of a bytes32 set
### part

```solidity
function part(
    StringSet.Set storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (string[] memory list_)
```

Returns part of a string set
### getTo

```solidity
function getTo(
    uint256 length_,
    uint256 offset_,
    uint256 limit_
) internal pure returns (uint256 to_)
```

Returns the exclusive index of the element to iterate to


Parameters:

| Name    | Type    | Description              |
| :------ | :------ | :----------------------- |
| length_ | uint256 | the length of the array  |
| offset_ | uint256 | the starting index       |
| limit_  | uint256 | the number of elements   |
