# Verifier2Mock

## Contract Description


License: MIT

## 

```solidity
contract Verifier2Mock is BaseVerifierMock
```


## Functions info

### constructor

```solidity
constructor(
    bool verifyResult_,
    uint256[] memory expectedInputs_
) BaseVerifierMock(verifyResult_, expectedInputs_)
```


### verifyProof (0xf5c9d69e)

```solidity
function verifyProof(
    uint256[2] memory,
    uint256[2][2] memory,
    uint256[2] memory,
    uint256[2] memory inputs_
) external view returns (bool)
```

