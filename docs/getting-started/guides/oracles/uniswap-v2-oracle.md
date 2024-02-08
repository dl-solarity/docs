# 🧙🏻‍♀️ Uniswap V2 Oracle

## Introduction

The Uniswap V2 Oracle module serves as a dynamic tool for token price retrieval. It interfaces with Uniswap V2, a popular decentralized exchange, to access real-time price data of various tokens. This module stands out for its ability to compute Time-Weighted Average Prices (TWAP) across different token paths.

## Implementation

The `UniswapV2Oracle` contract uses TWAP for calculating token prices.

> Time-Weighted Average Price (TWAP) is an algorithm that averages prices over a specified time period, providing a more stable and manipulation-resistant price metric compared to instant spot prices.

This is achieved through the use of cumulative sums, which are maintained inside the contract for each token pair. The oracle maintains a history of cumulative price data and associated block timestamps for each pair. When calculating the TWAP, the oracle compares the current cumulative price with the cumulative price at the start of the predefined time window, dividing the difference by the length of the time window to obtain an average price that reflects recent market dynamics.

The `UniswapV2Oracle` contract allows users to define and manage token paths, which are essential for price calculation where direct pairings may not be available. For each **input token**, users can set **only one path**, which is a sequence of tokens that leads to the desired **output token**. These paths are crucial for the oracle to navigate through the various token pairs on Uniswap V2 to compute the required prices.

Due to Uniswap V2's design limitations, which does not support native historical price observation storage, the `UniswapV2Oracle` contract fulfills this role by necessitating manual updates to its price data. This is accomplished through the `updatePrices` function. Regular execution of this function ensures that the oracle's TWAP calculations are based on the most recent market dynamics, a crucial aspect for reliable price feeds.

## Example

Start by inheriting from the `UniswapV2Oracle` contract and protecting its management methods.

```solidity
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@solarity/solidity-lib/oracles/UniswapV2Oracle.sol";

contract UniswapV2OracleOwnable is UniswapV2Oracle, OwnableUpgradeable {
    function __UniswapV2OracleOwnable_init(
        address uniswapV2Factory_,
        uint256 timeWindow_
    ) external initializer {
        __Ownable_init();
        __OracleV2_init(uniswapV2Factory_, timeWindow_);
    }

    function setTimeWindow(uint256 newTimeWindow_) external onlyOwner {
        _setTimeWindow(newTimeWindow_);
    }

    function addPaths(address[][] memory paths_) external onlyOwner {
        _addPaths(paths_);
    }

    function removePaths(address[] memory tokenIns_) external onlyOwner {
        _removePaths(tokenIns_);
    }
}
```

Then deploy the oracle and initialize it by providing the `UniswapV2Factory` contract address and TWAP time window. If upgradeability is needed, deploy it under the proxy.

```solidity
UniswapV2OracleOwnable public oracle;

address public constant UNISWAP_V2_FACTORY = address(0x..);
uint256 public constant TIME_WINDOW = 2 hours;

oracle = new UniswapV2OracleOwnable();
oracle.__UniswapV2OracleOwnable_init(UNISWAP_V2_FACTORY, TIME_WINDOW);
```

The oracle owner can now adjust token paths and the time window. Keep in mind that for each input token only one path can be configured.

```solidity
import "@solarity/solidity-lib/libs/utils/TypeCaster.sol";

using TypeCaster for *;

address public constant BTC = address(0x..);
address public constant WETH = address(0x..);
address public constant SOL = address(0x..);

address[][] memory BTC_WETH_ = new address[][](1);
BTC_WETH_[0] = [BTC, WETH].asDynamic();

address[][] memory WETH_SOL_ = new address[][](1);
WETH_SOL_[0] = [WETH, SOL].asDynamic();

address[][] memory BTC_SOL_ = new address[][](1);
BTC_SOL_[0] = [BTC, SOL].asDynamic();

oracle.addPaths(BTC_WETH_);
oracle.addPaths(WETH_SOL_);

// Reverts with: "UniswapV2Oracle: path already registered"
oracle.addPaths(BTC_SOL_);

oracle.removePaths(BTC.asSingletonArray());

oracle.addPaths(BTC_SOL_); // OK

oracle.setTimeWindow(10 minutes);
```

Regularly use the `updatePrices` method to update price observation lists on all pairs.

```solidity
oracle.updatePrices();
```

To retrieve token prices, use the `getPrice` method. This example will return the price of `WETH` in terms of `SOL` as the `[WETH, SOL]` path has been configured for `WETH`.

```solidity
(uint256 price_, address tokenOut_) = oracle.getPrice(WETH, 1 ether);
```
