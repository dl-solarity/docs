# 🔒 Plonk Verifier Helper

## Introduction

The Verifier Helper library is designed to simplify working with auto-generated verifier contracts from [hardhat-zkit](https://github.com/dl-solarity/hardhat-zkit) to verify Plonk ZK proofs.

## Implementation

Plonk verifier contracts usually have a function `verifyProof(uint256[24] proofData_, uint256[<number-of-public-inputs>] inputs_)` where the `inputs_` is a static array of public inputs the circuit accepts. If a developer needs to interact with more than one circuit verifier, it will be necessary to create many different Solidity interfaces, which is not particularly user-friendly. The `PlonkVerifierHelper` library solves this problem.

Under the hood, the `PlonkVerifierHelper` library wraps the verifier `staticcall` by constructing public signals dynamically. The length of the static array `inputs_` inside the `verifyProof` function is determined by the length of the dynamic array that was passed to the library function.

## Functions

To use the `PlonkVerifierHelper` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/zkp/PlonkVerifierHelper.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using PlonkVerifierHelper for address;
```

### verifyProof

```solidity
function verifyProof(
    address verifier_,
    PlonkProof memory plonkProof_
) internal view returns (bool);
```

```solidity
function verifyProof(
    address verifier_,
    ProofPoints memory proofPoints_,
    uint256[] memory pubSignals_
) internal view returns (bool);
```

```solidity
function verifyProof(
    address verifier_,
    uint256[24] memory proofData_,
    uint256[] memory pubSignals_
) internal view returns (bool);
```

#### Description

These functions verify the ZK proof by calling the `verifyProof` function on the verifier's address by converting the dynamic array of public inputs into a static one. The functions will revert if the passed verifier address does not have the required `verifyProof` method.

#### Example

```solidity
import "@solarity/solidity-lib/libs/zkp/PlonkVerifierHelper.sol";

contract ZKPValidator {
    using PlonkVerifierHelper for address;

    function verifyProof(
        address verifier_,
        PlonkVerifierHelper.PlonkProof memory plonkProof_
    ) external view returns (bool) {
        return verifier_.verifyProof(plonkProof_);
    }

    function verifyZKP(
        address verifier_,
        PlonkVerifierHelper.ProofPoints memory proofPoints_,
        uint256[] memory inputs_
    ) external view returns (bool) {
        return verifier_.verifyProof(proofPoints_, inputs_);
    }

    function verifyZKP(
        address verifier_,
        uint256[2] a_,
        uint256[2][2] b_,
        uint256[2] c_,
        uint256[] memory inputs_
    ) external view returns (bool) {
        return verifier_.verifyProof(a_, b_, c_, inputs_);
    }
}

ZKPValidator public validator;

validator = new ZKPValidator();

address verifierAddr_ = 0x0Ef6437FC3441A5936f347313D5043FE487a8B54;

uint256[24] proofData_ = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

PlonkVerifierHelper.ProofPoints memory proofPoints_ = PlonkVerifierHelper.ProofPoints(proofData_);

uint256[] inputs_ = new uint256[](3);

inputs_[0] = 100;
inputs_[1] = 200;
inputs_[2] = 300;

PlonkVerifierHelper.PlonkProof memory proof_ = PlonkVerifierHelper.PlonkProof(
    proofPoints_,
    inputs_
);

validator.verifyZKP(verifierAddr_, proof_); // true
validator.verifyZKP(verifierAddr_, proofPoints_, inputs_); // true
validator.verifyZKP(verifierAddr_, proofData_, inputs_);   // true

validator.verifyZKP(address(validator_), proofData_, inputs_);
// Reverts with "PlonkVerifierHelper: failed to call verifyProof function"
```

### verifyProofSafe

```solidity
 function verifyProofSafe(
    address verifier_,
    PlonkProof memory plonkProof_,
    uint256 pubSignalsCount_
) internal view returns (bool);
```

```solidity
function verifyProofSafe(
    address verifier_,
    ProofPoints memory proofPoints_,
    uint256[] memory pubSignals_,
    uint256 pubSignalsCount_
) internal view returns (bool);
```

```solidity
function verifyProofSafe(
    address verifier_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_,
    uint256[] memory pubSignals_,
    uint256 pubSignalsCount_
) internal view returns (bool);
```

#### Description

These functions work in a similar way to the ones above. However, there is one extra layer of protection: they will revert if the `pubSignals_` array length is not equal to the `pubSignalsCount_`.
