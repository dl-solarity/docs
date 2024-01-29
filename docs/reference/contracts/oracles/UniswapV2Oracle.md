# UniswapV2Oracle

## Overview

#### License: MIT

```solidity
abstract contract UniswapV2Oracle is Initializable
```

UniswapV2Oracle module

The contract for retrieving prices from Uniswap V2 pairs. Works by keeping track of pairs that were
added as paths and returns prices of tokens following the configured routes.

Arbitrary time window (time between oracle observations) may be configured and the Oracle will adjust automatically.

From time to time `updatePrices()` function has to be called in order to calculate correct TWAP.
## Structs info

### PairInfo

```solidity
struct PairInfo {
	uint256[] prices0Cumulative;
	uint256[] prices1Cumulative;
	uint256[] blockTimestamps;
	uint256 refs;
}
```


## State variables info

### uniswapV2Factory (0x59d0f713)

```solidity
contract IUniswapV2Factory uniswapV2Factory
```


### timeWindow (0xd2f343c7)

```solidity
uint256 timeWindow
```


## Functions info

### updatePrices (0x49dd1262)

```solidity
function updatePrices() public virtual
```

Updates the price data for all the registered Uniswap V2 pairs

May be called at any time. The time window automatically adjusts
### getPrice (0x449e815d)

```solidity
function getPrice(
    address tokenIn_,
    uint256 amount_
) public view returns (uint256, address)
```

The function to retrieve the price of a token following the configured route


Parameters:

| Name     | Type    | Description                     |
| :------- | :------ | :------------------------------ |
| tokenIn_ | address | The input token address         |
| amount_  | uint256 | The amount of the input token   |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | The price in the last token of the route   |
| [1]  | address | The output token address                   |

### getPath (0x4f973bac)

```solidity
function getPath(address tokenIn_) public view returns (address[] memory)
```

The function to get the route of the token


Parameters:

| Name     | Type    | Description                     |
| :------- | :------ | :------------------------------ |
| tokenIn_ | address | the token to get the route of   |


Return values:

| Name | Type      | Description                     |
| :--- | :-------- | :------------------------------ |
| [0]  | address[] | the route of the provided token |

### getPairs (0x767eb5ef)

```solidity
function getPairs() public view returns (address[] memory)
```

The function to get all the pairs the oracle tracks


Return values:

| Name | Type      | Description        |
| :--- | :-------- | :----------------- |
| [0]  | address[] | the array of pairs |

### getPairRounds (0x8a00948d)

```solidity
function getPairRounds(address pair_) public view returns (uint256)
```

The function to get the number of observations of a pair


Parameters:

| Name  | Type    | Description        |
| :---- | :------ | :----------------- |
| pair_ | address | the pair address   |


Return values:

| Name | Type    | Description                       |
| :--- | :------ | :-------------------------------- |
| [0]  | uint256 | the number of oracle observations |

### getPairInfo (0xb93a4c6e)

```solidity
function getPairInfo(
    address pair_,
    uint256 round_
) public view returns (uint256, uint256, uint256)
```

The function to get the exact observation of a pair


Parameters:

| Name   | Type    | Description             |
| :----- | :------ | :---------------------- |
| pair_  | address | the pair address        |
| round_ | uint256 | the observation index   |


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | uint256 | the prices0Cumulative of the observation   |
| [1]  | uint256 | the prices1Cumulative of the observation   |
| [2]  | uint256 | the timestamp of the observation           |
