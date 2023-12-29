# ICompoundRateKeeper

## Interface Description


License: MIT

## 

```solidity
interface ICompoundRateKeeper
```

The Compound Rate Keeper module
## Events info

### CapitalizationPeriodChanged

```solidity
event CapitalizationPeriodChanged(uint256 newCapitalizationPeriod)
```


### CapitalizationRateChanged

```solidity
event CapitalizationRateChanged(uint256 newCapitalizationRate)
```


## Functions info

### emergencyUpdateCompoundRate (0x71faedef)

```solidity
function emergencyUpdateCompoundRate() external
```


### getCompoundRate (0xd0f37f4c)

```solidity
function getCompoundRate() external view returns (uint256)
```


### getFutureCompoundRate (0x7e7fc8eb)

```solidity
function getFutureCompoundRate(
    uint64 timestamp_
) external view returns (uint256)
```


### getCapitalizationRate (0x912119af)

```solidity
function getCapitalizationRate() external view returns (uint256)
```


### getCapitalizationPeriod (0x179680fe)

```solidity
function getCapitalizationPeriod() external view returns (uint64)
```


### getLastUpdate (0x4c89867f)

```solidity
function getLastUpdate() external view returns (uint64)
```


### getIsMaxRateReached (0x6e8c78fd)

```solidity
function getIsMaxRateReached() external view returns (bool)
```


### getCurrentRate (0xf7fb07b0)

```solidity
function getCurrentRate() external view returns (uint256)
```

