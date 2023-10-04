# Verifier3Mock

## Contract Description


License: MIT

## 

```solidity
contract Verifier3Mock is BaseVerifierMock
```


## Functions info

### constructor

```solidity
constructor(
    bool verifyResult_,
    uint256[] memory expectedInputs_
) BaseVerifierMock(verifyResult_, expectedInputs_)
```


### verifyProof (0x11479fea)

```solidity
function verifyProof(
    uint256[2] memory,
    uint256[2][2] memory,
    uint256[2] memory,
    uint256[3] memory inputs_
) external view returns (bool)
```

