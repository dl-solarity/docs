# OwnableCompoundRateKeeper

## Overview

#### License: MIT

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

The initialization function


Parameters:

| Name                  | Type    | Description                                        |
| :-------------------- | :------ | :------------------------------------------------- |
| capitalizationRate_   | uint256 | the compound interest rate with 10\**25 precision  |
| capitalizationPeriod_ | uint64  | the compounding period in seconds                  |

### setCapitalizationRate (0x9aad5c9a)

```solidity
function setCapitalizationRate(uint256 capitalizationRate_) external onlyOwner
```

The function to set the compound interest rate


Parameters:

| Name                | Type    | Description                |
| :------------------ | :------ | :------------------------- |
| capitalizationRate_ | uint256 | new compound interest rate |

### setCapitalizationPeriod (0xf70f48a9)

```solidity
function setCapitalizationPeriod(
    uint64 capitalizationPeriod_
) external onlyOwner
```

The function to set the compounding period


Parameters:

| Name                  | Type   | Description                       |
| :-------------------- | :----- | :-------------------------------- |
| capitalizationPeriod_ | uint64 | new compounding period in seconds |
