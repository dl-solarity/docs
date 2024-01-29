# 🔁 Return Data Proxy

## Introduction

The Return Data Proxy library provides functions for calling other contracts and handling their return data efficiently.

## Implementation

The `ReturnDataProxy` library employs assembly to directly place data into `returndata`. This technique optimizes gas usage by reducing encoding and decoding overhead. It's crucial to ensure that calls to this library occur **at the end** of the function, as instructions following this call won't be executed.

## Functions

To use the `ReturnDataProxy` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/utils/ReturnDataProxy.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using ReturnDataProxy for address;
```

### yield

```solidity
function yield(address target_, bytes memory calldata_) internal;
```

```solidity
function yield(address target_, uint256 value_, bytes memory calldata_) internal;
```

#### Description

This function is used to `call` a function of `target_` with a `calldata_` and an option to transfer `value_`. Should be used as the last call of the function as it terminates the current context.

#### Time complexity

Constant.

#### Example

```solidity
struct Entry {
    bytes data;
    string name;
    uint256 value;
}

contract Target {
    Entry public entry;

    function getEntry() external returns (Entry memory) {
        ++entry.value;
 
        return entry;
    }
}

contract Proxy {
    function callGetEntry(
        address target_
    ) external returns (Entry memory) {
        target_.yield(abi.encodeWithSelector(Target.getEntry.selector));
        
        // Automatically substitutes return statement
        // Instructions here won't be executed
    }
}

Target target_ = new Target();
Proxy proxy_ = new Proxy();

// returns entry from target storage, possibly changes target state
proxy.delegateCallGetEntry(address(target));
```

### delegateYield

```solidity
function delegateYield(address target_, bytes memory calldata_) internal;
```

#### Description

This function is used to `delegatecall` a function of `target_` with a `calldata_`. Should be used as the last call of the function as it terminates the current context.

#### Time complexity

Constant.

#### Example

```solidity
struct Entry {
    bytes data;
    string name;
    uint256 value;
}

contract Target {
    Entry public entry;

    function getEntry() external returns (Entry memory) {
        ++entry.value;
 
        return entry;
    }
}

contract Proxy {
    function delegateCallGetEntry(
        address target_
    ) external returns (Entry memory) {
        target_.delegateYield(abi.encodeWithSelector(Target.getEntry.selector));
        
        // Automatically substitutes return statement
        // Instructions here won't be executed
    }
}

Target target_ = new Target();
Proxy proxy_ = new Proxy();

// returns entry from proxy storage, possibly changes proxy state
proxy.delegateCallGetEntry(address(target));
```

### staticYield

```solidity
function staticYield(address target_, bytes memory calldata_) internal view;
```

#### Description

This function is used to `staticcall` a function of `target_` with a `calldata_`. Should be used as the last call of the function as it terminates the current context.

#### Time complexity

Constant.

#### Example

```solidity
struct Entry {
    bytes data;
    string name;
    uint256 value;
}

contract Target {
    Entry public entry;
    
    function getEntry() external view returns (Entry memory) {
        return entry;
    }
}

contract Proxy {
    function delegateCallGetEntry(
        address target_
    ) external view returns (Entry memory) {
        target_.delegateYield(abi.encodeWithSelector(Target.getEntry.selector));
        
        // Automatically substitutes return statement
        // Instructions here won't be executed
    }
}

Target target_ = new Target();
Proxy proxy_ = new Proxy();

// returns entry from target memory, does not change target state
proxy.delegateCallGetEntry(address(target));
```
