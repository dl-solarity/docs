# AbstractContractsRegistry

## Overview

#### License: MIT

```solidity
abstract contract AbstractContractsRegistry is Initializable
```

The ContractsRegistry module

For more information please refer to [EIP-6224](https://eips.ethereum.org/EIPS/eip-6224).

The purpose of this module is to provide an organized registry of the project's smart contracts
together with the upgradeability and dependency injection mechanisms.

The ContractsRegistry should be used as the highest level smart contract that is aware of any other
contract present in the system. The contracts that demand other system's contracts would then inherit
special `AbstractDependant` contract and override `setDependencies()` function to enable ContractsRegistry
to inject dependencies into them.

The ContractsRegistry will help with the following use cases:

1) Making the system upgradeable
2) Making the system contracts-interchangeable
3) Simplifying the contracts management and deployment

The ContractsRegistry acts as a TransparentProxy deployer. One can add proxy-compatible implementations to the registry
and deploy proxies to them. Then these proxies can be upgraded easily using the provided interface.
The ContractsRegistry itself can be deployed behind a proxy as well.

The dependency injection system may come in handy when one wants to substitute a contract `A` with a contract `B`
(for example contract `A` got exploited) without a necessity of redeploying the whole system. One would just add
a new `B` contract to a ContractsRegistry and re-inject all the required dependencies. Dependency injection mechanism
is also meant to be compatible with factories.

Users may also fetch all the contracts present in the system as they are now located in a single place.
## Events info

### ContractAdded

```solidity
event ContractAdded(string name, address contractAddress)
```


### ProxyContractAdded

```solidity
event ProxyContractAdded(string name, address contractAddress, address implementation)
```


### ProxyContractUpgraded

```solidity
event ProxyContractUpgraded(string name, address newImplementation)
```


### ContractRemoved

```solidity
event ContractRemoved(string name)
```


## Functions info

### getContract (0x35817773)

```solidity
function getContract(string memory name_) public view returns (address)
```

The function that returns an associated contract with the name


Parameters:

| Name  | Type   | Description                |
| :---- | :----- | :------------------------- |
| name_ | string | the name of the contract   |


Return values:

| Name | Type    | Description                 |
| :--- | :------ | :-------------------------- |
| [0]  | address | the address of the contract |

### hasContract (0x8c223601)

```solidity
function hasContract(string memory name_) public view returns (bool)
```

The function that checks if a contract with a given name has been added


Parameters:

| Name  | Type   | Description                |
| :---- | :----- | :------------------------- |
| name_ | string | the name of the contract   |


Return values:

| Name | Type | Description                                     |
| :--- | :--- | :---------------------------------------------- |
| [0]  | bool | true if the contract is present in the registry |

### getProxyUpgrader (0xd10611fc)

```solidity
function getProxyUpgrader() public view returns (address)
```

The function that returns the admin of the added proxy contracts


Return values:

| Name | Type    | Description             |
| :--- | :------ | :---------------------- |
| [0]  | address | the proxy admin address |

### getImplementation (0x6b683896)

```solidity
function getImplementation(string memory name_) public view returns (address)
```

The function that returns an implementation of the given proxy contract


Parameters:

| Name  | Type   | Description                |
| :---- | :----- | :------------------------- |
| name_ | string | the name of the contract   |


Return values:

| Name | Type    | Description                |
| :--- | :------ | :------------------------- |
| [0]  | address | the implementation address |
