# Schnorr256

## Overview

#### License: MIT

```solidity
library Schnorr256
```

Cryptography module

This library provides functionality for Schnorr signature verification over any 256-bit curve,
together with secret extraction from a standard/adaptor Schnorr signature pair.
## Errors info

### LengthIsNot64

```solidity
error LengthIsNot64()
```


### LengthIsNot96

```solidity
error LengthIsNot96()
```


### InvalidSignatureScalar

```solidity
error InvalidSignatureScalar()
```


## Functions info

### verify

```solidity
function verify(
    EC256.Curve memory ec,
    bytes32 hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool)
```

The function to verify the Schnorr signature.


Parameters:

| Name           | Type               | Description                                                        |
| :------------- | :----------------- | :----------------------------------------------------------------- |
| ec             | struct EC256.Curve | the 256-bit curve parameters.                                      |
| hashedMessage_ | bytes32            | the already hashed message to be verified.                         |
| signature_     | bytes              | the Schnorr signature. Equals to `bytes(R) + bytes(e)`.            |
| pubKey_        | bytes              | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.  |


Return values:

| Name | Type | Description                                      |
| :--- | :--- | :----------------------------------------------- |
| [0]  | bool | True if the signature is valid, false otherwise. |

### adaptorVerify

```solidity
function adaptorVerify(
    EC256.Curve memory ec,
    bytes32 hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_,
    EC256.APoint memory t_
) internal view returns (bool)
```

The function to verify the adaptor Schnorr signature.

The adaptor Schnorr signature is expected to be computed as:

c = H(P || (R + T) || m)
e' = (r + c * privKey) mod n
signature = (R, e')



Parameters:

| Name           | Type                | Description                                                                |
| :------------- | :------------------ | :------------------------------------------------------------------------- |
| ec             | struct EC256.Curve  | the 256-bit curve parameters.                                              |
| hashedMessage_ | bytes32             | the already hashed message to be verified.                                 |
| signature_     | bytes               | The adaptor Schnorr signature. Equals to `bytes(R) + bytes(e′)`.           |
| pubKey_        | bytes               | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.          |
| t_             | struct EC256.APoint | the adaptor secret point added to the nonce in the challenge computation.  |


Return values:

| Name | Type | Description                                              |
| :--- | :--- | :------------------------------------------------------- |
| [0]  | bool | True if the adaptor signature is valid, false otherwise. |

### extract

```solidity
function extract(
    EC256.Curve memory ec,
    bytes memory signature_,
    bytes memory adaptorSignature_
) internal pure returns (uint256)
```

The function to extract the adaptor secret from a pair of Schnorr signatures.

This function does not verify the validity of either signature.
Callers are responsible for verifying both the standard and adaptor signatures
separately via `verify` and `adaptorVerify` before extraction.

The standard Schnorr signature is expected to be computed from the adaptor one as:
e = e' + t = (r + t + c * privKey) mod n
signature = (R + T, e)

Secret extraction is performed as follows:
t = (e - e') mod n



Parameters:

| Name              | Type               | Description                                                       |
| :---------------- | :----------------- | :---------------------------------------------------------------- |
| ec                | struct EC256.Curve | the 256-bit curve parameters.                                     |
| signature_        | bytes              | the Schnorr signature. Equals to `bytes(R + T) + bytes(e)`.       |
| adaptorSignature_ | bytes              | the adaptor Schnorr signature. Equals to `bytes(R) + bytes(e')`.  |


Return values:

| Name | Type    | Description                              |
| :--- | :------ | :--------------------------------------- |
| [0]  | uint256 | The secret scalar used in the signature. |
