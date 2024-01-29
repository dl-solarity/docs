# UniswapV3Oracle

## Overview

#### License: MIT

```solidity
contract UniswapV3Oracle
```

UniswapV3Oracle module

The contract for retrieving prices from Uniswap V3 pools.

Works by calculating the time-weighted average tick as difference between two tickCumulatives
divided by number of second between them. Where tickCumulatives are taken from the newest observation
and the nearest one to the required time frame.

Price is obtained as 1.0001 in power of the calculated tick.

In case required period of time is unreachable, tick is taken from oldest available observation.
## State variables info

### uniswapV3Factory (0x5b549182)

```solidity
contract IUniswapV3Factory immutable uniswapV3Factory
```


## Functions info

### constructor

```solidity
constructor(address uniswapV3Factory_)
```

contract is not an Initializable due to the difference in compiler versions in UniswapV3 and Openzeppelin.
### getPriceOfTokenInToken (0xaac6094b)

```solidity
function getPriceOfTokenInToken(
    address[] memory path_,
    uint24[] memory fees_,
    uint128 amount_,
    uint32 period_
) public view returns (uint128, uint32)
```

The function to retrieve the price of a token following the configured route

The function returns price in quote token decimals. If amount is zero, returns (0, 0)


Parameters:

| Name    | Type      | Description                                                                        |
| :------ | :-------- | :--------------------------------------------------------------------------------- |
| path_   | address[] | the path of token address, the last one is token in which price will be returned   |
| fees_   | uint24[]  | the array of fees for particular pools (10\**4 precision)                          |
| amount_ | uint128   | the amount of baseToken_                                                           |
| period_ | uint32    | the time period                                                                    |


Return values:

| Name | Type    | Description                                                                                                      |
| :--- | :------ | :--------------------------------------------------------------------------------------------------------------- |
| [0]  | uint128 | amount_ the price of start token in quote token                                                                  |
| [1]  | uint32  | minPeriod_ the oldest period for which there is an observation in case period_ time ago there was no observation |
