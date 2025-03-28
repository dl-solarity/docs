# 🔐 Groth16 Verifier Helper

## Introduction

The Verifier Helper library is designed to simplify working with auto-generated verifier contracts from [hardhat-zkit](https://github.com/dl-solarity/hardhat-zkit) to verify Groth16 ZK proofs.

## Implementation

Groth16 verifier contracts usually have a function `verifyProof(uint256[2] a_, uint256[2][2] b_, uint256[2] c_, uint256[<number-of-public-inputs>] inputs_)` where the `inputs_` is a static array of public inputs the circuit accepts. If a developer needs to interact with more than one circuit verifier, it will be necessary to create many different Solidity interfaces, which is not particularly user-friendly. The `Groth16VerifierHelper` library solves this problem.

Under the hood, the `Groth16VerifierHelper` library wraps the verifier `staticcall` by constructing public signals dynamically. The length of the static array `inputs_` inside the `verifyProof` function is determined by the length of the dynamic array that was passed to the library function.

## Functions

To use the `Groth16VerifierHelper` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/zkp/Groth16VerifierHelper.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using Groth16VerifierHelper for address;
```

### verifyProof

```solidity
function verifyProof(
    address verifier_,
    Groth16Proof memory groth16Proof_
) internal view returns (bool);
```

```solidity
function verifyProof(
    address verifier_,
    ProofPoints memory proofPoints_
    uint256[] memory pubSignals_,
) internal view returns (bool);
```

```solidity
function verifyProof(
    address verifier_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_
    uint256[] memory pubSignals_,
) internal view returns (bool);
```

#### Description

These functions verify the ZK proof by calling the `verifyProof` function on the verifier's address by converting the dynamic array of public inputs into a static one. The functions will revert if the passed verifier address does not have the required `verifyProof` method.

#### Example

```solidity
import "@solarity/solidity-lib/libs/zkp/Groth16VerifierHelper.sol";

contract ZKPValidator {
    using Groth16VerifierHelper for address;

    function verifyProof(
        address verifier_,
        Groth16Proof memory groth16Proof_
    ) external view returns (bool) {
        return verifier_.verifyProof(groth16Proof_);
    }

    function verifyZKP(
        address verifier_,
        Groth16VerifierHelper.ProofPoints memory proofPoints_,
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

uint256[2] a_ = [10, 20];
uint256[2][2] b_ = [[1, 2], [3, 4]];
uint256[2] c_ = [30, 40];

Groth16VerifierHelper.ProofPoints memory proofPoints_ = Groth16VerifierHelper.ProofPoints(
    a_,
    b_,
    c_
);

uint256[] inputs_ = new uint256[](3);

inputs_[0] = 100;
inputs_[1] = 200;
inputs_[2] = 300;

Groth16VerifierHelper.Groth16Proof memory proof_ = Groth16VerifierHelper.Groth16Proof(
    proofPoints_,
    inputs_
);

validator.verifyZKP(verifierAddr_, proof_); // true
validator.verifyZKP(verifierAddr_, proofPoints_, inputs_); // true
validator.verifyZKP(verifierAddr_, a_, b_, c_, inputs_);   // true

validator.verifyZKP(address(validator_), a_, b_, c_, inputs_);
// Reverts with "Groth16VerifierHelper: failed to call verifyProof function"
```

### verifyProofSafe

```solidity
 function verifyProofSafe(
    address verifier_,
    Groth16Proof memory groth16Proof_,
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
