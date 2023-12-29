# ReturnDataProxy

## Library Description


License: MIT

## 

```solidity
library ReturnDataProxy
```

This is a pure assembly library for "yielding" the returned data without doubling the
encoding and decoding when tunneling calls.
## Functions info

### yield

```solidity
function yield(
    address target_,
    uint256 value_,
    bytes memory calldata_
) internal
```

This function is used to call a function of another contract without storing the result.
It uses inline assembly for efficiency and low-level control over the EVM execution.
Should be used as the last call of the function as it terminates the current context.


Parameters:

| Name      | Type    | Description                                                            |
| :-------- | :------ | :--------------------------------------------------------------------- |
| target_   | address | The address of the contract to call.                                   |
| value_    | uint256 | amount of ether to be transferred.                                     |
| calldata_ | bytes   | The function signature and encoded arguments for the function to call. |

### yield

```solidity
function yield(address target_, bytes memory calldata_) internal
```

The same purpose as `yield` but without value transfer.
### delegateYield

```solidity
function delegateYield(address target_, bytes memory calldata_) internal
```

The same purpose as `yield` but uses `delegatecall` instead of `call`.
### staticYield

```solidity
function staticYield(address target_, bytes memory calldata_) internal view
```

The same purpose as `yield` but uses `staticcall` instead of `call`.