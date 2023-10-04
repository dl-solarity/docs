# DummyStorage

## Contract Description


License: MIT

## 

```solidity
contract DummyStorage
```


## Structs info

### DummyFacetStorage

```solidity
struct DummyFacetStorage {
	string dummyString;
}
```


## Constants info

### DUMMY_STORAGE_SLOT (0xdd91f8d0)

```solidity
bytes32 constant DUMMY_STORAGE_SLOT = keccak256("diamond.standard.dummyfacet.storage")
```


## Functions info

### getDummyString (0x866ee10f)

```solidity
function getDummyString() external view returns (string memory dummyString_)
```

