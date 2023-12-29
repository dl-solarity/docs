# IRBAC

## Interface Description


License: MIT

## 

```solidity
interface IRBAC
```

The RBAC module
## Structs info

### ResourceWithPermissions

```solidity
struct ResourceWithPermissions {
	string resource;
	string[] permissions;
}
```


## Events info

### GrantedRoles

```solidity
event GrantedRoles(address to, string[] rolesToGrant)
```


### RevokedRoles

```solidity
event RevokedRoles(address from, string[] rolesToRevoke)
```


### AddedPermissions

```solidity
event AddedPermissions(string role, string resource, string[] permissionsToAdd, bool allowed)
```


### RemovedPermissions

```solidity
event RemovedPermissions(string role, string resource, string[] permissionsToRemove, bool allowed)
```


## Functions info

### grantRoles (0xee2f6ce5)

```solidity
function grantRoles(address to_, string[] calldata rolesToGrant_) external
```


### revokeRoles (0x4f0d84e3)

```solidity
function revokeRoles(address from_, string[] calldata rolesToRevoke_) external
```


### addPermissionsToRole (0x37ff630d)

```solidity
function addPermissionsToRole(
    string calldata role_,
    IRBAC.ResourceWithPermissions[] calldata permissionsToAdd_,
    bool allowed_
) external
```


### removePermissionsFromRole (0x75e025e7)

```solidity
function removePermissionsFromRole(
    string calldata role_,
    IRBAC.ResourceWithPermissions[] calldata permissionsToRemove_,
    bool allowed_
) external
```


### getUserRoles (0x06a36aee)

```solidity
function getUserRoles(
    address who_
) external view returns (string[] calldata roles_)
```


### getRolePermissions (0x002f5bc0)

```solidity
function getRolePermissions(
    string calldata role_
)
    external
    view
    returns (
        IRBAC.ResourceWithPermissions[] calldata allowed_,
        IRBAC.ResourceWithPermissions[] calldata disallowed_
    )
```


### hasPermission (0x7951c6da)

```solidity
function hasPermission(
    address who_,
    string calldata resource_,
    string calldata permission_
) external view returns (bool isAllowed_)
```

