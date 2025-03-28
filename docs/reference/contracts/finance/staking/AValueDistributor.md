# AValueDistributor

## Overview

#### License: MIT

```solidity
abstract contract AValueDistributor
```

The Staking module

Contract module for distributing value among users based on their shares.

The algorithm ensures that the distribution is proportional to the shares
held by each user and takes into account changes in the cumulative sum over time.

This contract can be used as a base contract for implementing various distribution mechanisms,
such as token staking, profit sharing, or dividend distribution.

It includes hooks for performing additional logic
when shares are added or removed, or when value is distributed.
## Structs info

### UserDistribution

```solidity
struct UserDistribution {
	uint256 shares;
	uint256 cumulativeSum;
	uint256 owedValue;
}
```


### AValueDistributorStorage

```solidity
struct AValueDistributorStorage {
	uint256 totalShares;
	uint256 cumulativeSum;
	uint256 updatedAt;
	mapping(address => AValueDistributor.UserDistribution) userDistributions;
}
```


## Events info

### SharesAdded

```solidity
event SharesAdded(address user, uint256 amount)
```


### SharesRemoved

```solidity
event SharesRemoved(address user, uint256 amount)
```


### ValueDistributed

```solidity
event ValueDistributed(address user, uint256 amount)
```


## Errors info

### AmountIsZero

```solidity
error AmountIsZero()
```


### InsufficientOwedValue

```solidity
error InsufficientOwedValue(address account, uint256 balance, uint256 needed)
```


### InsufficientSharesAmount

```solidity
error InsufficientSharesAmount(address account, uint256 balance, uint256 needed)
```


### UserIsZeroAddress

```solidity
error UserIsZeroAddress()
```


## Functions info

### totalShares (0x3a98ef39)

```solidity
function totalShares() public view returns (uint256)
```

Returns the total number of shares.


Return values:

| Name | Type    | Description                 |
| :--- | :------ | :-------------------------- |
| [0]  | uint256 | The total number of shares. |

### cumulativeSum (0xa16f5fd2)

```solidity
function cumulativeSum() public view returns (uint256)
```

Returns the cumulative sum of value that has been distributed.


Return values:

| Name | Type    | Description                                            |
| :--- | :------ | :----------------------------------------------------- |
| [0]  | uint256 | The cumulative sum of value that has been distributed. |

### updatedAt (0x7519ab50)

```solidity
function updatedAt() public view returns (uint256)
```

Returns the timestamp of the last update.


Return values:

| Name | Type    | Description                       |
| :--- | :------ | :-------------------------------- |
| [0]  | uint256 | The timestamp of the last update. |

### userDistribution (0x3cf69475)

```solidity
function userDistribution(
    address user_
) public view returns (AValueDistributor.UserDistribution memory)
```

Returns the distribution details for a specific user.


Parameters:

| Name  | Type    | Description               |
| :---- | :------ | :------------------------ |
| user_ | address | The address of the user.  |


Return values:

| Name | Type                                      | Description                                                                      |
| :--- | :---------------------------------------- | :------------------------------------------------------------------------------- |
| [0]  | struct AValueDistributor.UserDistribution | The distribution details including user's shares, cumulative sum and value owed. |

### getOwedValue (0x2d3bac1b)

```solidity
function getOwedValue(address user_) public view returns (uint256)
```

Gets the amount of value owed to a specific user.


Parameters:

| Name  | Type    | Description               |
| :---- | :------ | :------------------------ |
| user_ | address | The address of the user.  |


Return values:

| Name | Type    | Description                       |
| :--- | :------ | :-------------------------------- |
| [0]  | uint256 | The total owed value to the user. |
