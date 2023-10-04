# MerkleWhitelistedMock

## Contract Description


License: MIT

## 

```solidity
contract MerkleWhitelistedMock is MerkleWhitelisted
```


## Events info

### WhitelistedUser

```solidity
event WhitelistedUser()
```


### WhitelistedData

```solidity
event WhitelistedData()
```


## Functions info

### onlyWhitelistedMethod (0x11b895d2)

```solidity
function onlyWhitelistedMethod(
    uint256 amount_,
    bytes32[] calldata merkleProof_
) external onlyWhitelisted(_encode(amount_), merkleProof_)
```


### onlyWhitelistedUserMethod (0x605a2e83)

```solidity
function onlyWhitelistedUserMethod(
    bytes32[] calldata merkleProof_
) external onlyWhitelistedUser(msg.sender, merkleProof_)
```


### setMerkleRoot (0x7cb64759)

```solidity
function setMerkleRoot(bytes32 merkleRoot_) external
```

