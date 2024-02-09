# AbstractCompoundRateKeeper

## Overview

#### License: MIT

```solidity
abstract contract AbstractCompoundRateKeeper is ICompoundRateKeeper, Initializable
```

The Compound Rate Keeper module

The purpose of this module is to calculate the compound interest rate via 2 parameters:
`capitalizationRate` and `capitalizationPeriod`. Where `capitalizationRate` is the compound percentage
and `capitalizationPeriod` is the number of elapsed seconds the `capitalizationRate` has to be applied to get the interest.

The CompoundRateKeeper can be used in lending protocols to calculate the interest and borrow rates. It can
also be used in regular staking contracts to get users' rewards accrual, where the APY is fixed.

The compound interest formula is the following:

newRate = curRate * (capitalizationRate\**(secondsPassed / capitalizationPeriod)), where curRate is initially 1

The compound rate is calculated with 10\**25 precision.
The maximal possible compound rate is (type(uint128).max * 10\**25)
## Functions info

### emergencyUpdateCompoundRate (0x71faedef)

```solidity
function emergencyUpdateCompoundRate() public override
```

The function to force-update the compound rate if the getter reverts, sets isMaxRateReached to true
### getCompoundRate (0xd0f37f4c)

```solidity
function getCompoundRate() public view override returns (uint256)
```

The function to get current compound rate


Return values:

| Name | Type    | Description           |
| :--- | :------ | :-------------------- |
| [0]  | uint256 | current compound rate |

### getFutureCompoundRate (0x7e7fc8eb)

```solidity
function getFutureCompoundRate(
    uint64 timestamp_
) public view override returns (uint256)
```

The function to get future compound rate (the timestamp_ may be equal to the lastUpdate)


Parameters:

| Name       | Type   | Description                              |
| :--------- | :----- | :--------------------------------------- |
| timestamp_ | uint64 | the timestamp to calculate the rate for  |


Return values:

| Name | Type    | Description                                  |
| :--- | :------ | :------------------------------------------- |
| [0]  | uint256 | the compound rate for the provided timestamp |

### getCapitalizationRate (0x912119af)

```solidity
function getCapitalizationRate()
    public
    view
    returns (uint256 capitalizationRate_)
```

The function to get the current capitalization rate


Return values:

| Name                | Type    | Description                     |
| :------------------ | :------ | :------------------------------ |
| capitalizationRate_ | uint256 | the current capitalization rate |

### getCapitalizationPeriod (0x179680fe)

```solidity
function getCapitalizationPeriod()
    public
    view
    returns (uint64 capitalizationPeriod_)
```

The function to get the current capitalization period


Return values:

| Name                  | Type   | Description                       |
| :-------------------- | :----- | :-------------------------------- |
| capitalizationPeriod_ | uint64 | the current capitalization period |

### getLastUpdate (0x4c89867f)

```solidity
function getLastUpdate() public view returns (uint64 lastUpdate_)
```

The function to get the timestamp of the last update


Return values:

| Name        | Type   | Description                      |
| :---------- | :----- | :------------------------------- |
| lastUpdate_ | uint64 | the timestamp of the last update |

### getIsMaxRateReached (0x6e8c78fd)

```solidity
function getIsMaxRateReached() public view returns (bool isMaxRateReached_)
```

The function to get the status of whether the max rate is reached


Return values:

| Name              | Type | Description                                       |
| :---------------- | :--- | :------------------------------------------------ |
| isMaxRateReached_ | bool | the boolean indicating if the max rate is reached |

### getCurrentRate (0xf7fb07b0)

```solidity
function getCurrentRate() public view returns (uint256 currentRate_)
```

The function to get the current rate


Return values:

| Name         | Type    | Description      |
| :----------- | :------ | :--------------- |
| currentRate_ | uint256 | the current rate |
