# OwnableDiamondStorage

## Abstract Contract Description


License: MIT

## 

```solidity
abstract contract OwnableDiamondStorage
```

The storage contract of Ownable Diamond preset
## Structs info

### ODStorage

```solidity
struct ODStorage {
	address owner;
}
```


## Constants info

### OWNABLE_DIAMOND_STORAGE_SLOT (0xe3e077ad)

```solidity
bytes32 constant OWNABLE_DIAMOND_STORAGE_SLOT = keccak256("diamond.standard.ownablediamond.storage")
```


## Modifiers info

### onlyOwner

```solidity
modifier onlyOwner()
```


## Functions info

### owner (0x8da5cb5b)

```solidity
function owner() public view returns (address)
```

