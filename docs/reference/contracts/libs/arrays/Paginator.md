# Paginator

## Library Description


License: MIT

## 

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

Returns part of an array.

All functions below have the same description.

Examples:
- part([4, 5, 6, 7], 0, 4) will return [4, 5, 6, 7]
- part([4, 5, 6, 7], 2, 4) will return [6, 7]
- part([4, 5, 6, 7], 2, 1) will return [6]



Parameters:

| Name    | Type      | Description                            |
| :------ | :-------- | :------------------------------------- |
| arr     | uint256[] | Storage array.                         |
| offset_ | uint256   | Offset, index in an array.             |
| limit_  | uint256   | Number of elements after the `offset`. |

### part

```solidity
function part(
    address[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_)
```


### part

```solidity
function part(
    bytes32[] storage arr,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_)
```


### part

```solidity
function part(
    EnumerableSet.UintSet storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (uint256[] memory list_)
```


### part

```solidity
function part(
    EnumerableSet.AddressSet storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (address[] memory list_)
```


### part

```solidity
function part(
    EnumerableSet.Bytes32Set storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (bytes32[] memory list_)
```


### part

```solidity
function part(
    StringSet.Set storage set,
    uint256 offset_,
    uint256 limit_
) internal view returns (string[] memory list_)
```


### getTo

```solidity
function getTo(
    uint256 length_,
    uint256 offset_,
    uint256 limit_
) internal pure returns (uint256 to_)
```

