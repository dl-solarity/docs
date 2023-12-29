# ReturnDataProxyMock

## Contract Description


License: MIT

## 

```solidity
contract ReturnDataProxyMock
```


## Functions info

### constructor

```solidity
constructor(address target_)
```


### callWithValue (0xc3cefd36)

```solidity
function callWithValue() external payable
```


### callSetMirror (0x7a3c05ed)

```solidity
function callSetMirror(uint256 mirror_) external
```


### delegateCallSetMirror (0x55561155)

```solidity
function delegateCallSetMirror(uint256 mirror_) external
```


### callRevertWithMessage (0x63412a03)

```solidity
function callRevertWithMessage() external
```


### delegateCallRevertWithMessage (0x662e7d81)

```solidity
function delegateCallRevertWithMessage() external
```


### staticCallGetEntry (0xf92c0b87)

```solidity
function staticCallGetEntry() external view returns (Entry memory)
```


### staticCallRevertWithMessage (0xd171b9ee)

```solidity
function staticCallRevertWithMessage() external view
```


### staticCallWithArgs (0xfd9ac84e)

```solidity
function staticCallWithArgs(
    bytes memory args_,
    string memory name_,
    uint256 value_
) external view returns (Entry memory)
```


### getBack (0x7eae1626)

```solidity
function getBack() external view returns (uint256)
```

