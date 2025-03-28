# DiamondERC165

## Overview

#### License: MIT

```solidity
contract DiamondERC165 is ERC165
```

The Diamond standard module

DiamondERC165 - Contract implementing ERC165 interface for Diamonds
## Functions info

### supportsInterface (0x01ffc9a7)

```solidity
function supportsInterface(
    bytes4 interfaceId_
) public view virtual override returns (bool)
```

The function to check whether the Diamond supports the interface


Parameters:

| Name         | Type   | Description             |
| :----------- | :----- | :---------------------- |
| interfaceId_ | bytes4 | the interface to check  |


Return values:

| Name | Type | Description                                         |
| :--- | :--- | :-------------------------------------------------- |
| [0]  | bool | true if the interface is supported, false otherwise |
