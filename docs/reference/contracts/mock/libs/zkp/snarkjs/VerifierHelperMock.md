# VerifierHelperMock

## Contract Description


License: MIT

## 

```solidity
contract VerifierHelperMock
```


## Functions info

### verifyProof (0xade96663)

```solidity
function verifyProof(
    address verifier_,
    uint256[] memory pubSignals_,
    VerifierHelper.ProofPoints memory proofPoints_
) external view returns (bool)
```


### verifyProof (0x4ef873ae)

```solidity
function verifyProof(
    address verifier_,
    uint256[] memory pubSignals_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_
) external view returns (bool)
```


### verifyProofSafe (0xfaec52e4)

```solidity
function verifyProofSafe(
    address verifier_,
    uint256[] memory pubSignals_,
    VerifierHelper.ProofPoints memory proofPoints_,
    uint256 pubSignalsCount_
) external view returns (bool)
```


### verifyProofSafe (0xcc017d43)

```solidity
function verifyProofSafe(
    address verifier_,
    uint256[] memory pubSignals_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_,
    uint256 pubSignalsCount_
) external view returns (bool)
```

