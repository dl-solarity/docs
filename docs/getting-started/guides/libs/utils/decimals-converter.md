# 🔢 Decimals Converter

## Introduction

The Decimals Converter library is designed to simplify the conversion of numbers that use token decimals from one precision to another.

Users are encouraged to use `from18Safe()` instead of `from18()` by default to avoid potentially _small amounts of exploits._

## Functions

To use the `DecimalsConverter` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/utils/DecimalsConverter.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using DecimalsConverter for *;
```

### decimals

```solidity
function decimals(address token_) internal view returns (uint8);
```

#### Description

This function returns the decimals of ERC20 `token_`. You may use this function for bytecode optimization.

#### Time complexity

Constant.

#### Example

```solidity
address token_ = address(0x...);

token_.decimals(); // 18
```

### to18

```solidity
function to18(uint256 amount_, address token_) internal view returns (uint256);
```

#### Description

This function brings the given `amount_` to 18 decimals of precision based on the `token_` decimals.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_16_ = address(0x...);
address token_20_ = address(0x...);
address token_21_ = address(0x...);

uint256 amount_ = 100;

amount_.to18(token_18_); // 100
amount_.to18(token_16_); // 10000
amount_.to18(token_20_); // 1
amount_.to18(token_21_); // 0
```

### to18

```solidity
function to18(
    uint256 amount_, 
    uint256 baseDecimals_
) internal pure returns (uint256);
```

#### Description

This function brings the given `amount_` to 18 decimals of `baseDecimals_`.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 100;

amount_.to18(18); // 100
amount_.to18(16); // 10000
amount_.to18(20); // 1
amount_.to18(21); // 0
```

### to18Safe

```solidity
function to18Safe(
    uint256 amount_, 
    address token_
) internal view returns (uint256);
```

#### Description

This function brings the given `amount_` to 18 decimals of precision based on the `token_`\`s decimals. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_16_ = address(0x...);
address token_20_ = address(0x...);
address token_21_ = address(0x...);

uint256 amount_ = 100;

amount_.to18(token_18_); // 100
amount_.to18(token_16_); // 10000
amount_.to18(token_20_); // 1
amount_.to18(token_21_); // Reverts with: "DecimalsConverter: conversion failed"
```

### to18Safe

```solidity
function to18Safe(
    uint256 amount_, 
    uint256 baseDecimals_
) internal pure returns (uint256);
```

#### Description

This function brings the given `amount_` to 18 decimals of `baseDecimals_`. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 100;

amount_.to18(18); // 100
amount_.to18(16); // 10000
amount_.to18(20); // 1
amount_.to18(21); // Reverts with: "DecimalsConverter: conversion failed"
```

### from18

```solidity
function from18(
    uint256 amount_, 
    address token_
) internal view returns (uint256);
```

#### Description

This function brings the given `amount_` from 18 decimals to the desired decimals of precision based on the `token_`'s decimals.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_16_ = address(0x...);
address token_20_ = address(0x...);
address token_15_ = address(0x...);

uint256 amount_ = 100;

amount_.from18(token_18_); // 100
amount_.from18(token_16_); // 1
amount_.from18(token_20_); // 10000
amount_.from18(token_15_); // 0
```

### from18

```solidity
function from18(
    uint256 amount_, 
    uint256 destDecimals_
) internal pure returns (uint256);
```

#### Description

This function brings the given `amount_` from 18 decimals to the desired decimals of `baseDecimals_`.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 100;

amount_.from18(18); // 100
amount_.from18(16); // 1
amount_.from18(20); // 10000
amount_.from18(15); // 0
```

### from18Safe

```solidity
function from18Safe(
    uint256 amount_, 
    address token_
) internal view returns (uint256);
```

#### Description

This function brings the given `amount_` from 18 decimals of precision based on the `token_`\`s decimals. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_16_ = address(0x...);
address token_20_ = address(0x...);
address token_15_ = address(0x...);

uint256 amount_ = 100;

amount_.from18Safe(token_18_); // 100
amount_.from18Safe(token_16_); // 1
amount_.from18Safe(token_20_); // 10000

// Reverts with: "DecimalsConverter: conversion failed"
amount_.from18Safe(token_15_);
```

