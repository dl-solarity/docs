# ArrayHelperMock

## Contract Description


License: MIT

## 

```solidity
contract ArrayHelperMock
```


## Functions info

### setArray (0x08d71642)

```solidity
function setArray(uint256[] calldata arr_) external
```


### lowerBound (0x74380a78)

```solidity
function lowerBound(uint256 element_) external view returns (uint256)
```


### upperBound (0x233c1d6a)

```solidity
function upperBound(uint256 element_) external view returns (uint256)
```


### getRangeSum (0x25a80bd2)

```solidity
function getRangeSum(
    uint256 beginIndex_,
    uint256 endIndex_
) external view returns (uint256)
```


### countPrefixes (0x4be08c79)

```solidity
function countPrefixes(
    uint256[] memory arr_
) external pure returns (uint256[] memory)
```


### reverseUint (0xe86c8162)

```solidity
function reverseUint(
    uint256[] memory arr_
) external pure returns (uint256[] memory)
```


### reverseAddress (0xf69e0435)

```solidity
function reverseAddress(
    address[] memory arr_
) external pure returns (address[] memory)
```


### reverseString (0x50bb9b77)

```solidity
function reverseString(
    string[] memory arr_
) external pure returns (string[] memory)
```


### reverseBytes32 (0xa193bbaf)

```solidity
function reverseBytes32(
    bytes32[] memory arr_
) external pure returns (bytes32[] memory)
```


### insertUint (0xe54bf45f)

```solidity
function insertUint(
    uint256[] memory to_,
    uint256 index_,
    uint256[] memory what_
) external pure returns (uint256, uint256[] memory)
```


### insertAddress (0xf75c70f0)

```solidity
function insertAddress(
    address[] memory to_,
    uint256 index_,
    address[] memory what_
) external pure returns (uint256, address[] memory)
```


### insertString (0xb9bb0842)

```solidity
function insertString(
    string[] memory to_,
    uint256 index_,
    string[] memory what_
) external pure returns (uint256, string[] memory)
```


### insertBytes32 (0x7fbd0e71)

```solidity
function insertBytes32(
    bytes32[] memory to_,
    uint256 index_,
    bytes32[] memory what_
) external pure returns (uint256, bytes32[] memory)
```


### cropUint (0x7281e9f1)

```solidity
function cropUint(
    uint256[] memory arr_,
    uint256 newLength_
) external pure returns (uint256[] memory)
```


### cropAddress (0x768a21ad)

```solidity
function cropAddress(
    address[] memory arr_,
    uint256 newLength_
) external pure returns (address[] memory)
```


### cropBool (0x42a246d3)

```solidity
function cropBool(
    bool[] memory arr_,
    uint256 newLength_
) external pure returns (bool[] memory)
```


### cropString (0xaa4c85c6)

```solidity
function cropString(
    string[] memory arr_,
    uint256 newLength_
) external pure returns (string[] memory)
```


### cropBytes (0xb48f91bb)

```solidity
function cropBytes(
    bytes32[] memory arr_,
    uint256 newLength_
) external pure returns (bytes32[] memory)
```

