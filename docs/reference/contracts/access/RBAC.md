# RBAC

## Overview

#### License: MIT

```solidity
abstract contract RBAC is IRBAC, Initializable
```

The Role Based Access Control (RBAC) module

This is advanced module that handles role management for huge systems. One can declare specific permissions
for specific resources (contracts) and aggregate them into roles for further assignment to users.

Each user can have multiple roles and each role can manage multiple resources. Each resource can posses a set of
permissions (CREATE, DELETE) that are only valid for that specific resource.

The RBAC model supports antipermissions as well. One can grant antipermissions to users to restrict their access level.
There also is a special wildcard symbol "*" that means "everything". This symbol can be applied either to the
resources or permissions.

By default, the MASTER role is configured with "*" as resources and permissions, allowing masters to do everything.

The RBAC structure is the following:

(PERMISSION >- RESOURCE) >- ROLE

Where ROLE is assignable to users
## Constants info

### MASTER_ROLE (0xdc224863)

```solidity
string constant MASTER_ROLE = "MASTER"
```


### ALL_RESOURCE (0x4a9e12c5)

```solidity
string constant ALL_RESOURCE = "*"
```


### ALL_PERMISSION (0xff846fb9)

```solidity
string constant ALL_PERMISSION = "*"
```


### CREATE_PERMISSION (0xb3e657fb)

```solidity
string constant CREATE_PERMISSION = "CREATE"
```


### READ_PERMISSION (0x03bc0b3e)

```solidity
string constant READ_PERMISSION = "READ"
```


### UPDATE_PERMISSION (0x0ead6f1e)

```solidity
string constant UPDATE_PERMISSION = "UPDATE"
```


### DELETE_PERMISSION (0xb832a5a2)

```solidity
string constant DELETE_PERMISSION = "DELETE"
```


### RBAC_RESOURCE (0x733352b3)

```solidity
string constant RBAC_RESOURCE = "RBAC_RESOURCE"
```


## Modifiers info

### onlyPermission

```solidity
modifier onlyPermission(string memory resource_, string memory permission_)
```


## Functions info

### grantRoles (0xee2f6ce5)

```solidity
function grantRoles(
    address to_,
    string[] memory rolesToGrant_
) public virtual override onlyPermission(RBAC_RESOURCE, CREATE_PERMISSION)
```

The function to grant roles to a user


Parameters:

| Name          | Type     | Description                 |
| :------------ | :------- | :-------------------------- |
| to_           | address  | the user to grant roles to  |
| rolesToGrant_ | string[] | roles to grant              |

### revokeRoles (0x4f0d84e3)

```solidity
function revokeRoles(
    address from_,
    string[] memory rolesToRevoke_
) public virtual override onlyPermission(RBAC_RESOURCE, DELETE_PERMISSION)
```

The function to revoke roles


Parameters:

| Name           | Type     | Description                    |
| :------------- | :------- | :----------------------------- |
| from_          | address  | the user to revoke roles from  |
| rolesToRevoke_ | string[] | the roles to revoke            |

### addPermissionsToRole (0x37ff630d)

```solidity
function addPermissionsToRole(
    string memory role_,
    IRBAC.ResourceWithPermissions[] memory permissionsToAdd_,
    bool allowed_
) public virtual override onlyPermission(RBAC_RESOURCE, CREATE_PERMISSION)
```

The function to add resource permission to role


Parameters:

| Name              | Type                                   | Description                                                          |
| :---------------- | :------------------------------------- | :------------------------------------------------------------------- |
| role_             | string                                 | the role to add permissions to                                       |
| permissionsToAdd_ | struct IRBAC.ResourceWithPermissions[] | the array of resources and permissions to add to the role            |
| allowed_          | bool                                   | indicates whether to add permissions to an allowlist or disallowlist |

### removePermissionsFromRole (0x75e025e7)

```solidity
function removePermissionsFromRole(
    string memory role_,
    IRBAC.ResourceWithPermissions[] memory permissionsToRemove_,
    bool allowed_
) public virtual override onlyPermission(RBAC_RESOURCE, DELETE_PERMISSION)
```

The function to remove permissions from role


Parameters:

| Name                 | Type                                   | Description                                                                |
| :------------------- | :------------------------------------- | :------------------------------------------------------------------------- |
| role_                | string                                 | the role to remove permissions from                                        |
| permissionsToRemove_ | struct IRBAC.ResourceWithPermissions[] | the array of resources and permissions to remove from the role             |
| allowed_             | bool                                   | indicates whether to remove permissions from the allowlist or disallowlist |

### getUserRoles (0x06a36aee)

```solidity
function getUserRoles(
    address who_
) public view override returns (string[] memory roles_)
```

The function to get the list of user roles


Parameters:

| Name | Type    | Description |
| :--- | :------ | :---------- |
| who_ | address | the user    |


Return values:

| Name   | Type     | Description           |
| :----- | :------- | :-------------------- |
| roles_ | string[] | the roles of the user |

### getRolePermissions (0x002f5bc0)

```solidity
function getRolePermissions(
    string memory role_
)
    public
    view
    override
    returns (
        IRBAC.ResourceWithPermissions[] memory allowed_,
        IRBAC.ResourceWithPermissions[] memory disallowed_
    )
```

The function to get the permissions of the role


Parameters:

| Name  | Type   | Description |
| :---- | :----- | :---------- |
| role_ | string | the role    |


Return values:

| Name        | Type                                   | Description                                    |
| :---------- | :------------------------------------- | :--------------------------------------------- |
| allowed_    | struct IRBAC.ResourceWithPermissions[] | the list of allowed permissions of the role    |
| disallowed_ | struct IRBAC.ResourceWithPermissions[] | the list of disallowed permissions of the role |

### hasPermission (0x7951c6da)

```solidity
function hasPermission(
    address who_,
    string memory resource_,
    string memory permission_
) public view virtual override returns (bool isAllowed_)
```

The function to check the user's possession of the role


DO NOT call `super.hasPermission(...)` in derived contracts, because this method
handles not 2 but 3 states: NO PERMISSION, ALLOWED, DISALLOWED



Parameters:

| Name        | Type    | Description                                          |
| :---------- | :------ | :--------------------------------------------------- |
| who_        | address | the user                                             |
| resource_   | string  | the resource the user has to have the permission of  |
| permission_ | string  | the permission the user has to have                  |


Return values:

| Name       | Type | Description                                          |
| :--------- | :--- | :--------------------------------------------------- |
| isAllowed_ | bool | true if the user has the permission, false otherwise |
