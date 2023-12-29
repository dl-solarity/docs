# OwnableCompoundRateKeeper

## Contract Description


License: MIT

## 

```solidity
contract OwnableCompoundRateKeeper is AbstractCompoundRateKeeper, OwnableUpgradeable
```

The Ownable preset of CompoundRateKeeper
## Functions info

### __OwnableCompoundRateKeeper_init (0x5c2e260b)

```solidity
function __OwnableCompoundRateKeeper_init(
    uint256 capitalizationRate_,
    uint64 capitalizationPeriod_
) public initializer
```


### setCapitalizationRate (0x9aad5c9a)

```solidity
function setCapitalizationRate(uint256 capitalizationRate_) external onlyOwner
```


### setCapitalizationPeriod (0xf70f48a9)

```solidity
function setCapitalizationPeriod(
    uint64 capitalizationPeriod_
) external onlyOwner
```

