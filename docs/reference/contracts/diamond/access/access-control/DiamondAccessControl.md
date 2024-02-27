# DiamondAccessControl

## Overview

#### License: MIT

```solidity
abstract contract DiamondAccessControl is DiamondAccessControlStorage
```

The Diamond standard module

This is modified version of OpenZeppelin's AccessControl contract to be used as a Storage contract
by the Diamond Standard.
## Functions info

### grantRole (0x2f2ff15d)

```solidity
function grantRole(
    bytes32 role_,
    address account_
) public virtual override onlyRole(getRoleAdmin(role_))
```

Grants `role` to `account`.

If `account` had not been already granted `role`, emits a {RoleGranted}
event.

Requirements:

- the caller must have ``role``'s admin role.
### revokeRole (0xd547741f)

```solidity
function revokeRole(
    bytes32 role_,
    address account_
) public virtual override onlyRole(getRoleAdmin(role_))
```

Revokes `role` from `account`.

If `account` had been granted `role`, emits a {RoleRevoked} event.

Requirements:

- the caller must have ``role``'s admin role.
### renounceRole (0x36568abe)

```solidity
function renounceRole(bytes32 role_, address account_) public virtual override
```

Revokes `role` from the calling account.

Roles are often managed via {grantRole} and {revokeRole}: this function's
purpose is to provide a mechanism for accounts to lose their privileges
if they are compromised (such as when a trusted device is misplaced).

If the calling account had been granted `role`, emits a {RoleRevoked}
event.

Requirements:

- the caller must be `account`.