# 📈 Compound Rate Keeper

## Introduction

The Compound Rate Keeper module is designed to be employed in lending protocols to compute interest and borrow rates, as well as in staking contracts to determine users' rewards accrual with a fixed Annual Percentage Yield (APY).

## Implementation

The `ACompoundRateKeeper` contract primary objective is to calculate compound interest rates based on two parameters: `capitalizationRate` and `capitalizationPeriod`. The compound interest formula is as follows:

<img src={require("/static/img/docs/compound-rate-keeper.png").default} alt=""/>

where:

* _compoundRate_ - the newly calculated compound rate
* _currentRate_ - rate at the current point (initially set to 1)
* _capitalizationRate_ - compound percentage rate
* _secondsPassed_ - seconds passed since the last update
* _capitalizationPeriod_ - period in seconds the _capitalizationRate_ has to be applied to calculate the interest

Note, that the _compoundRate_ is calculated with the **precision** of `10**25`. The **maximum** possible _compoundRate_ is `type(uint128).max * 10**25`.

The `ACompoundRateKeeper` contract defines the calculation of the compound rate and can serve as a base for implementing diverse lending or staking calculations. This contract includes the following public functions:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>emergencyUpdateCompoundRate</code></td>
      <td>Updates the compound rate. If overflows, sets <code>isMaxRateReached</code> to true</td>
    </tr>
    <tr>
      <td><code>getCompoundRate</code></td>
      <td>Returns current compound rate</td>
    </tr>
    <tr>
      <td><code>getFutureCompoundRate</code></td>
      <td>Returns future compound rate</td>
    </tr>
    <tr>
      <td><code>getCapitalizationRate</code></td>
      <td>Returns current capitalization rate</td>
    </tr>
    <tr>
      <td><code>getCapitalizationPeriod</code></td>
      <td>Returns current capitalization period</td>
    </tr>
    <tr>
      <td><code>getLastUpdate</code></td>
      <td>Returns timestamp of the last update</td>
    </tr>
    <tr>
      <td><code>getIsMaxRateReached</code></td>
      <td>Returns whether the max rate is reached</td>
    </tr>
    <tr>
      <td><code>getCurrentRate</code></td>
      <td>Returns current rate</td>
    </tr>
  </tbody>
</table>

Additionally, there are a couple of internal functions to update the capitalization rate or capitalization period:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>_setCapitalizationRate</code></td>
      <td>Sets the capitalization rate</td>
    </tr>
    <tr>
      <td><code>_setCapitalizationPeriod</code></td>
      <td>Sets the capitalization period</td>
    </tr>
  </tbody>
</table>

The core function containing the rate calculation logic is `getFutureCompoundRate`, which eventually returns the new rate.

## Example

To implement and interact with the compound rate keeper, create a contract that inherits from the `ACompoundRateKeeper` contract and initializes all necessary values.

```solidity
import "@solarity/solidity-lib/compound-rate-keeper/ACompoundRateKeeper.sol";

contract CompoundRateKeeper is ACompoundRateKeeper {
    constructor(uint256 capitalizationRate_, uint64 capitalizationPeriod_) {
        __CompoundRateKeeper_init(capitalizationRate_, capitalizationPeriod_);
    }
}
```

So now we can create an instance of our implementation and use in different contexts.

```solidity
uint256 public constant PRECISION = 10 ** 25;
uint64 public constant YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

CompoundRateKeeper public crk;

crk = new CompoundRateKeeper(
    112 * PRECISION / 100, // 1.12 * precision - capitalization rate
    YEAR_IN_SECONDS        // 1 year in seconds - capitalization period
);

crk.getCapitalizationRate(); // 11200000000000000000000000

crk.getCapitalizationPeriod(); // 31536000

crk.getCompoundRate(); // current compound rate - 10000000000000000000000000

crk.getFutureCompoundRate(block.timestamp + YEAR_IN_SECONDS); 
// rate after one year - 11200000000000000000000000
```
