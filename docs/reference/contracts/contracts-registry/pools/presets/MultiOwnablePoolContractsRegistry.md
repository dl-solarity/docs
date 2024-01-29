# MultiOwnablePoolContractsRegistry

## Overview

#### License: MIT

```solidity
abstract contract MultiOwnablePoolContractsRegistry is AbstractPoolContractsRegistry, MultiOwnable
```

The MultiOwnable preset of PoolContractsRegistry
## Functions info

### __MultiOwnablePoolContractsRegistry_init (0xa148c7ff)

```solidity
function __MultiOwnablePoolContractsRegistry_init() public initializer
```

The initialization function
### setNewImplementations (0x05c05408)

```solidity
function setNewImplementations(
    string[] calldata names_,
    address[] calldata newImplementations_
) external onlyOwner
```

The function to set new implementation for the registered pools


Parameters:

| Name                | Type      | Description                                       |
| :------------------ | :-------- | :------------------------------------------------ |
| names_              | string[]  | the names of registered ProxyBeacons to upgrade   |
| newImplementations_ | address[] | the addresses of new implementations to be used   |

### injectDependenciesToExistingPools (0x24d6780f)

```solidity
function injectDependenciesToExistingPools(
    string calldata name_,
    uint256 offset_,
    uint256 limit_
) external onlyOwner
```

The function to inject dependencies to registered pools (via EIP-6224)


Parameters:

| Name    | Type    | Description                                     |
| :------ | :------ | :---------------------------------------------- |
| name_   | string  | the name of ProxyBeacon to identify the pools   |
| offset_ | uint256 | the start index of the pools array              |
| limit_  | uint256 | the number of pools to inject dependencies to   |

### injectDependenciesToExistingPoolsWithData (0x52837c41)

```solidity
function injectDependenciesToExistingPoolsWithData(
    string calldata name_,
    bytes calldata data_,
    uint256 offset_,
    uint256 limit_
) external onlyOwner
```

The function to inject dependencies to registered pools with data (via EIP-6224)


Parameters:

| Name    | Type    | Description                                             |
| :------ | :------ | :------------------------------------------------------ |
| data_   | bytes   | the data to be passed to `setDependencies()` function   |
| name_   | string  | the name of ProxyBeacon to identify the pools           |
| offset_ | uint256 | the start index of the pools array                      |
| limit_  | uint256 | the number of pools to inject dependencies to           |
