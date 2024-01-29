# DiamondStorage

## Overview

#### License: MIT

```solidity
abstract contract DiamondStorage
```

The Diamond standard module

This is the storage contract for the diamond proxy
## Structs info

### DStorage

```solidity
struct DStorage {
	mapping(bytes4 => address) selectorToFacet;
	mapping(address => EnumerableSet.Bytes32Set) facetToSelectors;
	EnumerableSet.AddressSet facets;
}
```

The storage of the Diamond proxy
### FacetInfo

```solidity
struct FacetInfo {
	address facetAddress;
	bytes4[] functionSelectors;
}
```


## Constants info

### DIAMOND_STORAGE_SLOT (0xe828c51f)

```solidity
bytes32 constant DIAMOND_STORAGE_SLOT = keccak256("diamond.standard.diamond.storage")
```

The struct slot where the storage is
## Functions info

### facets (0x7a0ed627)

```solidity
function facets()
    public
    view
    returns (DiamondStorage.FacetInfo[] memory facets_)
```

The function to get all the facets and their selectors


Return values:

| Name    | Type                              | Description            |
| :------ | :-------------------------------- | :--------------------- |
| facets_ | struct DiamondStorage.FacetInfo[] | the array of FacetInfo |

### facetFunctionSelectors (0xadfca15e)

```solidity
function facetFunctionSelectors(
    address facet_
) public view returns (bytes4[] memory selectors_)
```

The function to get all the selectors assigned to the facet


Parameters:

| Name   | Type    | Description                              |
| :----- | :------ | :--------------------------------------- |
| facet_ | address | the facet to get assigned selectors of   |


Return values:

| Name       | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| selectors_ | bytes4[] | the array of assigned selectors |

### facetAddresses (0x52ef6b2c)

```solidity
function facetAddresses() public view returns (address[] memory facets_)
```

The function to get all the facets of this diamond


Return values:

| Name    | Type      | Description                    |
| :------ | :-------- | :----------------------------- |
| facets_ | address[] | the array of facets' addresses |

### facetAddress (0xcdffacc6)

```solidity
function facetAddress(bytes4 selector_) public view returns (address facet_)
```

The function to get associated facet by the selector


Parameters:

| Name      | Type   | Description    |
| :-------- | :----- | :------------- |
| selector_ | bytes4 | the selector   |


Return values:

| Name   | Type    | Description                  |
| :----- | :------ | :--------------------------- |
| facet_ | address | the associated facet address |
