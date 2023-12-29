# ProxyUpgrader

## Contract Description


License: MIT

## 

```solidity
contract ProxyUpgrader
```

The ContractsRegistry module

This is the helper contract that is used by an AbstractContractsRegistry as a proxy admin.
It is essential to distinguish between the admin and the registry due to the Transparent proxies nature
## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```


## Functions info

### constructor

```solidity
constructor()
```


### upgrade (0xa745e3df)

```solidity
function upgrade(
    address what_,
    address to_,
    bytes calldata data_
) external onlyOwner
```


### getImplementation (0x15ac72ca)

```solidity
function getImplementation(
    address what_
) external view onlyOwner returns (address)
```

