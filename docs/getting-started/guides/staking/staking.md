# 🪙 Staking

## Introduction

The Staking module is an abstract solution that allows users to stake tokens and earn rewards based on their shares. This module is designed to be flexible and modular, so it can be easily customized to meet the needs of your specific application.

## Implementation

The module holds two primary contracts: the `AbstractValueDistributor` and the `AbstractStaking`. The first one handles the distribution calculations according to the algorithm that ensures the distribution is proportional to the shares held by each user and takes into account changes in the cumulative sum over time. The formula being used is:

$$
r(u, k, n) = S * (\sum_{i=0}^{n-1} \frac{R}{Ti} - \sum_{i=0}^{k-1} \frac{R}{Ti})
$$

where\
&#x20;   _r(u, k, n)_ = rewards earned by user _u_ from _k_ to _n_ seconds\
&#x20;   _S_ = amount staked by user _u_ for time _k_ to _n - 1_\
&#x20;   _Ti_ = total staked at time _i_ (assume _Ti_ > 0)\
&#x20;   _R_ = reward rate per second (total rewards / duration)

#### 1 Abstract Value Distributor contract

The `AbstractValueDistributor` contract defines the core logic for distributing value among users based on their shares. This contract can be used as a base contract for implementing various distribution mechanisms, such as token staking, profit sharing, or dividend distribution.

It includes the following public functions:

<table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><code>totalShares</code></td><td>Provides the total number of all the shares added to the contract</td></tr><tr><td><code>cumulativeSum</code></td><td>Provides the current cumulative sum of value that has been distributed</td></tr><tr><td><code>updatedAt</code></td><td>Provides the timestamp of the last update</td></tr><tr><td><code>userDistribution</code></td><td>Provides the distribution details for a specific user, including the user's shares, cumulative sum and value owed</td></tr><tr><td><code>getOwedValue</code></td><td>Provides the amount of value owed to a specific user at the current time</td></tr></tbody></table>

There are also key internal functions for the shares and value manipulations:

<table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><code>_addShares</code></td><td>Adds shares to a user's distribution</td></tr><tr><td><code>_removeShares</code></td><td>Removes shares from a user's distribution</td></tr><tr><td><code>_distributeValue</code></td><td>Distributes value to a specific user</td></tr></tbody></table>

The contract includes `_afterAddShares`, `_afterRemoveShares` and `_afterDistributeValue` hooks for performing any required additional logic, such as transferring tokens, when shares are added or removed, or when value is distributed.

The core function affecting the distribution calculation is `_getValueToDistribute`. It returns the value to be distributed for a given period. It will usually be required to override this function to provide custom distribution mechanics in the inherited contracts.

#### 2 Abstract Staking contract

The `AbstractStaking` contract inherits from the Abstract Value Distributor contract and adds user-oriented functionality for staking tokens and earning rewards. It allows setting ERC20 tokens as the shares token and the rewards token (which cannot be further changed), as well as setting the rate and the staking start time during the contract initialization using the internal `__AbstractStaking_init` function. All of the initialized values are available using `sharesToken` , `rewardsToken` , `rate` and `stakingStartTime` functions.

When shares and rewards tokens **are the same**, users may accidentally withdraw other users' shares as a reward if the rewards token balance is improperly handled.

The rate and the staking start time can be changed with the help of the following internal functions:

<table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><code>_setRate</code></td><td>Sets the rate of rewards distribution per second</td></tr><tr><td><code>_setStakingStartTime</code></td><td>Sets the staking start time</td></tr></tbody></table>

A chosen rate determines the rate at which rewards are earned and distributed to stakers based on their shares.

Ensure that the `rate` value is set correctly to match the **decimal precision** of the rewards token to ensure accurate rewards distribution.

The use of the staking start time entity introduces the modifier `stakingStarted` that throws if someone tries to manipulate the shares or rewards but the staking has not started yet.

The key functions for staking and claiming rewards:

<table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><code>stake</code></td><td>Stakes the specified amount of tokens</td></tr><tr><td><code>unstake</code></td><td>Unstakes the specified amount of tokens</td></tr><tr><td><code>claim</code></td><td>Claims the specified amount of rewards</td></tr><tr><td><code>withdraw</code></td><td>Withdraws all the staked tokens together with the rewards if there are any. It also returns the amount of shares being withdrawn and the total value of rewards owed to a user</td></tr></tbody></table>

## Example

As long as our `AbstractStaking` contract is abstract you need to inherit it as the first step and initialize the needed values in any suitable way. Let's do it in the constructor.

```solidity
import "@solarity/solidity-lib/staking/AbstractStaking.sol";

contract Staking is AbstractStaking {    
    constructor(
        address sharesToken_,
        address rewardsToken_,
        uint256 rate_,
        uint256 stakingStartTime_
    ) {
        __AbstractStaking_init(
            sharesToken_, 
            rewardsToken_, 
            rate_, 
            stakingStartTime_
        );
    }
}
```

Remember that the rate value should match the decimal precision of the rewards token to ensure accurate rewards distribution.

Another important step is to override the `_getValueToDistribute` function to provide the custom distribution mechanic. Let's set the distribution to 1 token with `_rate` decimals per minute.

```solidity
function _getValueToDistribute(
    uint256 timeUpTo_,
    uint256 timeLastUpdate_
) internal view virtual override returns (uint256) {
    uint256 stakingStartTime_ = stakingStartTime();
    
    if (
        stakingStartTime_ < timeUpTo_ ||
        stakingStartTime_ < timeLastUpdate_
    ) {
        return 0;
    }

    return _rate * (
        (timeUpTo_ - _stakingStartTime) / 60 -
        (timeLastUpdate_ - _stakingStartTime) / 60
    );
}
```

Now you can interact with the contract, moving your tokens in any desired way and earning rewards.

```solidity
address sharesToken_ = 0x..;
address rewardsToken18_ = 0x..;

Staking staking_ = new Staking(
    sharesToken_, 
    rewardsToken18_, 
    1 ether, 
    block.timestamp
 );

// Stakes 1 token
staking_.stake(1 ether); 

// Reverts with "ValueDistributor: amount has to be more than 0"
staking_.stake(0); 

// Unstakes 0.1 token
staking_.unstake(0.1 ether);

// Reverts with "ValueDistributor: amount has to be more than 0"
staking_.unstake(0);

// Reverts with "ValueDistributor: insufficient amount"
staking_.unstake(1 ether);

// Claims 1 wei
staking_.claim(1 wei);

// Reverts with "ValueDistributor: amount has to be more than 0"
staking_.claim(0);

// Claims all the earned rewards
staking_.claim(staking.getRewardsEarned());

// Reverts with "ValueDistributor: insufficient amount"
staking_.claim(staking.getRewardsEarned() + 1);

// Unstakes all the user's staked tokens 
// Claims all the rewards earned by user
staking_.withdraw();
```
