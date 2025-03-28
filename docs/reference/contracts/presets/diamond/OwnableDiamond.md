# OwnableDiamond

## Overview

#### License: MIT

```solidity
contract OwnableDiamond is Diamond, OwnableUpgradeable
```

The Diamond standard module

The Ownable preset of Diamond proxy
## Functions info

### diamondCut (0xe57e69c6)

```solidity
function diamondCut(Diamond.Facet[] memory facets_) public onlyOwner
```

The function to manipulate the Diamond contract, as defined in [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535)


Parameters:

| Name    | Type                   | Description                                             |
| :------ | :--------------------- | :------------------------------------------------------ |
| facets_ | struct Diamond.Facet[] | the array of actions to be executed against the Diamond |

### diamondCut (0x1f931c1c)

```solidity
function diamondCut(
    Diamond.Facet[] memory facets_,
    address init_,
    bytes memory initData_
) public onlyOwner
```

The function to manipulate the Diamond contract, as defined in [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535)


Parameters:

| Name      | Type                   | Description                                                     |
| :-------- | :--------------------- | :-------------------------------------------------------------- |
| facets_   | struct Diamond.Facet[] | the array of actions to be executed against the Diamond         |
| init_     | address                | the address of the init contract to be called via delegatecall  |
| initData_ | bytes                  | the data the init address will be called with                   |
