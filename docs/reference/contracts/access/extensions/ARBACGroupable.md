# ARBACGroupable

## Overview

#### License: MIT

```solidity
abstract contract ARBACGroupable is IRBACGroupable, ARBAC
```

The Role Based Access Control (RBAC) module

This contract is an extension for the RBAC contract to provide the ability to organize roles
into groups and assign users to them.

The contract also supports default groups that all users may be in by default.

The RBAC structure becomes the following:

((PERMISSION >- RESOURCE) >- ROLE) >- GROUP

Where ROLE and GROUP are assignable to users
## Structs info

### ARBACGroupableStorage

```solidity
struct ARBACGroupableStorage {
	uint256 defaultGroupEnabled;
	mapping(address => DynamicSet.StringSet) userGroups;
	mapping(string => DynamicSet.StringSet) groupRoles;
}
```


## Errors info

### EmptyGroups

```solidity
error EmptyGroups()
```


## Functions info

### addUserToGroups (0xfcddfd4a)

```solidity
function addUserToGroups(
    address who_,
    string[] memory groupsToAddTo_
) public virtual override onlyPermission(RBAC_RESOURCE, CREATE_PERMISSION)
```

The function to assign the user to groups


Parameters:

| Name           | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| who_           | address  | the user to be assigned                  |
| groupsToAddTo_ | string[] | the list of groups to assign the user to |

### removeUserFromGroups (0x9a9aa8d4)

```solidity
function removeUserFromGroups(
    address who_,
    string[] memory groupsToRemoveFrom_
) public virtual override onlyPermission(RBAC_RESOURCE, DELETE_PERMISSION)
```

The function to remove the user from groups


Parameters:

| Name                | Type     | Description                                |
| :------------------ | :------- | :----------------------------------------- |
| who_                | address  | the user to be removed from groups         |
| groupsToRemoveFrom_ | string[] | the list of groups to remove the user from |

### grantGroupRoles (0xf1c7d41b)

```solidity
function grantGroupRoles(
    string memory groupTo_,
    string[] memory rolesToGrant_
) public virtual override onlyPermission(RBAC_RESOURCE, CREATE_PERMISSION)
```

The function to grant roles to the group


Parameters:

| Name          | Type     | Description                  |
| :------------ | :------- | :--------------------------- |
| groupTo_      | string   | the group to grant roles to  |
| rolesToGrant_ | string[] | the list of roles to grant   |

### revokeGroupRoles (0x30cae168)

```solidity
function revokeGroupRoles(
    string memory groupFrom_,
    string[] memory rolesToRevoke_
) public virtual override onlyPermission(RBAC_RESOURCE, DELETE_PERMISSION)
```

The function to revoke roles from the group


Parameters:

| Name           | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| groupFrom_     | string   | the group to revoke roles from  |
| rolesToRevoke_ | string[] | the list of roles to revoke     |

### toggleDefaultGroup (0xd41de127)

```solidity
function toggleDefaultGroup()
    public
    virtual
    override
    onlyPermission(RBAC_RESOURCE, UPDATE_PERMISSION)
```

The function to toggle the default group state. When `defaultGroupEnabled` is set
to true, the default group is enabled, otherwise it is disabled
### getUserGroups (0x3da04e4a)

```solidity
function getUserGroups(
    address who_
) public view override returns (string[] memory groups_)
```

The function to get the list of user groups


Parameters:

| Name | Type    | Description |
| :--- | :------ | :---------- |
| who_ | address | the user    |


Return values:

| Name    | Type     | Description             |
| :------ | :------- | :---------------------- |
| groups_ | string[] | the list of user groups |

### getGroupRoles (0x8e5cc2b7)

```solidity
function getGroupRoles(
    string memory group_
) public view override returns (string[] memory roles_)
```

The function to get the list of groups roles


Parameters:

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| group_ | string | the group   |


Return values:

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| roles_ | string[] | the list of group roles |

### getDefaultGroupEnabled (0x0b441407)

```solidity
function getDefaultGroupEnabled()
    public
    view
    returns (bool defaultGroupEnabled_)
```

The function to get the current state of the default group


Return values:

| Name                 | Type | Description                                                 |
| :------------------- | :--- | :---------------------------------------------------------- |
| defaultGroupEnabled_ | bool | the boolean indicating whether the default group is enabled |

### hasPermission (0x7951c6da)

```solidity
function hasPermission(
    address who_,
    string memory resource_,
    string memory permission_
) public view virtual override returns (bool isAllowed_)
```

The function to check the user's possession of the role. Unlike the base method,
this method also looks up the required permission in the user's groups

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
