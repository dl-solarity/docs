# ERC20Mock

## Contract Description


License: MIT

## 

```solidity
contract ERC20Mock is ERC20
```


## Functions info

### constructor

```solidity
constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimalPlaces_
) ERC20(name_, symbol_)
```


### mint (0x40c10f19)

```solidity
function mint(address to_, uint256 amount_) public
```


### burn (0x9dc29fac)

```solidity
function burn(address to_, uint256 amount_) public
```


### decimals (0x313ce567)

```solidity
function decimals() public view override returns (uint8)
```

Returns the number of decimals used to get its user representation.
For example, if `decimals` equals `2`, a balance of `505` tokens should
be displayed to a user as `5.05` (`505 / 10 ** 2`).

Tokens usually opt for a value of 18, imitating the relationship between
Ether and Wei. This is the default value returned by this function, unless
it's overridden.

NOTE: This information is only used for _display_ purposes: it in
no way affects any of the arithmetic of the contract, including
{IERC20-balanceOf} and {IERC20-transfer}.