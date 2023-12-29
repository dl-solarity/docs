# DiamondERC20Mock

## Contract Description


License: MIT

## 

```solidity
contract DiamondERC20Mock is DiamondERC20
```


## Functions info

### constructor

```solidity
constructor()
```


### __DiamondERC20Direct_init (0x7a8cc74a)

```solidity
function __DiamondERC20Direct_init(
    string memory name_,
    string memory symbol_
) external
```


### __DiamondERC20Mock_init (0x147ce058)

```solidity
function __DiamondERC20Mock_init(
    string memory name_,
    string memory symbol_
) external initializer(DIAMOND_ERC20_STORAGE_SLOT)
```


### mint (0x40c10f19)

```solidity
function mint(address to_, uint256 amount_) external
```


### burn (0x9dc29fac)

```solidity
function burn(address from_, uint256 amount_) external
```


### transfer (0xbeabacc8)

```solidity
function transfer(address from_, address to_, uint256 amount_) external
```


### approve (0xe1f21c67)

```solidity
function approve(address owner_, address spender_, uint256 amount_) external
```


### disableInitializers (0x31f44900)

```solidity
function disableInitializers() external
```

