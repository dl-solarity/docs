# ADiamondAccessControlStorage

## Overview

#### License: MIT

```solidity
abstract contract ADiamondAccessControlStorage is IAccessControl, AInitializableStorage
```

The Diamond standard module

This is an AccessControl Storage contract with Diamond Standard support
## Structs info

### RoleData

```solidity
struct RoleData {
	mapping(address => bool) members;
	bytes32 adminRole;
}
```


### DACStorage

```solidity
struct DACStorage {
	mapping(bytes32 => ADiamondAccessControlStorage.RoleData) roles;
}
```


## Errors info

### RoleNotGranted

```solidity
error RoleNotGranted(bytes32 role, address account)
```


## Constants info

### DIAMOND_ACCESS_CONTROL_STORAGE_SLOT (0xb29b3bc0)

```solidity
bytes32 constant DIAMOND_ACCESS_CONTROL_STORAGE_SLOT = keccak256("diamond.standard.diamond.access.control.storage")
```


### DEFAULT_ADMIN_ROLE (0xa217fddf)

```solidity
bytes32 constant DEFAULT_ADMIN_ROLE = 0x00
```


## Modifiers info

### onlyRole

```solidity
modifier onlyRole(bytes32 role_)
```

Modifier that checks that an account has a specific role. Reverts
with a custom error including the required role.
## Functions info

### hasRole (0x91d14854)

```solidity
function hasRole(
    bytes32 role_,
    address account_
) public view virtual override returns (bool)
```

Returns `true` if `account` has been granted `role`.
### getRoleAdmin (0x248a9ca3)

```solidity
function getRoleAdmin(
    bytes32 role_
) public view virtual override returns (bytes32)
```

Returns the admin role that controls `role`. See {grantRole} and
{revokeRole}.

To change a role's admin, use {AccessControl-_setRoleAdmin}.