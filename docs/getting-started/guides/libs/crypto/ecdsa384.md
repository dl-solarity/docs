# ╭╯ ECDSA384

## Introduction

This library provides functionality for ECDSA verification over any 384-bit curve. Currently, this is the most efficient implementation out there, consuming ~9 million gas per call.

The approach is Strauss-Shamir double scalar multiplication with 4 bits of precompute + projective points.

## Functions 

To use the `ECDSA384` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/crypto/ECDSA384.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using ECDSA384 for *;
```

### verify

```solidity
function verify(
    ECDSA384.Parameters memory curveParams_,
    bytes memory hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool)
```

#### Description

The function to verify the ECDSA signature

##### Parameters:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>curveParams</code></td>
      <td>struct ECDSA384.Parameters</td>
      <td>The 384-bit curve parameters. <code>lowSmax</code> is <code>n/2</code></td>
    </tr>
    <tr>
      <td><code>hashedMessage</code></td>	  
      <td>bytes</td>
      <td>The already hashed message to be verified</td>
    </tr>
    <tr>
      <td><code>signature</code></td>  
      <td>bytes</td>
      <td>The ECDSA signature. Equals to <code>bytes(r) + bytes(s)</code></td>
    </tr>
    <tr>
      <td><code>pubKey</code></td>  
      <td>bytes</td>
      <td>The full public key of a signer. Equals to <code>bytes(x) + bytes(y)</code>. Note that signatures only from the lower part of the curve are accepted. If your <code>s >= n / 2</code>, change it to <code> s = n - s</code></td>
    </tr>   
  </tbody>
</table>

#### Example

```solidity
function verifySECP384r1(
    bytes calldata message_,
    bytes calldata signature_,
    bytes calldata pubKey_
) external view returns (bool) {
	ECDSA384.Parameters memory curveParams_ = ECDSA384.Parameters({
        a: hex"fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc",
        b: hex"b3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef",
        gx: hex"aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7",
        gy: hex"3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",
        p: hex"fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff",
        n: hex"ffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973",
        lowSmax: hex"7fffffffffffffffffffffffffffffffffffffffffffffffe3b1a6c0fa1b96efac0d06d9245853bd76760cb5666294b9"
    });

    return curveParams_.verify(abi.encodePacked(sha256(message_)), signature_, pubKey_);
}
```

## 🖩 U384

### Introduction

The `U384` low-level utility library that implements unsigned 384-bit arithmetics. It provides various functions that are used in ECDSA384 library.
