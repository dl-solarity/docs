# RSASSAPSS

## Overview

#### License: MIT

```solidity
library RSASSAPSS
```

Cryptography module

This library provides functionality to verify RSASSA-PSS signatures with MGF1 mask generation function.

Users may provide custom hash functions via `Parameters` struct. However, the usage of `sha256` is recommended.
The RSASSA-PSS signature verification costs ~340k gas.

Learn more about the algorithm [here](https://datatracker.ietf.org/doc/html/rfc3447#section-8.1).
## Structs info

### Parameters

```solidity
struct Parameters {
	uint256 hashLength;
	uint256 saltLength;
	function (bytes) pure returns (bytes) hasher;
}
```

The RSASSA-PSS parameters.


Parameters:

| Name       | Type                                  | Description                                     |
| :--------- | :------------------------------------ | :---------------------------------------------- |
| hashLength | uint256                               | the hash function output length in bytes.       |
| saltLength | uint256                               | the pss encoding salt length in bytes.          |
| hasher     | function (bytes) pure returns (bytes) | the function-pointer to a custom hash function. |

## Functions info

### verifySha256

```solidity
function verifySha256(
    bytes memory message_,
    bytes memory s_,
    bytes memory e_,
    bytes memory n_
) internal view returns (bool)
```

Same as `verify` but with `sha256` hash function preconfiguration.
### verify

```solidity
function verify(
    RSASSAPSS.Parameters memory params_,
    bytes memory message_,
    bytes memory s_,
    bytes memory e_,
    bytes memory n_
) internal view returns (bool)
```

Verifies RSAPSS-SSA signature with custom parameters.


Parameters:

| Name     | Type                        | Description                                                                           |
| :------- | :-------------------------- | :------------------------------------------------------------------------------------ |
| params_  | struct RSASSAPSS.Parameters | The parameters to specify the hash length, salt length, and hash function of choice.  |
| message_ | bytes                       | The arbitrary message to be verified.                                                 |
| s_       | bytes                       | The "encrypted" signature                                                             |
| e_       | bytes                       | The public key exponent. `65537` is a recommended value.                              |
| n_       | bytes                       | The modulus of a public key.                                                          |
