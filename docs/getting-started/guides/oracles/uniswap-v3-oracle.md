# 🧙🏼‍♂️ Uniswap V3 Oracle

## Introduction

The Uniswap V3 Oracle module serves as a dynamic tool for retrieving real-time price data from Uniswap V3 liquidity pools. This module leverages the sophisticated mechanisms of Uniswap V3 to calculate a Time-Weighted Average Price (TWAP).

## Implementation

The `UniswapV3Oracle` contract abstracts the complexities of interacting with Uniswap V3 pools to derive TWAP for token pairs.

> Time-Weighted Average Price (TWAP) is an algorithm that averages prices over a specified time period, providing a more stable and manipulation-resistant price metric compared to instant spot prices.

Unlike its predecessor, Uniswap V2, Uniswap V3 introduces a more advanced mechanism by storing a series of price observations within each liquidity pool. This feature allows the `UniswapV3Oracle` to calculate TWAPs by referencing this historical data.

The `UniswapV3Oracle` contract is centered around its only function, `getPriceOfTokenInToken`, which is designed to compute the price of one token in terms of another. This function operates by taking a specified path of token addresses and their corresponding pool fees. For each pair of tokens in the path, the function calculates the price of one token in terms of the next by referencing the corresponding `UniswapV3Pool` contracts. This process involves determining the applicable time period for each calculation, which is the minimum of the user-specified period or the oldest available observation in the pool.

## Example

Start by deploying the `UniswapV3Oracle`  contract, passing the `UniswapV3Factory` contract address to the constructor. Notice that the `UniswapV3Oracle` requires Solidity version less than 0.8.0.

```solidity
pragma solidity >=0.5.0 <0.8.0;

import "@solarity/solidity-lib/oracles/UniswapV3Oracle.sol";

UniswapV3Oracle public oracle;

address public constant UNISWAP_V3_FACTORY = address(0x..);

oracle = new UniswapV3Oracle(UNISWAP_V3_FACTORY);
```

Then you can request token prices by simply calling the `getPriceOfTokenInToken` method.

```solidity
address public constant WETH = address(0x03);
address public constant BTC = address(0x02);
address public constant SOL = address(0x04);

uint24 public constant MEDIUM_FEE = 3000;

address[] memory path_ = new address[](3);
path_[0] = WETH;
path_[1] = BTC;
path_[2] = SOL;

uint24[] memory fees_ = new uint24[](2);
fees_[0] = MEDIUM_FEE;
fees_[1] = MEDIUM_FEE;

(uint256 price_, uint256 period_) = oracle.getPriceOfTokenInToken(
    path_,
    fees_,
    1 ether,
    10 minutes
);
```
