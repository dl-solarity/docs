# APoolContractsRegistry

## Overview

#### License: MIT

```solidity
abstract contract APoolContractsRegistry is Initializable, ADependant
```

The PoolContractsRegistry module

This contract can be used as a pool registry that keeps track of deployed pools by the system.
One can integrate factories to deploy and register pools or add them manually otherwise.

The registry uses BeaconProxy pattern to provide upgradeability and EIP-6224 pattern to provide dependency
injection mechanism into the pools.

The PoolContractsRegistry contract operates by managing ProxyBeacons that point to pools' implementations.
The factory contract would deploy BeaconProxies that point to these ProxyBeacons, allowing simple and cheap
upgradeability mechanics.
## Errors info

### NoMappingExists

```solidity
error NoMappingExists(string poolName)
```


### NoPoolsToInject

```solidity
error NoPoolsToInject(string poolName)
```


### ProxyDoesNotExist

```solidity
error ProxyDoesNotExist(string poolName)
```


## Functions info

### setDependencies (0x69130451)

```solidity
function setDependencies(
    address contractsRegistry_,
    bytes memory
) public virtual override dependant
```

The function that accepts dependencies from the ContractsRegistry, can be overridden


Parameters:

| Name               | Type    | Description             |
| :----------------- | :------ | :---------------------- |
| contractsRegistry_ | address | the dependency registry |

### addProxyPool (0x09ae152b)

```solidity
function addProxyPool(string memory name_, address poolAddress_) public virtual
```

The function to add new pools into the registry. Gets called from APoolFactory

Proper only factory access control must be added in descending contracts + `_addProxyPool()` should be called inside.



Parameters:

| Name         | Type    | Description                   |
| :----------- | :------ | :---------------------------- |
| name_        | string  | the pool's associated name    |
| poolAddress_ | address | the proxy address of the pool |

### getImplementation (0x6b683896)

```solidity
function getImplementation(string memory name_) public view returns (address)
```

The function to get implementation of the specific pools


Parameters:

| Name  | Type   | Description            |
| :---- | :----- | :--------------------- |
| name_ | string | the name of the pools  |


Return values:

| Name | Type    | Description                                      |
| :--- | :------ | :----------------------------------------------- |
| [0]  | address | address_ the implementation these pools point to |

### getProxyBeacon (0xc21182e7)

```solidity
function getProxyBeacon(string memory name_) public view returns (address)
```

The function to get the BeaconProxy of the specific pools (mostly needed in the factories)


Parameters:

| Name  | Type   | Description            |
| :---- | :----- | :--------------------- |
| name_ | string | the name of the pools  |


Return values:

| Name | Type    | Description                     |
| :--- | :------ | :------------------------------ |
| [0]  | address | address the BeaconProxy address |

### isPool (0x8f0f764e)

```solidity
function isPool(string memory name_, address pool_) public view returns (bool)
```

The function to check if the address is a pool


Parameters:

| Name  | Type    | Description                |
| :---- | :------ | :------------------------- |
| name_ | string  | the associated pools name  |
| pool_ | address | the address to check       |


Return values:

| Name | Type | Description                            |
| :--- | :--- | :------------------------------------- |
| [0]  | bool | true if pool_ is whithing the registry |

### countPools (0x33c21917)

```solidity
function countPools(string memory name_) public view returns (uint256)
```

The function to count pools by specified name


Parameters:

| Name  | Type   | Description                |
| :---- | :----- | :------------------------- |
| name_ | string | the associated pools name  |


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | uint256 | the number of pools with this name |

### listPools (0x71dd21c6)

```solidity
function listPools(
    string memory name_,
    uint256 offset_,
    uint256 limit_
) public view returns (address[] memory pools_)
```

The paginated function to list pools by their name (call `countPools()` to account for pagination)


Parameters:

| Name    | Type    | Description                            |
| :------ | :------ | :------------------------------------- |
| name_   | string  | the associated pools name              |
| offset_ | uint256 | the starting index in the pools array  |
| limit_  | uint256 | the number of pools                    |


Return values:

| Name   | Type      | Description                |
| :----- | :-------- | :------------------------- |
| pools_ | address[] | the array of pools proxies |
