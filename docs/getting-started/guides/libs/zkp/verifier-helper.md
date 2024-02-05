# 🔐 Verifier Helper

## Introduction

The Verifier Helper library is designed to simplify working with auto-generated verifier contracts from [snarkjs](https://github.com/iden3/snarkjs) to verify ZK proofs.

## Implementation

Verifier contracts have a function `verifyProof(uint256[2] a_, uint256[2][2] b_, uint256[2] c_, uint256[<number-of-public-inputs>] inputs_)` where the `inputs_` is a static array with a length that depends on the circom circuit for which the verifier contract was generated. If the developer needs to develop one contract that will interact with **verifiers** for different circom circuits, i.e. with different lengths of `inputs_` arrays in the `verifyProof` function, then it will be necessary to create many interfaces, which will clearly complicate the task. The `VerifierHelper` library will help to solve this problem.

The solution to this problem is quite simple, `staticcall` is used inside the `VerifierHelper` library, and the signature of the function to be called is generated dynamically. The length of the static array `inputs_` inside the `verifyProof` function is determined by the length of the dynamic array that was passed to the library function.

## Functions

To use the `VerifierHelper` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/zkp/snarkjs/VerifierHelper.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using VerifierHelper for address;
```

### verifyProof

```solidity
function verifyProof(
    address verifier_,
    uint256[] memory pubSignals_,
    ProofPoints memory proofPoints_
) internal view returns (bool);
```

```solidity
function verifyProof(
    address verifier_,
    uint256[] memory pubSignals_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_
) internal view returns (bool);
```

#### Description

This function verifies the ZK proof by calling the `verifyProof` function on the verifier's address without converting the dynamic array of public inputs into a static one. The function will revert if the passed verifier address does not have the required `verifyProof` function

#### Time complexity

Constant.

#### Example

```solidity
import "@solarity/solidity-lib/libs/zkp/snarkjs/VerifierHelper.sol";

contract ZKPValidator {
    using VerifierHelper for address;

    function verifyZKP(
        address verifier_,
        VerifierHelper.ProofPoints memory proofPoints_,
        uint256[] memory inputs_
    ) external view returns (bool) {
        return verifier_.verifyProof(inputs_, proofPoints_);
    }

    function verifyZKP(
        address verifier_,
        uint256[2] a_,
        uint256[2][2] b_,
        uint256[2] c_,
        uint256[] memory inputs_
    ) external view returns (bool) {
        return verifier_.verifyProof(inputs_, a_, b_, c_);
    }
}

ZKPValidator public validator;

validator = new ZKPValidator();

address verifierAddr_ = 0x0Ef6437FC3441A5936f347313D5043FE487a8B54;

uint256[2] a_ = [10, 20];
uint256[2][2] b_ = [[1, 2], [3, 4]];
uint256[2] c_ = [30, 40];

VerifierHelper.ProofPoints memory proofPoints_ = VerifierHelper.ProofPoints(
    a_,
    b_,
    c_
);

uint256[] inputs_ = new uint256[](3);
inputs_[0] = 100;
inputs_[1] = 200;
inputs_[2] = 300;

validator.verifyZKP(verifierAddr_, proofPoints_, inputs_); // true
validator.verifyZKP(verifierAddr_, a_, b_, c_, inputs_);   // true

validator.verifyZKP(address(validator_), a_, b_, c_, inputs_);
// Reverts with "VerifierHelper: failed to call verifyProof function"
```

### verifyProofSafe

```solidity
function verifyProofSafe(
    address verifier_,
    uint256[] memory pubSignals_,
    ProofPoints memory proofPoints_,
    uint256 pubSignalsCount_
) internal view returns (bool);
```

```solidity
function verifyProofSafe(
    address verifier_,
    uint256[] memory pubSignals_,
    uint256[2] memory a_,
    uint256[2][2] memory b_,
    uint256[2] memory c_,
    uint256 pubSignalsCount_
) internal view returns (bool);
```

#### Description

This function verifies the ZK proof by calling the `verifyProof` function on the verifier's address without converting the dynamic array of public inputs into a static one and checks that the length of the `pubSignals_` array is equal to the `pubSignalsCount_`. The function will revert if the passed verifier address does not have the required `verifyProof` function and the length of the `pubSignals_` array is not equal to the `pubSignalsCount_`

#### Time complexity

Constant.

#### Example

```solidity
import "@solarity/solidity-lib/libs/zkp/snarkjs/VerifierHelper.sol";

contract ZKPValidator {
    using VerifierHelper for address;

    function verifyZKPSafe(
        address verifier_,
        VerifierHelper.ProofPoints memory proofPoints_,
        uint256[] memory inputs_,
        uint256 pubSignalsCount_
    ) external view returns (bool) {
        return verifier_.verifyProofSafe(inputs_, proofPoints_, pubSignalsCount_);
    }

    function verifyZKPSafe(
        address verifier_,
        uint256[2] a_,
        uint256[2][2] b_,
        uint256[2] c_,
        uint256[] memory inputs_,
        uint256 pubSignalsCount_
    ) external view returns (bool) {
        return verifier_.verifyProofSafe(inputs_, a_, b_, c_, pubSignalsCount_);
    }
}

ZKPValidator public validator;

validator = new ZKPValidator();

address verifierAddr_ = 0x0Ef6437FC3441A5936f347313D5043FE487a8B54;

uint256[2] a_ = [10, 20];
uint256[2][2] b_ = [[1, 2], [3, 4]];
uint256[2] c_ = [30, 40];

VerifierHelper.ProofPoints memory proofPoints_ = VerifierHelper.ProofPoints(
    a_,
    b_,
    c_
);

uint256[] inputs_ = new uint256[](3);
inputs_[0] = 100;
inputs_[1] = 200;
inputs_[2] = 300;

validator.verifyZKPSafe(verifierAddr_, proofPoints_, inputs_, 3); // true
validator.verifyZKPSafe(verifierAddr_, a_, b_, c_, inputs_, 3);   // true

validator.verifyZKPSafe(verifierAddr_, proofPoints_, inputs_, 5);
// Reverts with: "VerifierHelper: invalid public signals count"

validator.verifyZKPSafe(verifierAddr_, a_, b_, c_, inputs_, 5);
// Reverts with: "VerifierHelper: invalid public signals count"

validator.verifyZKPSafe(address(validator_), a_, b_, c_, inputs_, 3);
// Reverts with: "VerifierHelper: failed to call verifyProof function"
```
