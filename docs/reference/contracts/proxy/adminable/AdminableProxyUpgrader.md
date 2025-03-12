# AdminableProxyUpgrader

## Overview

#### License: MIT

```solidity
contract AdminableProxyUpgrader is Ownable
```

The proxies module

This is the lightweight helper contract that may be used as a AdminableProxy admin.
## Functions info

### constructor

```solidity
constructor(address initialOwner_) Ownable(initialOwner_)
```


### upgrade (0xa745e3df)

```solidity
function upgrade(
    address what_,
    address to_,
    bytes calldata data_
) external virtual onlyOwner
```

The function to upgrade the implementation contract

an attempt to upgrade a non-proxy contract will result in revert


Parameters:

| Name  | Type    | Description                                                    |
| :---- | :------ | :------------------------------------------------------------- |
| what_ | address | the proxy contract to upgrade                                  |
| to_   | address | the new implementation contract                                |
| data_ | bytes   | arbitrary data the proxy will be called with after the upgrade |

### getImplementation (0x15ac72ca)

```solidity
function getImplementation(address what_) public view virtual returns (address)
```

The function to get the address of the proxy implementation

an attempt to get implementation from a non-proxy contract will result in revert


Parameters:

| Name  | Type    | Description                    |
| :---- | :------ | :----------------------------- |
| what_ | address | the proxy contract to observe  |


Return values:

| Name | Type    | Description                |
| :--- | :------ | :------------------------- |
| [0]  | address | the implementation address |
