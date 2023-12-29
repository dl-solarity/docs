# PoolFactory

## Contract Description


License: MIT

## 

```solidity
contract PoolFactory is AbstractPoolFactory
```


## State variables info

### poolContractsRegistry (0xf08baef9)

```solidity
address poolContractsRegistry
```


## Functions info

### setDependencies (0x69130451)

```solidity
function setDependencies(
    address contractsRegistry_,
    bytes memory data_
) public override
```


### deployPool (0x14d52751)

```solidity
function deployPool() external
```


### deploy2Pool (0x29ccec5c)

```solidity
function deploy2Pool(string calldata salt_) external
```


### predictPoolAddress (0xc9fdb968)

```solidity
function predictPoolAddress(
    string calldata salt_
) external view returns (address)
```

