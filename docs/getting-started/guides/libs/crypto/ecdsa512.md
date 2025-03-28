# ╭╯ ECDSA512

## Introduction

This library provides functionality for ECDSA verification over any 512-bit curve. Currently,
this is the most efficient implementation out there, consuming ~13.6 million gas per call.

The approach is similar to the ECDSA384 library.

## Functions 

To use the `ECDSA512` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/crypto/ECDSA512.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using ECDSA512 for *;
```

### verify

```solidity
function verify(
    ECDSA512.Parameters memory curveParams_,
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
      <td>struct ECDSA512.Parameters</td>
      <td>The 512-bit curve parameters. <code>lowSmax</code> is <code>n/2</code></td>
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
      <td>The full public key of a signer. Equals to <code>bytes(x) + bytes(y)</code>. Note that signatures only from the lower part of the curve are accepted. If your <code>s > n / 2</code>, change it to <code>s = n - s</code></td>
    </tr>   
  </tbody>
</table>

#### Example

```solidity
function verifyBrainpoolP512r1(
    bytes calldata message_,
    bytes calldata signature_,
    bytes calldata pubKey_
) external view returns (bool) {
    ECDSA512.Parameters memory curveParams_ =
        ECDSA512.Parameters({
            a: hex"7830a3318b603b89e2327145ac234cc594cbdd8d3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94ca",
            b: hex"3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94cadc083e67984050b75ebae5dd2809bd638016f723",
            gx: hex"81aee4bdd82ed9645a21322e9c4c6a9385ed9f70b5d916c1b43b62eef4d0098eff3b1f78e2d0d48d50d1687b93b97d5f7c6d5047406a5e688b352209bcb9f822",
            gy: hex"7dde385d566332ecc0eabfa9cf7822fdf209f70024a57b1aa000c55b881f8111b2dcde494a5f485e5bca4bd88a2763aed1ca2b2fa8f0540678cd1e0f3ad80892",
            p: hex"aadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca703308717d4d9b009bc66842aecda12ae6a380e62881ff2f2d82c68528aa6056583a48f3",
            n: hex"aadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca70330870553e5c414ca92619418661197fac10471db1d381085ddaddb58796829ca90069",
            lowSmax: hex"556ecedc6df4e2459fea735719e4fe03e59846d9d9e4e9076b31ce65381984382a9f2e20a654930ca0c3308cbfd608238ed8e9c0842eed6edac3cb414e548034"
        });

    return curveParams_.verify(abi.encodePacked(sha256(message_)), signature_, pubKey_);
}
```
