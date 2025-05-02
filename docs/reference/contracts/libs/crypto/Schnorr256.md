# Schnorr256

## Overview

#### License: MIT

```solidity
library Schnorr256
```

Cryptography module

This library provides functionality for Schnorr signature verification over any 256-bit curve.
## Errors info

### LengthIsNot64

```solidity
error LengthIsNot64()
```


### LengthIsNot96

```solidity
error LengthIsNot96()
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

The function to verify the Schnorr signature


Parameters:

| Name           | Type               | Description                                                       |
| :------------- | :----------------- | :---------------------------------------------------------------- |
| ec             | struct EC256.Curve | the 256-bit curve parameters.                                     |
| hashedMessage_ | bytes32            | the already hashed message to be verified.                        |
| signature_     | bytes              | the Schnorr signature. Equals to `bytes(R) + bytes(e)`.           |
| pubKey_        | bytes              | the full public key of a signer. Equals to `bytes(x) + bytes(y)`. |
