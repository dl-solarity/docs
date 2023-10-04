# DiamondERC20

## Contract Description


License: MIT

## 

```solidity
contract DiamondERC20 is DiamondERC20Storage
```

This is modified version of OpenZeppelin's ERC20 contract to be used as a Storage contract
by the Diamond Standard.
## Functions info

### transfer (0xa9059cbb)

```solidity
function transfer(
    address to_,
    uint256 amount_
) public virtual override returns (bool)
```

Moves `amount` tokens from the caller's account to `to`.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.
### approve (0x095ea7b3)

```solidity
function approve(
    address spender_,
    uint256 amount_
) public virtual override returns (bool)
```

Sets `amount` as the allowance of `spender` over the caller's tokens.

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

Moves `amount` tokens from `from` to `to` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.
### increaseAllowance (0x39509351)

```solidity
function increaseAllowance(
    address spender_,
    uint256 addedValue_
) public virtual returns (bool)
```

Atomically increases the allowance granted to `spender` by the caller.
### decreaseAllowance (0xa457c2d7)

```solidity
function decreaseAllowance(
    address spender_,
    uint256 subtractedValue_
) public virtual returns (bool)
```

Atomically decreases the allowance granted to `spender` by the caller.