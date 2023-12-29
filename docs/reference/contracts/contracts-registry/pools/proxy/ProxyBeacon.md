# ProxyBeacon

## Contract Description


License: MIT

## 

```solidity
contract ProxyBeacon is IBeacon
```

The PoolContractsRegistry module

This is a utility lightweighted ProxyBeacon contract this is used as a beacon that BeaconProxies point to.
## Events info

### Upgraded

```solidity
event Upgraded(address implementation)
```


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


### upgrade (0x0900f010)

```solidity
function upgrade(address newImplementation_) external onlyOwner
```


### implementation (0x5c60da1b)

```solidity
function implementation() external view override returns (address)
```

Must return an address that can be used as a delegate call target.

{BeaconProxy} will check that this address is a contract.