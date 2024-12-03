# ╭╯ ECDSA256

## Introduction

This library provides functionality for ECDSA verification over any 256-bit curve.

For more information about the logic behind the contract implementation, please refer to the [OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/5.x/api/utils#P256), particularly the [verifySolidity](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.1.0/contracts/utils/cryptography/P256.sol#L102) function.

## Functions 

To use the `ECDSA256` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/crypto/ECDSA256.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using ECDSA256 for *;
```

### verify

```solidity
function verify(
    ECDSA256.Parameters memory curveParams_,
    bytes32 hashedMessage_,
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
      <td>struct ECDSA256.Parameters</td>
      <td>The 256-bit curve parameters. <code>lowSmax</code> is <code>n/2</code></td>
    </tr>
    <tr>
      <td><code>hashedMessage</code></td>	  
      <td>bytes32</td>
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
      <td>The full public key of a signer. Equals to <code>bytes(x) + bytes(y)</code>. Note that signatures only from the lower part of the curve are accepted. If your <code>s > n / 2</code>, change it to <code>s = n - s</code></td>
    </tr>   
  </tbody>
</table>

#### Example

```solidity
function verifySECP256r1(
    bytes memory message_,
    bytes memory signature_,
    bytes memory pubKey_
) external view returns (bool) {
	ECDSA256.Parameters memory curveParams_ =
    ECDSA256.Parameters({
        a: 0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC,
        b: 0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B,
        gx: 0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296,
        gy: 0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5,
        p: 0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF,
        n: 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551,
        lowSmax: 0x7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a8
    });

    return curveParams_.verify(sha256(message_), signature_, pubKey_);
}
```