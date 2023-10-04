# PoolContractsRegistry

## Contract Description


License: MIT

## 

```solidity
contract PoolContractsRegistry is OwnablePoolContractsRegistry
```


## Constants info

### POOL_1_NAME (0x07dd5ed6)

```solidity
string constant POOL_1_NAME = "POOL_1"
```


### POOL_2_NAME (0x9253e3e5)

```solidity
string constant POOL_2_NAME = "POOL_2"
```


## Modifiers info

### onlyPoolFactory

```solidity
modifier onlyPoolFactory()
```


## Functions info

### mockInit (0x35242702)

```solidity
function mockInit() external
```


### setDependencies (0x69130451)

```solidity
function setDependencies(
    address contractsRegistry_,
    bytes memory data_
) public override
```


### addProxyPool (0x09ae152b)

```solidity
function addProxyPool(
    string calldata name_,
    address poolAddress_
) external onlyPoolFactory
```

