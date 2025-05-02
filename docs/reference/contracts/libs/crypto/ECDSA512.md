# ECDSA512

## Overview

#### License: MIT

```solidity
library ECDSA512
```

Cryptography module

This library provides functionality for ECDSA verification over any 512-bit curve. Currently,
this is the most efficient implementation out there, consuming ~13.6 million gas per call.

The approach is Strauss-Shamir double scalar multiplication with 6 bits of precompute + affine coordinates.
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
}
```

512-bit curve parameters.
### _Parameters

```solidity
struct _Parameters {
	uint512 a;
	uint512 b;
	uint512 gx;
	uint512 gy;
	uint512 p;
	uint512 n;
}
```


### _Inputs

```solidity
struct _Inputs {
	uint512 r;
	uint512 s;
	uint512 x;
	uint512 y;
}
```


## Functions info

### verify

```solidity
function verify(
    ECDSA512.Parameters memory curveParams_,
    bytes memory hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool)
```

The function to verify the ECDSA signature


Parameters:

| Name           | Type                       | Description                                                                                                                                                                                |
| :------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| curveParams_   | struct ECDSA512.Parameters | the 512-bit curve parameters.                                                                                                                                                              |
| hashedMessage_ | bytes                      | the already hashed message to be verified.                                                                                                                                                 |
| signature_     | bytes                      | the ECDSA signature. Equals to `bytes(r) + bytes(s)`.                                                                                                                                      |
| pubKey_        | bytes                      | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.  Note that signatures only from the lower part of the curve are accepted. If your `s > n / 2`, change it to `s = n - s`. |
