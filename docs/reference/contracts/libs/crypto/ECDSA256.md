# ECDSA256

## Overview

#### License: MIT

```solidity
library ECDSA256
```

Cryptography module

This library provides functionality for ECDSA verification over any 256-bit curve.

For more information, please refer to the OpenZeppelin documentation.
## Structs info

### Parameters

```solidity
struct Parameters {
	uint256 a;
	uint256 b;
	uint256 gx;
	uint256 gy;
	uint256 p;
	uint256 n;
	uint256 lowSmax;
}
```

256-bit curve parameters.
### _JPoint

```solidity
struct _JPoint {
	uint256 x;
	uint256 y;
	uint256 z;
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


## Errors info

### LengthIsNot64

```solidity
error LengthIsNot64()
```


## Functions info

### verify

```solidity
function verify(
    ECDSA256.Parameters memory curveParams_,
    bytes32 hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool)
```

The function to verify the ECDSA signature


Parameters:

| Name           | Type                       | Description                                                                                                                                                                                |
| :------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| curveParams_   | struct ECDSA256.Parameters | the 256-bit curve parameters. `lowSmax` is `n / 2`.                                                                                                                                        |
| hashedMessage_ | bytes32                    | the already hashed message to be verified.                                                                                                                                                 |
| signature_     | bytes                      | the ECDSA signature. Equals to `bytes(r) + bytes(s)`.                                                                                                                                      |
| pubKey_        | bytes                      | the full public key of a signer. Equals to `bytes(x) + bytes(y)`.  Note that signatures only from the lower part of the curve are accepted. If your `s > n / 2`, change it to `s = n - s`. |
