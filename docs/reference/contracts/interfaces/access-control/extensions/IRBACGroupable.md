# IRBACGroupable

## Interface Description


License: MIT

## 

```solidity
interface IRBACGroupable
```

The RBAC module
## Events info

### AddedToGroups

```solidity
event AddedToGroups(address who, string[] groupsToAddTo)
```


### RemovedFromGroups

```solidity
event RemovedFromGroups(address who, string[] groupsToRemoveFrom)
```


### GrantedGroupRoles

```solidity
event GrantedGroupRoles(string groupTo, string[] rolesToGrant)
```


### RevokedGroupRoles

```solidity
event RevokedGroupRoles(string groupFrom, string[] rolesToRevoke)
```


### ToggledDefaultGroup

```solidity
event ToggledDefaultGroup(bool defaultGroupEnabled)
```


## Functions info

### addUserToGroups (0xfcddfd4a)

```solidity
function addUserToGroups(
    address who_,
    string[] calldata groupsToAddTo_
) external
```


### removeUserFromGroups (0x9a9aa8d4)

```solidity
function removeUserFromGroups(
    address who_,
    string[] calldata groupsToRemoveFrom_
) external
```


### grantGroupRoles (0xf1c7d41b)

```solidity
function grantGroupRoles(
    string calldata groupTo_,
    string[] calldata rolesToGrant_
) external
```


### revokeGroupRoles (0x30cae168)

```solidity
function revokeGroupRoles(
    string calldata groupFrom_,
    string[] calldata rolesToRevoke_
) external
```


### toggleDefaultGroup (0xd41de127)

```solidity
function toggleDefaultGroup() external
```


### getUserGroups (0x3da04e4a)

```solidity
function getUserGroups(
    address who_
) external view returns (string[] calldata groups_)
```


### getGroupRoles (0x8e5cc2b7)

```solidity
function getGroupRoles(
    string calldata group_
) external view returns (string[] calldata roles_)
```


### getDefaultGroupEnabled (0x0b441407)

```solidity
function getDefaultGroupEnabled() external view returns (bool)
```