### to18Safe

```solidity
function from18Safe(
    uint256 amount_, 
    uint256 destDecimals_
) internal pure returns (uint256);
```

#### Description

This function brings the given `amount_` from 18 decimals of `baseDecimals_`. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 100;

amount_.from18Safe(18); // 100
amount_.from18Safe(16); // 10000
amount_.from18Safe(20); // 1
amount_.from18Safe(21); // Reverts with: "DecimalsConverter: conversion failed"
```

### round18

```solidity
function round18(
    uint256 amount_, 
    address token_
) internal view returns (uint256);
```

#### Description

This function substitutes the trailing digits of an `amount_` with zeros, ensuring 18 precision decimals based on the `token_`'s decimals.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_17_ = address(0x...);
address token_16_ = address(0x...);
address token_15_ = address(0x...);
address token_20_ = address(0x...);

uint256 amount_ = 123;

amount_.round18(token_18_); // 123
amount_.round18(token_17_); // 120
amount_.round18(token_16_); // 100
amount_.round18(token_15_); // 0
amount_.round18(token_20_); // 123
```

### round18

```solidity
function round18(
    uint256 amount_, 
    uint256 decimals_
) internal pure returns (uint256);
```

#### Description

This function substitutes the trailing digits of an `amount_` with zeros, ensuring 18 precision decimals based on the `decimals_`.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 123;

amount_.round18(18); // 123
amount_.round18(17); // 120
amount_.round18(16); // 100
amount_.round18(15); // 0
amount_.round18(20); // 123
```

### round18Safe

```solidity
function round18Safe(
    uint256 amount_, 
    address token_
) internal view returns (uint256);
```

#### Description

This function substitutes the trailing digits of an `amount_` with zeros, ensuring 18 precision decimals based on the `token_`'s decimals. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_17_ = address(0x...);
address token_16_ = address(0x...);
address token_15_ = address(0x...);
address token_20_ = address(0x...);

uint256 amount_ = 123;

amount_.round18Safe(token_18_); // 123
amount_.round18Safe(token_17_); // 120
amount_.round18Safe(token_16_); // 100
amount_.round18Safe(token_20_); // 123

// Reverts with: "DecimalsConverter: conversion failed"
amount_.round18Safe(token_15_);
```

### round18Safe

```solidity
function round18Safe(
    uint256 amount_, 
    uint256 decimals_
) internal pure returns (uint256);
```

#### Description

This function substitutes the trailing digits of an `amount_` with zeros, ensuring 18 precision decimals based on the `decimals_`. It will revert if the output is zero.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 123;

amount_.round18Safe(18); // 123
amount_.round18Safe(17); // 120
amount_.round18Safe(16); // 100
amount_.round18Safe(20); // 123
amount_.round18Safe(15); // Reverts with: "DecimalsConverter: conversion failed"
```

### convert

```solidity
function convert(
    uint256 amount_,
    address baseToken_,
    address destToken_
) internal view returns (uint256);
```

#### Description

This function converts the `amount_` from the precision of the `baseToken_` to the precision of the `destToken_`.

#### Time complexity

Constant.

#### Example

```solidity
address token_18_ = address(0x...);
address token_16_ = address(0x...);
address token_20_ = address(0x...);

uint256 amount_ = 100;

amount_.convert(token_18_, token_18_); // 100
amount_.convert(token_18_, token_16_); // 1
amount_.convert(token_16_, token_18_); // 10000
amount_.convert(token_20_, token_16_); // 0
amount_.convert(token_16_, token_20_); // 1000000
```

### convert

```solidity
function convert(
    uint256 amount_,
    uint256 baseDecimals_,
    uint256 destDecimals_
) internal pure returns (uint256);
```

#### Description

This function converts the `amount_` from the `baseDecimals_` to the `destDecimals_`.

#### Time complexity

Constant.

#### Example

```solidity
uint256 amount_ = 100;

amount_.convert(18, 18); // 100
amount_.convert(18, 16); // 1
amount_.convert(16, 18); // 10000
amount_.convert(20, 16); // 0
amount_.convert(16, 20); // 1000000
```
