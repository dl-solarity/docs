# ECDSA256

## Overview

#### License: MIT

```solidity
library ECDSA256
```

Cryptography module

This library provides functionality for ECDSA verification over any 256-bit curve.

For more information, please refer to the OpenZeppelin documentation.
## Errors info

### LengthIsNot64

```solidity
error LengthIsNot64()
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

The function to verify the ECDSA signature


Parameters:

| Name           | Type               | Description                                                                                                                                                                                |
| :------------- | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ec             | struct EC256.Curve | the 256-bit curve parameters.                                                                                                                                                              |
| hashedMessage_ | bytes32            | the already hashed message to be verified.                                                                                                                                                 |
| signature_     | bytes              | the ECDSA signature. Equals to `bytes(r) + bytes(s)`.                                                                                                                                      |
| pubKey_        | bytes              | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.  Note that signatures only from the lower part of the curve are accepted. If your `s > n / 2`, change it to `s = n - s`. |
