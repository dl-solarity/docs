# OwnableDiamond

## Contract Description


License: MIT

## 

```solidity
contract OwnableDiamond is Diamond, OwnableDiamondStorage
```

The Ownable preset of Diamond proxy
## Functions info

### constructor

```solidity
constructor()
```


### transferOwnership (0xf2fde38b)

```solidity
function transferOwnership(address newOwner_) public onlyOwner
```


### addFacet (0x5547dad6)

```solidity
function addFacet(
    address facet_,
    bytes4[] memory selectors_
) public virtual onlyOwner
```


### removeFacet (0xcf380c86)

```solidity
function removeFacet(
    address facet_,
    bytes4[] memory selectors_
) public virtual onlyOwner
```


### updateFacet (0x218bc10a)

```solidity
function updateFacet(
    address facet_,
    bytes4[] memory fromSelectors_,
    bytes4[] memory toSelectors_
) public virtual onlyOwner
```

