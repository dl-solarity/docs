# ECDSA384

## Overview

#### License: MIT

```solidity
library ECDSA384
```

Cryptography module

This library provides functionality for ECDSA verification over any 384-bit curve. Currently,
this is the most efficient implementation out there, consuming ~8.025 million gas per call.

The approach is Strauss-Shamir double scalar multiplication with 6 bits of precompute + affine coordinates.
For reference, naive implementation uses ~400 billion gas, which is 50000 times more expensive.

We also tried using projective coordinates, however, the gas consumption rose to ~9 million gas.
## Structs info

### Parameters

```solidity
struct Parameters {
	bytes a;
	bytes b;
	bytes gx;
	bytes gy;
	bytes p;
	bytes n;
	bytes lowSmax;
}
```

384-bit curve parameters.
### _Parameters

```solidity
struct _Parameters {
	uint256 a;
	uint256 b;
	uint256 gx;
	uint256 gy;
	uint256 p;
	uint256 n;
	uint256 lowSmax;
}
```


### _Inputs

```solidity
struct _Inputs {
	uint256 r;
	uint256 s;
	uint256 x;
	uint256 y;
}
```


## Functions info

### verify

```solidity
function verify(
    ECDSA384.Parameters memory curveParams_,
    bytes memory hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool)
```

The function to verify the ECDSA signature


Parameters:

| Name           | Type                       | Description                                                                                                                                                                                |
| :------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| curveParams_   | struct ECDSA384.Parameters | the 384-bit curve parameters. `lowSmax` is `n / 2`.                                                                                                                                        |
| hashedMessage_ | bytes                      | the already hashed message to be verified.                                                                                                                                                 |
| signature_     | bytes                      | the ECDSA signature. Equals to `bytes(r) + bytes(s)`.                                                                                                                                      |
| pubKey_        | bytes                      | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.  Note that signatures only from the lower part of the curve are accepted. If your `s > n / 2`, change it to `s = n - s`. |
