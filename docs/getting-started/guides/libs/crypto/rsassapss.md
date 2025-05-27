# 𓍯𓂃 RSASSAPSS

## Introduction

The RSASSAPSS library provides functionality to verify RSASSA-PSS signatures with MGF1 mask generation function.

Users may provide custom hash functions via `Parameters` struct. However, the usage of `sha256` is recommended.
The RSASSA-PSS signature verification costs ~340k gas.

Learn more about the algorithm [here](https://datatracker.ietf.org/doc/html/rfc3447#section-8.1).

## Functions 

To use the `RSASSAPSS` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/crypto/RSASSAPSS.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using RSASSAPSS for *;
```

### verifySha256

```solidity
function verifySha256(
    bytes memory message_,
    bytes memory s_,
    bytes memory e_,
    bytes memory n_
) internal view returns (bool);
```

#### Description

Same as `verify` but with `sha256` hash function preconfiguration.

### verify

```solidity
function verify(
    RSASSAPSS.Parameters memory params_,
    bytes memory message_,
    bytes memory s_,
    bytes memory e_,
    bytes memory n_
) internal view returns (bool);
```

#### Description

Verifies RSAPSS-SSA signature with custom parameters.

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
      <td><code>params</code></td>
      <td>struct RSASSAPSS.Parameters</td>
      <td>The parameters to specify the hash length, salt length, and hash function of choice</td>
    </tr>
    <tr>
      <td><code>message</code></td>	  
      <td>bytes</td>
      <td>The arbitrary message to be verified</td>
    </tr>
    <tr>
      <td><code>s</code></td>  
      <td>bytes</td>
      <td>The "encrypted" signature</td>
    </tr>   
     <tr>
      <td><code>e</code></td>	  
      <td>bytes</td>
      <td>The public key exponent. <code>65537</code> is a recommended value</td>
    </tr>
     <tr>
      <td><code>n</code></td>	  
      <td>bytes</td>
      <td>The modulus of a public key</td>
    </tr>
  </tbody>
</table>

##### Where RSASSAPSS.Parameters consist of:

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
      <td><code>hashLength</code></td>
      <td>uint256</td>
      <td>The hash function output length in bytes</td>
    </tr>
    <tr>
      <td><code>saltLength</code></td>	  
      <td>uint256</td>
      <td>The pss encoding salt length in bytes</td>
    </tr>
    <tr>
      <td><code>hasher</code></td>  
      <td>function (bytes) pure returns (bytes)</td>
      <td>The function-pointer to a custom hash function</td>
    </tr>   
  </tbody>
</table>
