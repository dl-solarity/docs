# ProxyBeacon

## Overview

#### License: MIT

```solidity
contract ProxyBeacon is IBeacon, APermanentOwnable
```

The proxies module

This is a lightweight utility ProxyBeacon contract that may be used as a beacon that BeaconProxies point to.
## Events info

### Upgraded

```solidity
event Upgraded(address implementation)
```


## Errors info

### NewImplementationNotAContract

```solidity
error NewImplementationNotAContract(address newImplementation)
```


## Functions info

### constructor

```solidity
constructor() APermanentOwnable(msg.sender)
```


### upgradeTo (0x3659cfe6)

```solidity
function upgradeTo(address newImplementation_) external virtual onlyOwner
```

The function to upgrade to implementation contract


Parameters:

| Name               | Type    | Description            |
| :----------------- | :------ | :--------------------- |
| newImplementation_ | address | the new implementation |

### implementation (0x5c60da1b)

```solidity
function implementation() public view virtual override returns (address)
```

The function to get the address of the implementation contract


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | address | the address of the implementation contract |
