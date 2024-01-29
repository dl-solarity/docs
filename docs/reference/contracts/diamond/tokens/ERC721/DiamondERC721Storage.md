# DiamondERC721Storage

## Overview

#### License: MIT

```solidity
abstract contract DiamondERC721Storage is InitializableStorage, DiamondERC165, IERC721, IERC721Metadata
```

The Diamond standard module

This is an ERC721 token Storage contract with Diamond Standard support
## Structs info

### DERC721Storage

```solidity
struct DERC721Storage {
	string name;
	string symbol;
	uint256[] allTokens;
	mapping(uint256 => address) owners;
	mapping(address => uint256) balances;
	mapping(uint256 => address) tokenApprovals;
	mapping(uint256 => uint256) allTokensIndex;
	mapping(uint256 => uint256) ownedTokensIndex;
	mapping(address => mapping(address => bool)) operatorApprovals;
	mapping(address => mapping(uint256 => uint256)) ownedTokens;
}
```


## Constants info

### DIAMOND_ERC721_STORAGE_SLOT (0x596d38a4)

```solidity
bytes32 constant DIAMOND_ERC721_STORAGE_SLOT = keccak256("diamond.standard.diamond.erc721.storage")
```


## Functions info

### supportsInterface (0x01ffc9a7)

```solidity
function supportsInterface(
    bytes4 interfaceId_
) public view virtual override returns (bool)
```

Returns true if this contract implements the interface defined by
`interfaceId`. See the corresponding
https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
to learn more about how these ids are created.

This function call must use less than 30 000 gas.
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

### tokenURI (0xc87b56dd)

```solidity
function tokenURI(
    uint256 tokenId_
) public view virtual override returns (string memory)
```

The function to get the Uniform Resource Identifier (URI) for `tokenId` token.


Return values:

| Name | Type   | Description           |
| :--- | :----- | :-------------------- |
| [0]  | string | The URI of the token. |

### totalSupply (0x18160ddd)

```solidity
function totalSupply() public view virtual returns (uint256)
```

The function to get total amount of minted tokens.


Return values:

| Name | Type    | Description                  |
| :--- | :------ | :--------------------------- |
| [0]  | uint256 | The amount of minted tokens. |

### balanceOf (0x70a08231)

```solidity
function balanceOf(
    address owner_
) public view virtual override returns (uint256)
```

Returns the number of tokens in ``owner``'s account.
### tokenOfOwnerByIndex (0x2f745c59)

```solidity
function tokenOfOwnerByIndex(
    address owner_,
    uint256 index_
) public view virtual returns (uint256)
```

This function allows you to retrieve the NFT token ID for a specific owner at a specified index.
### tokenByIndex (0x4f6ccce7)

```solidity
function tokenByIndex(uint256 index_) public view virtual returns (uint256)
```

This function allows you to retrieve the NFT token ID at a given `index` of all the tokens stored by the contract.
### ownerOf (0x6352211e)

```solidity
function ownerOf(
    uint256 tokenId_
) public view virtual override returns (address)
```

Returns the owner of the `tokenId` token.

Requirements:

- `tokenId` must exist.
### getApproved (0x081812fc)

```solidity
function getApproved(
    uint256 tokenId_
) public view virtual override returns (address)
```

Returns the account approved for `tokenId` token.

Requirements:

- `tokenId` must exist.
### isApprovedForAll (0xe985e9c5)

```solidity
function isApprovedForAll(
    address owner_,
    address operator_
) public view virtual override returns (bool)
```

Returns if the `operator` is allowed to manage all of the assets of `owner`.

See {setApprovalForAll}