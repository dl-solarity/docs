# MultiOwnableContractsRegistry

## Overview

#### License: MIT

```solidity
contract MultiOwnableContractsRegistry is AbstractContractsRegistry, MultiOwnable
```

The MultiOwnable preset of ContractsRegistry
## Functions info

### __MultiOwnableContractsRegistry_init (0x62fe8259)

```solidity
function __MultiOwnableContractsRegistry_init() public initializer
```

The initialization function
### injectDependencies (0x1adad8cf)

```solidity
function injectDependencies(string calldata name_) external onlyOwner
```

The function to inject dependencies to the specified contract


Parameters:

| Name  | Type   | Description                                        |
| :---- | :----- | :------------------------------------------------- |
| name_ | string | the name of the contract to inject dependencies to |

### injectDependenciesWithData (0xbe96dc3e)

```solidity
function injectDependenciesWithData(
    string calldata name_,
    bytes calldata data_
) external onlyOwner
```

The function to inject dependencies with data to the specified contract


Parameters:

| Name  | Type   | Description                                           |
| :---- | :----- | :---------------------------------------------------- |
| name_ | string | the name of the contract to inject dependencies to    |
| data_ | bytes  | the data to be passed to `setDependencies()` function |

### upgradeContract (0x1271bd53)

```solidity
function upgradeContract(
    string calldata name_,
    address newImplementation_
) external onlyOwner
```

The function to upgrade the specified proxy contract


Parameters:

| Name               | Type    | Description                                 |
| :----------------- | :------ | :------------------------------------------ |
| name_              | string  | the name of the proxy contract to upgrade   |
| newImplementation_ | address | the new implementation                      |

### upgradeContractAndCall (0x6bbe8694)

```solidity
function upgradeContractAndCall(
    string calldata name_,
    address newImplementation_,
    bytes calldata data_
) external onlyOwner
```

The function to upgrade the specified proxy contract with data


Parameters:

| Name               | Type    | Description                                                  |
| :----------------- | :------ | :----------------------------------------------------------- |
| name_              | string  | the name of the proxy contract to upgrade                    |
| newImplementation_ | address | the new implementation                                       |
| data_              | bytes   | the data the proxy contract will be called after the upgrade |

### addContract (0xbf5b6016)

```solidity
function addContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```

The function to add the regular contract to the registry


Parameters:

| Name             | Type    | Description                            |
| :--------------- | :------ | :------------------------------------- |
| name_            | string  | the associative name of the contract   |
| contractAddress_ | address | the address of the contract to add     |

### addProxyContract (0xe0e084f8)

```solidity
function addProxyContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```

The function to add the proxy contract to the registry (deploys TransparentProxy on top)


Parameters:

| Name             | Type    | Description                                       |
| :--------------- | :------ | :------------------------------------------------ |
| name_            | string  | the associative name of the contract              |
| contractAddress_ | address | the address of the implementation contract to add |

### addProxyContractAndCall (0x423c072b)

```solidity
function addProxyContractAndCall(
    string calldata name_,
    address contractAddress_,
    bytes calldata data_
) external onlyOwner
```

The function to add the proxy contract to the registry with immediate call (deploys TransparentProxy on top)


Parameters:

| Name             | Type    | Description                                                   |
| :--------------- | :------ | :------------------------------------------------------------ |
| name_            | string  | the associative name of the contract                          |
| contractAddress_ | address | the address of the implementation contract to add             |
| data_            | bytes   | the data the proxy contract will be called after the addition |

### justAddProxyContract (0x51dad82c)

```solidity
function justAddProxyContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```

The function to add proxy contract to the registry as is


Parameters:

| Name             | Type    | Description                              |
| :--------------- | :------ | :--------------------------------------- |
| name_            | string  | the associative name of the contract     |
| contractAddress_ | address | the address of the proxy contract to add |

### removeContract (0x97623b58)

```solidity
function removeContract(string calldata name_) external onlyOwner
```

The function to remove the contract from the registry


Parameters:

| Name  | Type   | Description                                        |
| :---- | :----- | :------------------------------------------------- |
| name_ | string | the the associative name of the contract to remove |
