# ARecoverableAccount

## Overview

#### License: MIT

```solidity
abstract contract ARecoverableAccount is IAccount, Initializable, AAccountRecovery, ERC7821
```

EIP-7702/ERC-4337 Recoverable Account module

A basic EIP-7702/ERC-4337 account implementation with ERC-7821 batching execution,
ERC-4337 sponsored transactions, and ERC-7947 recoverable trusted executor.
## Structs info

### RecoverableAccountStorage

```solidity
struct RecoverableAccountStorage {
	address entryPoint;
	address trustedExecutor;
}
```


## Events info

### TrustedExecutorUpdated

```solidity
event TrustedExecutorUpdated(address indexed oldTrustedExecutor, address indexed newTrustedExecutor)
```


## Errors info

### NotSelfCalled

```solidity
error NotSelfCalled()
```


### InvalidExecutor

```solidity
error InvalidExecutor(address executor)
```


## Constants info

### SIG_VALIDATION_FAILED (0x8f41ec5a)

```solidity
uint256 constant SIG_VALIDATION_FAILED = 1
```


### SIG_VALIDATION_SUCCESS (0x861af77c)

```solidity
uint256 constant SIG_VALIDATION_SUCCESS = 0
```


## Modifiers info

### onlySelfCalled

```solidity
modifier onlySelfCalled()
```


## Functions info

### addRecoveryProvider (0x180e8d5c)

```solidity
function addRecoveryProvider(
    address provider_,
    bytes memory recoveryData_
) external payable virtual override onlySelfCalled
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
function removeRecoveryProvider(
    address provider_
) external payable virtual override onlySelfCalled
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
) external virtual override returns (bool)
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

### validateUserOp (0x19822f7c)

```solidity
function validateUserOp(
    IAccount.PackedUserOperation calldata userOp_,
    bytes32 userOpHash_,
    uint256 missingAccountFunds_
) external virtual returns (uint256 validationData_)
```

A function to validate a `PackedUserOperation` for the account.

This function is called from the `EntryPoint` while executing the user operation.
Must be implemented by accounts to verify signatures and pay required funds.


Parameters:

| Name                 | Type                                | Description                                             |
| :------------------- | :---------------------------------- | :------------------------------------------------------ |
| userOp_              | struct IAccount.PackedUserOperation | The user operation being validated.                     |
| userOpHash_          | bytes32                             | The user operation hash used for signature validation.  |
| missingAccountFunds_ | uint256                             | Amount that the account must fund to the `EntryPoint`.  |


Return values:

| Name            | Type    | Description                             |
| :-------------- | :------ | :-------------------------------------- |
| validationData_ | uint256 | The result of the signature validation. |

### trustedExecutor (0x39584b19)

```solidity
function trustedExecutor() public view virtual returns (address)
```

A function to retrieve the current trusted executor.


Return values:

| Name | Type    | Description                                  |
| :--- | :------ | :------------------------------------------- |
| [0]  | address | The address of the current trusted executor. |

### entryPoint (0xb0d691fe)

```solidity
function entryPoint() public view virtual returns (address)
```

A function to retrieve the address of the `EntryPoint` this account is bound to.


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | address | The `EntryPoint` contract address. |
