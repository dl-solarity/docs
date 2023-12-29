# RawReturnMock

## Contract Description


License: MIT

## 

```solidity
contract RawReturnMock
```


## Functions info

### receive

```solidity
receive() external payable
```


### setMirror (0xf77e8653)

```solidity
function setMirror(uint256 mirror_) external
```


### getMirror (0xb1b3b3cd)

```solidity
function getMirror() external view returns (uint256)
```


### getBalance (0x12065fe0)

```solidity
function getBalance() external view returns (uint256)
```


### revertWithMessage (0x185c38a4)

```solidity
function revertWithMessage() external pure
```


### getEntry (0xdcd55f90)

```solidity
function getEntry() external pure returns (Entry memory)
```


### getEntryWithArgs (0xcac0d039)

```solidity
function getEntryWithArgs(
    bytes memory args_,
    string memory name_,
    uint256 value_
) external pure returns (Entry memory)
```

