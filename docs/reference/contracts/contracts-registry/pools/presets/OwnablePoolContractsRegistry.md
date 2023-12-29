# OwnablePoolContractsRegistry

## Abstract Contract Description


License: MIT

## 

```solidity
abstract contract OwnablePoolContractsRegistry is AbstractPoolContractsRegistry, OwnableUpgradeable
```

The Ownable preset of PoolContractsRegistry
## Functions info

### __OwnablePoolContractsRegistry_init (0x3853b68a)

```solidity
function __OwnablePoolContractsRegistry_init() public initializer
```


### setNewImplementations (0x05c05408)

```solidity
function setNewImplementations(
    string[] calldata names_,
    address[] calldata newImplementations_
) external onlyOwner
```


### injectDependenciesToExistingPools (0x24d6780f)

```solidity
function injectDependenciesToExistingPools(
    string calldata name_,
    uint256 offset_,
    uint256 limit_
) external onlyOwner
```


### injectDependenciesToExistingPoolsWithData (0x52837c41)

```solidity
function injectDependenciesToExistingPoolsWithData(
    string calldata name_,
    bytes calldata data_,
    uint256 offset_,
    uint256 limit_
) external onlyOwner
```

