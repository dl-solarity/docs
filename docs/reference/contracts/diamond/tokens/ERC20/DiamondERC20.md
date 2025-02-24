# DiamondERC20

## Overview

#### License: MIT

```solidity
contract DiamondERC20 is ADiamondERC20Storage
```

The Diamond standard module

This is modified version of OpenZeppelin's ERC20 contract to be used as a Storage contract
by the Diamond Standard.
## Errors info

### ApproverIsZeroAddress

```solidity
error ApproverIsZeroAddress()
```


### InsufficientAllowance

```solidity
error InsufficientAllowance(address spender, uint256 allowance, uint256 needed)
```


### InsufficientBalance

```solidity
error InsufficientBalance(address sender, uint256 balance, uint256 needed)
```


### ReceiverIsZeroAddress

```solidity
error ReceiverIsZeroAddress()
```


### SenderIsZeroAddress

```solidity
error SenderIsZeroAddress()
```


### SpenderIsZeroAddress

```solidity
error SpenderIsZeroAddress()
```


## Functions info

### transfer (0xa9059cbb)

```solidity
function transfer(
    address to_,
    uint256 amount_
) public virtual override returns (bool)
```

Moves a `value` amount of tokens from the caller's account to `to`.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.
### approve (0x095ea7b3)

```solidity
function approve(
    address spender_,
    uint256 amount_
) public virtual override returns (bool)
```

Sets a `value` amount of tokens as the allowance of `spender` over the
caller's tokens.

Returns a boolean value indicating whether the operation succeeded.

IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Emits an {Approval} event.
### transferFrom (0x23b872dd)

```solidity
function transferFrom(
    address from_,
    address to_,
    uint256 amount_
) public virtual override returns (bool)
```

Moves a `value` amount of tokens from `from` to `to` using the
allowance mechanism. `value` is then deducted from the caller's
allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.