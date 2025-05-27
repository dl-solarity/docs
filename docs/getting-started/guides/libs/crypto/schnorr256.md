# 𓂃🖊 Schnorr256

## Introduction

This library provides functionality for Schnorr signature verification over any 256-bit curve.

## Functions 

To use the `Schnorr256` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/crypto/Schnorr256.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using Schnorr256 for *;
```

### verify

```solidity
function verify(
    EC256.Curve memory ec,
    bytes32 hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) internal view returns (bool);
```

#### Description

The function to verify the Schnorr signature.

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
      <td><code>ec</code></td>
      <td>struct EC256.Curve</td>
      <td>The 256-bit curve parameters</td>
    </tr>
    <tr>
      <td><code>hashedMessage</code></td>	  
      <td>bytes32</td>
      <td>The already hashed message to be verified</td>
    </tr>
    <tr>
      <td><code>signature</code></td>  
      <td>bytes</td>
      <td>The Schnorr signature. Equals to <code>bytes(R) + bytes(e)</code></td>
    </tr>
    <tr>
      <td><code>pubKey</code></td>  
      <td>bytes</td>
      <td>The full public key of a signer. Equals to <code>bytes(x) + bytes(y)</code></td>
    </tr>   
  </tbody>
</table>

#### Example

```solidity
function verifySECP256k1(
    bytes32 hashedMessage_,
    bytes memory signature_,
    bytes memory pubKey_
) external view returns (bool isVerified_) {
	EC256.Curve memory _secp256k1CurveParams =
        EC256.Curve({
            a: 0x0000000000000000000000000000000000000000000000000000000000000000,
            b: 0x0000000000000000000000000000000000000000000000000000000000000007,
            gx: 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798,
            gy: 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8,
            p: 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f,
            n: 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141
        });

    return _secp256k1CurveParams.verify(hashedMessage_, signature_, pubKey_);
}
```
