# Diamond

## Overview

#### License: MIT

```solidity
contract Diamond is ADiamondStorage
```

The Diamond standard module

This is a custom, yet fully compatible, implementation of a [Diamond Proxy standard](https://eips.ethereum.org/EIPS/eip-2535).

This contract acts as a highest level contract of that standard. Contrary to the EIP-2535, storage
is defined in a separate contract that the facets have to inherit from, not use an internal library.

As a convention, view and pure function are defined in the storage contract while function that modify state, in
the facet itself.

If you wish to add a receive() function, attach a "0x00000000" selector to a facet that has such a function.
## Enums info

### FacetAction

```solidity
enum FacetAction {
	 Add,
	 Replace,
	 Remove
}
```


## Structs info

### Facet

```solidity
struct Facet {
	address facetAddress;
	Diamond.FacetAction action;
	bytes4[] functionSelectors;
}
```


## Events info

### DiamondCut

```solidity
event DiamondCut(Diamond.Facet[] facets, address initFacet, bytes initData)
```


## Errors info

### FacetIsZeroAddress

```solidity
error FacetIsZeroAddress()
```


### InitializationReverted

```solidity
error InitializationReverted(address initFacet, bytes initData)
```


### NoSelectorsProvided

```solidity
error NoSelectorsProvided()
```


### NoFacetForSelector

```solidity
error NoFacetForSelector(bytes4 selector)
```


### SelectorAlreadyAdded

```solidity
error SelectorAlreadyAdded(address faucet, bytes4 selector)
```


### SelectorFromAnotherFacet

```solidity
error SelectorFromAnotherFacet(bytes4 selector)
```


### SelectorIsAlreadyInThisFaucet

```solidity
error SelectorIsAlreadyInThisFaucet(bytes4 selector, address facet)
```


### SelectorNotRegistered

```solidity
error SelectorNotRegistered(bytes4 selector)
```


## Functions info

### fallback

```solidity
fallback() external payable virtual
```

The payable fallback function that delegatecall's the facet with associated selector