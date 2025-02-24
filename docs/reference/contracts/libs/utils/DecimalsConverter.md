# DecimalsConverter

## Overview

#### License: MIT

```solidity
library DecimalsConverter
```

This library is used to convert numbers that use token's N decimals to M decimals.
Comes extremely handy with standardizing the business logic that is intended to work with many different ERC20 tokens
that have different precision (decimals). One can perform calculations with 18 decimals only and resort to conversion
only when the payouts (or interactions) with the actual tokes have to be made.

The best usage scenario involves accepting and calculating values with 18 decimals throughout the project, despite the tokens decimals.

Also it is recommended to call `round18()` function on the first execution line in order to get rid of the
trailing numbers if the destination decimals are less than 18

IMPORTANT
Users are requested to use `from18Safe()` instead of `from18()` by default to avoid "small amount exploits".

## Usage example:

```
contract Taker {
    ERC20 public USDC;
    uint256 public paid;

    . . .

    function pay(uint256 amount) external {
        amount = amount.round18(address(USDC));

        paid += amount;
        USDC.transferFrom(msg.sender, address(this), amount.from18(address(USDC)));
    }
}
```
## Errors info

### ConversionFailed

```solidity
error ConversionFailed()
```


## Functions info

### decimals

```solidity
function decimals(address token_) internal view returns (uint8)
```

The function to get the decimals of ERC20 token. Needed for bytecode optimization


Parameters:

| Name   | Type    | Description      |
| :----- | :------ | :--------------- |
| token_ | address | the ERC20 token  |


Return values:

| Name | Type  | Description                    |
| :--- | :---- | :----------------------------- |
| [0]  | uint8 | the decimals of provided token |

### to18

```solidity
function to18(uint256 amount_, address token_) internal view returns (uint256)
```

The function to bring the number to 18 decimals of precision


Parameters:

| Name    | Type    | Description                                       |
| :------ | :------ | :------------------------------------------------ |
| amount_ | uint256 | the number to convert                             |
| token_  | address | the token, whose decimals will be precised to 18  |


Return values:

| Name | Type    | Description                                    |
| :--- | :------ | :--------------------------------------------- |
| [0]  | uint256 | the number brought to 18 decimals of precision |

### to18

```solidity
function to18(
    uint256 amount_,
    uint256 baseDecimals_
) internal pure returns (uint256)
```

The function to bring the number to 18 decimals of precision


Parameters:

| Name          | Type    | Description                          |
| :------------ | :------ | :----------------------------------- |
| amount_       | uint256 | the number to convert                |
| baseDecimals_ | uint256 | the current precision of the number  |


Return values:

| Name | Type    | Description                                    |
| :--- | :------ | :--------------------------------------------- |
| [0]  | uint256 | the number brought to 18 decimals of precision |

### to18Safe

```solidity
function to18Safe(
    uint256 amount_,
    address token_
) internal view returns (uint256)
```

The function to bring the number to 18 decimals of precision. Reverts if output is zero


Parameters:

| Name    | Type    | Description                                       |
| :------ | :------ | :------------------------------------------------ |
| amount_ | uint256 | the number to convert                             |
| token_  | address | the token, whose decimals will be precised to 18  |


Return values:

| Name | Type    | Description                                    |
| :--- | :------ | :--------------------------------------------- |
| [0]  | uint256 | the number brought to 18 decimals of precision |

### to18Safe

```solidity
function to18Safe(
    uint256 amount_,
    uint256 baseDecimals_
) internal pure returns (uint256)
```

The function to bring the number to 18 decimals of precision. Reverts if output is zero


Parameters:

| Name          | Type    | Description                          |
| :------------ | :------ | :----------------------------------- |
| amount_       | uint256 | the number to convert                |
| baseDecimals_ | uint256 | the current precision of the number  |


Return values:

| Name | Type    | Description                                    |
| :--- | :------ | :--------------------------------------------- |
| [0]  | uint256 | the number brought to 18 decimals of precision |

### from18

```solidity
function from18(
    uint256 amount_,
    address token_
) internal view returns (uint256)
```

The function to bring the number from 18 decimals to the desired decimals of precision


Parameters:

| Name    | Type    | Description                                                              |
| :------ | :------ | :----------------------------------------------------------------------- |
| amount_ | uint256 | the number to covert                                                     |
| token_  | address | the token, whose decimals will be used as desired decimals of precision  |


Return values:

| Name | Type    | Description                                                 |
| :--- | :------ | :---------------------------------------------------------- |
| [0]  | uint256 | the number brought from 18 to desired decimals of precision |

### from18

```solidity
function from18(
    uint256 amount_,
    uint256 destDecimals_
) internal pure returns (uint256)
```

The function to bring the number from 18 decimals to the desired decimals of precision


Parameters:

| Name          | Type    | Description                     |
| :------------ | :------ | :------------------------------ |
| amount_       | uint256 | the number to covert            |
| destDecimals_ | uint256 | the desired precision decimals  |


Return values:

