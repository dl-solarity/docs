# AStaking

## Overview

#### License: MIT

```solidity
abstract contract AStaking is AValueDistributor, Initializable
```

The Staking module

Contract module for staking tokens and earning rewards based on shares.
## Structs info

### AStakingStorage

```solidity
struct AStakingStorage {
	address sharesToken;
	address rewardsToken;
	uint256 rate;
	uint256 stakingStartTime;
}
```


## Errors info

### RewardsTokenIsZeroAddress

```solidity
error RewardsTokenIsZeroAddress()
```


### SharesTokenIsZeroAddress

```solidity
error SharesTokenIsZeroAddress()
```


### StakingHasNotStarted

```solidity
error StakingHasNotStarted(uint256 currentTimestamp, uint256 stakingStartTime)
```


## Modifiers info

### stakingStarted

```solidity
modifier stakingStarted()
```

Throws if the staking has not started yet.
## Functions info

### stake (0xa694fc3a)

```solidity
function stake(uint256 amount_) public stakingStarted
```

Stakes the specified amount of tokens.


Parameters:

| Name    | Type    | Description                    |
| :------ | :------ | :----------------------------- |
| amount_ | uint256 | The amount of tokens to stake. |

### unstake (0x2e17de78)

```solidity
function unstake(uint256 amount_) public stakingStarted
```

Unstakes the specified amount of tokens.


Parameters:

| Name    | Type    | Description                      |
| :------ | :------ | :------------------------------- |
| amount_ | uint256 | The amount of tokens to unstake. |

### claim (0x379607f5)

```solidity
function claim(uint256 amount_) public stakingStarted
```

Claims the specified amount of rewards.


Parameters:

| Name    | Type    | Description                     |
| :------ | :------ | :------------------------------ |
| amount_ | uint256 | The amount of rewards to claim. |

### claimAll (0xd1058e59)

```solidity
function claimAll() public stakingStarted returns (uint256)
```

Claims all the available rewards.


Return values:

| Name | Type    | Description                             |
| :--- | :------ | :-------------------------------------- |
| [0]  | uint256 | The total value of the rewards claimed. |

### withdraw (0x3ccfd60b)

```solidity
function withdraw()
    public
    stakingStarted
    returns (uint256 shares_, uint256 owedValue_)
```

Withdraws all the staked tokens together with rewards.

Note: All the rewards are claimed after the shares are removed.



Return values:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| shares_    | uint256 | The amount of shares being withdrawn.            |
| owedValue_ | uint256 | The total value of the rewards owed to the user. |

### sharesToken (0x8009ba1f)

```solidity
function sharesToken() public view returns (address)
```

Returns the shares token.


Return values:

| Name | Type    | Description                               |
| :--- | :------ | :---------------------------------------- |
| [0]  | address | The address of the shares token contract. |

### rewardsToken (0xd1af0c7d)

```solidity
function rewardsToken() public view returns (address)
```

Returns the rewards token.


Return values:

| Name | Type    | Description                                |
| :--- | :------ | :----------------------------------------- |
| [0]  | address | The address of the rewards token contract. |

### stakingStartTime (0x6abfd183)

```solidity
function stakingStartTime() public view returns (uint256)
```

Returns the staking start time.


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | uint256 | The timestamp when staking starts. |

### rate (0x2c4e722e)

```solidity
function rate() public view returns (uint256)
```

Returns the rate of rewards distribution.


Return values:

| Name | Type    | Description                                  |
| :--- | :------ | :------------------------------------------- |
| [0]  | uint256 | The rate of rewards distribution per second. |
