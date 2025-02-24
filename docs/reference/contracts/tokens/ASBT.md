# ASBT

## Overview

#### License: MIT

```solidity
abstract contract ASBT is ISBT, ERC165Upgradeable
```

The SBT module

An abstract lightweight implementation of a Soul Bound Token. Does not comply with ERC721 standard.
Approve and transfer functionality has been removed as it is not needed in SBTs.

The contract is compatible with Metamask and Opensea.
## Errors info

### ReceiverIsZeroAddress

```solidity
error ReceiverIsZeroAddress()
```


### TokenAlreadyExists

```solidity
error TokenAlreadyExists(uint256 tokenId)
```


### TokenDoesNotExist

```solidity
error TokenDoesNotExist(uint256 tokenId)
```


## Functions info

### name (0x06fdde03)

```solidity
function name() public view virtual override returns (string memory)
```

The function to return the name of the contract


Return values:

| Name | Type   | Description              |
| :--- | :----- | :----------------------- |
| [0]  | string | the name of the contract |

### symbol (0x95d89b41)

```solidity
function symbol() public view virtual override returns (string memory)
```

The function to return the symbol of the contract


Return values:

| Name | Type   | Description                |
| :--- | :----- | :------------------------- |
| [0]  | string | the symbol of the contract |

### tokenExists (0x00923f9e)

```solidity
function tokenExists(
    uint256 tokenId_
) public view virtual override returns (bool)
```

The function to check the existence of the token


Parameters:

| Name     | Type    | Description         |
| :------- | :------ | :------------------ |
| tokenId_ | uint256 | the token to check  |


Return values:

| Name | Type | Description                                |
| :--- | :--- | :----------------------------------------- |
| [0]  | bool | true if `tokenId_` exists, false otherwise |

### balanceOf (0x70a08231)

```solidity
function balanceOf(
    address owner_
) public view virtual override returns (uint256)
```

The function to get the balance of the user


Parameters:

| Name   | Type    | Description                     |
| :----- | :------ | :------------------------------ |
| owner_ | address | the user to get the balance of  |


Return values:

| Name | Type    | Description        |
| :--- | :------ | :----------------- |
| [0]  | uint256 | the user's balance |

### tokenOf (0xa3dabb02)

```solidity
function tokenOf(
    address owner_,
    uint256 index_
) public view virtual override returns (uint256)
```

The function to get a user's token by its ordinal id


Parameters:

| Name   | Type    | Description                              |
| :----- | :------ | :--------------------------------------- |
| owner_ | address | the user to get the token of             |
| index_ | uint256 | the id of the token in the user's array  |


Return values:

| Name | Type    | Description             |
| :--- | :------ | :---------------------- |
| [0]  | uint256 | the token the user owns |

### tokensOf (0x5a3f2672)

```solidity
function tokensOf(
    address owner_
) public view virtual override returns (uint256[] memory)
```

The function to get ALL the tokens of a user. Be careful, O(n) complexity


Parameters:

| Name   | Type    | Description                    |
| :----- | :------ | :----------------------------- |
| owner_ | address | the user to get the tokens of  |


Return values:

| Name | Type      | Description                       |
| :--- | :-------- | :-------------------------------- |
| [0]  | uint256[] | the array of tokens the user owns |

### ownerOf (0x6352211e)

```solidity
function ownerOf(
    uint256 tokenId_
) public view virtual override returns (address)
```

The function to get the owner of a token


Parameters:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| tokenId_ | uint256 | the token to get the owner of  |


Return values:

| Name | Type    | Description                                                 |
| :--- | :------ | :---------------------------------------------------------- |
| [0]  | address | address of an owner or `address(0)` if token does not exist |

### baseURI (0x6c0360eb)

```solidity
function baseURI() public view virtual override returns (string memory)
```

The function to get the base URI of all the tokens


Return values:

| Name | Type   | Description  |
| :--- | :----- | :----------- |
| [0]  | string | the base URI |

### tokenURI (0xc87b56dd)

```solidity
function tokenURI(
    uint256 tokenId_
) public view virtual override returns (string memory)
```

The function to get the token URI.

- If individual token URI is set, it gets returned.
- Otherwise if base URI is set, the concatenation of base URI and token URI gets returned.
- Otherwise `""` gets returned



Parameters:

| Name     | Type    | Description                  |
| :------- | :------ | :--------------------------- |
| tokenId_ | uint256 | the token to get the URI of  |


Return values:

| Name | Type   | Description          |
| :--- | :----- | :------------------- |
| [0]  | string | the URI of the token |

### supportsInterface (0x01ffc9a7)

```solidity
function supportsInterface(
    bytes4 interfaceId_
) public view virtual override returns (bool)
```

Returns true if this contract implements the interface defined by `interfaceId`


Parameters:

| Name         | Type   | Description                |
| :----------- | :----- | :------------------------- |
| interfaceId_ | bytes4 | the interface ID to check  |


Return values:

| Name | Type | Description                                                   |
| :--- | :--- | :------------------------------------------------------------ |
| [0]  | bool | true if the passed interface ID is supported, otherwise false |
