# DiamondStorage

## Abstract Contract Description


License: MIT

## 

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


## Constants info

### DIAMOND_STORAGE_SLOT (0xe828c51f)

```solidity
bytes32 constant DIAMOND_STORAGE_SLOT = keccak256("diamond.standard.diamond.storage")
```

The struct slot where the storage is
## Functions info

### getFacets (0x662ea47d)

```solidity
function getFacets() public view returns (address[] memory facets_)
```

The function to get all the facets of this diamond


Return values:

| Name    | Type      | Description                    |
| :------ | :-------- | :----------------------------- |
| facets_ | address[] | the array of facets' addresses |

### getFacetSelectors (0x8ea0b248)

```solidity
function getFacetSelectors(
    address facet_
) public view returns (bytes4[] memory selectors_)
```

The function to get all the selectors assigned to the facet


Parameters:

| Name   | Type    | Description                             |
| :----- | :------ | :-------------------------------------- |
| facet_ | address | the facet to get assigned selectors of  |


Return values:

| Name       | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| selectors_ | bytes4[] | the array of assigned selectors |

### getFacetBySelector (0xfe00955e)

```solidity
function getFacetBySelector(
    bytes4 selector_
) public view returns (address facet_)
```

The function to get associated facet by the selector


Parameters:

| Name      | Type   | Description   |
| :-------- | :----- | :------------ |
| selector_ | bytes4 | the selector  |


Return values:

| Name   | Type    | Description                  |
| :----- | :------ | :--------------------------- |
| facet_ | address | the associated facet address |
