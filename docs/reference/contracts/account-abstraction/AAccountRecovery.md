# AAccountRecovery

## Overview

#### License: MIT

```solidity
abstract contract AAccountRecovery is IAccountRecovery
```

The Account Recovery module

Contract module which provides a basic account recovery mechanism as specified in EIP-7947.
You may use this module as a base contract for your own account recovery mechanism.

The Account Recovery module allows to add recovery providers to the account.
The recovery providers are used to recover the account access.

For more information please refer to [EIP-7947](https://eips.ethereum.org/EIPS/eip-7947).
## Structs info

### AAccountRecoveryStorage

```solidity
struct AAccountRecoveryStorage {
	EnumerableSet.AddressSet recoveryProviders;
}
```


## Errors info

### ZeroAddress

```solidity
error ZeroAddress()
```


### ProviderAlreadyAdded

```solidity
error ProviderAlreadyAdded(address provider)
```


### ProviderNotRegistered

```solidity
error ProviderNotRegistered(address provider)
```


## Functions info

### addRecoveryProvider (0x180e8d5c)

```solidity
function addRecoveryProvider(
    address provider_,
    bytes memory recoveryData_
) external payable virtual
```

A function to add a new recovery provider.
SHOULD be access controlled.



Parameters:

| Name          | Type    | Description                                                |
| :------------ | :------ | :--------------------------------------------------------- |
| provider_     | address | the address of a recovery provider (ZKP verifier) to add.  |
| recoveryData_ | bytes   | custom data (commitment) for the recovery provider.        |

### removeRecoveryProvider (0xefe4256c)

```solidity
function removeRecoveryProvider(address provider_) external payable virtual
```

A function to remove an existing recovery provider.
SHOULD be access controlled.



Parameters:

| Name      | Type    | Description                                                    |
| :-------- | :------ | :------------------------------------------------------------- |
| provider_ | address | the address of a previously added recovery provider to remove. |

### recoverAccess (0x15494a7d)

```solidity
function recoverAccess(
    bytes memory subject_,
    address provider_,
    bytes memory proof_
) external virtual returns (bool)
```

A non-view function to recover access of a smart account.


Parameters:

| Name      | Type    | Description                                                              |
| :-------- | :------ | :----------------------------------------------------------------------- |
| subject_  | bytes   | the recovery subject (encoded owner address, access control role, etc).  |
| provider_ | address | the address of a recovery provider.                                      |
| proof_    | bytes   | an encoded proof of recovery (ZKP/ZKAI, signature, etc).                 |


Return values:

| Name | Type | Description                                                      |
| :--- | :--- | :--------------------------------------------------------------- |
| [0]  | bool | `true` if recovery is successful, `false` (or revert) otherwise. |

### recoveryProviderAdded (0xbb76cd3c)

```solidity
function recoveryProviderAdded(
    address provider_
) public view virtual returns (bool)
```

A view function to check if a provider has been previously added.


Parameters:

| Name     | Type    | Description             |
| :------- | :------ | :---------------------- |
| provider | address | the provider to check.  |


Return values:

| Name | Type | Description                                                  |
| :--- | :--- | :----------------------------------------------------------- |
| [0]  | bool | true if the provider exists in the account, false otherwise. |

### getRecoveryProviders (0x75cd78a6)

```solidity
function getRecoveryProviders() public view virtual returns (address[] memory)
```

A function to get the list of all the recovery providers added to the account


Return values:

| Name | Type      | Description                    |
| :--- | :-------- | :----------------------------- |
| [0]  | address[] | the list of recovery providers |
