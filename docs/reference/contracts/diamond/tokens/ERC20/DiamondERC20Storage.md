# DiamondERC20Storage

## Overview

#### License: MIT

```solidity
abstract contract DiamondERC20Storage is InitializableStorage, IERC20, IERC20Metadata
```

The Diamond standard module

This is an ERC20 token Storage contract with Diamond Standard support
## Structs info

### DERC20Storage

```solidity
struct DERC20Storage {
	string name;
	string symbol;
	uint256 totalSupply;
	mapping(address => uint256) balances;
	mapping(address => mapping(address => uint256)) allowances;
}
```


## Constants info

### DIAMOND_ERC20_STORAGE_SLOT (0x6812cb2a)

```solidity
bytes32 constant DIAMOND_ERC20_STORAGE_SLOT = keccak256("diamond.standard.diamond.erc20.storage")
```


## Functions info

### name (0x06fdde03)

```solidity
function name() public view virtual override returns (string memory)
```

The function to get the name of the token.


Return values:

| Name | Type   | Description            |
| :--- | :----- | :--------------------- |
| [0]  | string | The name of the token. |

### symbol (0x95d89b41)

```solidity
function symbol() public view virtual override returns (string memory)
```

The function to get the symbol of the token.


Return values:

| Name | Type   | Description              |
| :--- | :----- | :----------------------- |
| [0]  | string | The symbol of the token. |

### decimals (0x313ce567)

```solidity
function decimals() public view virtual override returns (uint8)
```

The function to get the number of decimals used for user representation.


Return values:

| Name | Type  | Description             |
| :--- | :---- | :---------------------- |
| [0]  | uint8 | The number of decimals. |

### totalSupply (0x18160ddd)

```solidity
function totalSupply() public view virtual override returns (uint256)
```

Returns the amount of tokens in existence.
### balanceOf (0x70a08231)

```solidity
function balanceOf(
    address account_
) public view virtual override returns (uint256)
```

Returns the amount of tokens owned by `account`.
### allowance (0xdd62ed3e)

```solidity
function allowance(
    address owner_,
    address spender_
) public view virtual override returns (uint256)
```

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through {transferFrom}. This is
zero by default.

This value changes when {approve} or {transferFrom} are called.