| Name | Type    | Description                                                 |
| :--- | :------ | :---------------------------------------------------------- |
| [0]  | uint256 | the number brought from 18 to desired decimals of precision |

### from18Safe

```solidity
function from18Safe(
    uint256 amount_,
    address token_
) internal view returns (uint256)
```

The function to bring the number from 18 decimals to the desired decimals of precision.
Reverts if output is zero


Parameters:

| Name    | Type    | Description                                                              |
| :------ | :------ | :----------------------------------------------------------------------- |
| amount_ | uint256 | the number to covert                                                     |
| token_  | address | the token, whose decimals will be used as desired decimals of precision  |


Return values:

| Name | Type    | Description                                                 |
| :--- | :------ | :---------------------------------------------------------- |
| [0]  | uint256 | the number brought from 18 to desired decimals of precision |

### from18Safe

```solidity
function from18Safe(
    uint256 amount_,
    uint256 destDecimals_
) internal pure returns (uint256)
```

The function to bring the number from 18 decimals to the desired decimals of precision.
Reverts if output is zero


Parameters:

| Name          | Type    | Description                     |
| :------------ | :------ | :------------------------------ |
| amount_       | uint256 | the number to covert            |
| destDecimals_ | uint256 | the desired precision decimals  |


Return values:

| Name | Type    | Description                                                 |
| :--- | :------ | :---------------------------------------------------------- |
| [0]  | uint256 | the number brought from 18 to desired decimals of precision |

### round18

```solidity
function round18(
    uint256 amount_,
    address token_
) internal view returns (uint256)
```

The function to substitute the trailing digits of a number with zeros


Parameters:

| Name    | Type    | Description                                                              |
| :------ | :------ | :----------------------------------------------------------------------- |
| amount_ | uint256 | the number to round. Should be with 18 precision decimals                |
| token_  | address | the token, whose decimals will be used as desired decimals of precision  |


Return values:

| Name | Type    | Description                                          |
| :--- | :------ | :--------------------------------------------------- |
| [0]  | uint256 | the rounded number. Comes with 18 precision decimals |

### round18

```solidity
function round18(
    uint256 amount_,
    uint256 decimals_
) internal pure returns (uint256)
```

The function to substitute the trailing digits of a number with zeros


Parameters:

| Name      | Type    | Description                                                |
| :-------- | :------ | :--------------------------------------------------------- |
| amount_   | uint256 | the number to round. Should be with 18 precision decimals  |
| decimals_ | uint256 | the required number precision                              |


Return values:

| Name | Type    | Description                                          |
| :--- | :------ | :--------------------------------------------------- |
| [0]  | uint256 | the rounded number. Comes with 18 precision decimals |

### round18Safe

```solidity
function round18Safe(
    uint256 amount_,
    address token_
) internal view returns (uint256)
```

The function to substitute the trailing digits of a number with zeros. Reverts if output is zero


Parameters:

| Name    | Type    | Description                                                              |
| :------ | :------ | :----------------------------------------------------------------------- |
| amount_ | uint256 | the number to round. Should be with 18 precision decimals                |
| token_  | address | the token, whose decimals will be used as desired decimals of precision  |


Return values:

| Name | Type    | Description                                          |
| :--- | :------ | :--------------------------------------------------- |
| [0]  | uint256 | the rounded number. Comes with 18 precision decimals |

### round18Safe

```solidity
function round18Safe(
    uint256 amount_,
    uint256 decimals_
) internal pure returns (uint256)
```

The function to substitute the trailing digits of a number with zeros. Reverts if output is zero


Parameters:

| Name      | Type    | Description                                                |
| :-------- | :------ | :--------------------------------------------------------- |
| amount_   | uint256 | the number to round. Should be with 18 precision decimals  |
| decimals_ | uint256 | the required number precision                              |


Return values:

| Name | Type    | Description                                          |
| :--- | :------ | :--------------------------------------------------- |
| [0]  | uint256 | the rounded number. Comes with 18 precision decimals |

### convert

```solidity
function convert(
    uint256 amount_,
    address baseToken_,
    address destToken_
) internal view returns (uint256)
```

The function to do the token precision conversion


Parameters:

| Name       | Type    | Description            |
| :--------- | :------ | :--------------------- |
| amount_    | uint256 | the amount to convert  |
| baseToken_ | address | current token          |
| destToken_ | address | desired token          |


Return values:

| Name | Type    | Description          |
| :--- | :------ | :------------------- |
| [0]  | uint256 | the converted number |

### convert

```solidity
function convert(
    uint256 amount_,
    uint256 baseDecimals_,
    uint256 destDecimals_
) internal pure returns (uint256)
```

The function to do the precision conversion


Parameters:

| Name          | Type    | Description               |
| :------------ | :------ | :------------------------ |
| amount_       | uint256 | the amount to covert      |
| baseDecimals_ | uint256 | current number precision  |
| destDecimals_ | uint256 | desired number precision  |


Return values:

| Name | Type    | Description          |
| :--- | :------ | :------------------- |
| [0]  | uint256 | the converted number |
