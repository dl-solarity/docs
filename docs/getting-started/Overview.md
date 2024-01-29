# 🏙 Overview

<img src={require("/static/img/docs/solarity.png").default} alt=""/>

## Solidity Library for Savvies by Distributed Lab

The library consists of modules and utilities that are built with a help of [Openzeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) (4.9.5) and **go far beyond mediocre solidity**.

* Implementation of [**Contracts Registry**](https://eips.ethereum.org/EIPS/eip-6224) pattern
* Versatile **RBAC** and **MultiOwnable** smart contracts
* Enhanced and simplified [**Diamond**](https://eips.ethereum.org/EIPS/eip-2535) pattern
* Heap based priority queue library
* Memory data structures (Vector)
* Optimized [**Incremental Merkle Tree**](https://github.com/runtimeverification/deposit-contract-verification/blob/master/deposit-contract-verification.pdf) data structure
* Novel **ReturnDataProxy** contract
* Lightweight **SBT** implementation
* Flexible UniswapV2 and UniswapV3 oracles
* Utilities to ease work with ERC20 decimals, arrays, sets and ZK proofs

Checkout guides section for detailed explanations with usage examples for each module.

### Installation

```bash
$ npm install @solarity/solidity-lib
```

The latest stable version is always in the `master` branch.

### Usage

You will find the smart contracts in the `contracts` directory. Feel free to play around and check the source code, it is rather descriptive.

Once the [npm package](https://www.npmjs.com/package/@solarity/solidity-lib) is installed, one can use the library just like that:

```solidity
pragma solidity ^0.8.4;

import "@solarity/solidity-lib/contracts-registry/presets/OwnableContractsRegistry.sol";

contract ContractsRegistry is OwnableContractsRegistry {
    . . .
}
```

> It is important to use the library as it is shipped and not copy-paste the code from untrusted sources.

### Contribution

We are open to contributions to our [solidity-lib](https://github.com/dl-solarity/solidity-lib/tree/master) repository. If you're interested in contributing, please visit the [How to contribute](./contribution/how-to-contribute.md) section.

### License

The library is released under the MIT License
