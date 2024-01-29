# 💂 Block Guard

## Introduction

The Block Guard module facilitates the flash-loan protection mechanism. It restricts users from calling specific functions within the same block, such as using Multicall, to prevent potential exploits.

## Implementation

The `BlockGuard` is a simple contract that tracks the latest block in which a particular resource (group of functions) was accessed by a specific address. It provides several modifiers for easy integration.

<table><thead><tr><th width="311">Function</th><th>Description</th></tr></thead><tbody><tr><td><code>lockBlock</code></td><td>Saves the current block number when a resource is accessed</td></tr><tr><td><code>checkBlock</code></td><td>Ensures a resource isn't accessed more than once in the same block</td></tr><tr><td><code>checkLockBlock</code></td><td>Combines the functionalities of both checking and locking a resource in a block</td></tr></tbody></table>

## Example

For instance, to prevent users from depositing and withdrawing assets in the same transaction, we can utilize the `BlockGuard` contract. By inheriting from the `BlockGuard`, we can apply lock modifiers to both `deposit` and `withdraw` functions.

```solidity
import "@solarity/solidity-lib/utils/BlockGuard.sol";

contract NotFlashloanable is BlockGuard {
     string public constant DEPOSIT_WITHDRAW = "DEPOSIT_WITHDRAW";
     
     function deposit() external lockBlock(DEPOSIT_WITHDRAW, msg.sender) {
          /* ... */
     }

     function withdraw() external checkBlock(DEPOSIT_WITHDRAW, msg.sender) {
          /**/
     }
}
```

Now, if an attacker tries to deposit and withdraw assets in the same block, our contract will revert.

```solidity
contract Attacker {
    NotFlashloanable public notFlashloanable;
    
    function attack() external {
        notFlashloanable.deposit();
        
        // manipulating deposited funds...
        
        notFlashloanable.withdraw(); // Reverts with "BlockGuard: locked"
    }
}
```

Please note that it is still possible to make multiple deposits and withdrawals in the same transaction. Use the `checkLockBlock` modifier to avoid this.

```solidity
contract Attacker {
    NotFlashloanable public notFlashloanable;
    
    function attack() external {
        notFlashloanable.deposit();
        notFlashloanable.deposit(); // OK
    }
}
```

## Production references

* [dexe-network/DeXe-Protocol](https://github.com/dexe-network/DeXe-Protocol/tree/master) uses the Block Guard module to prevent flash-loan attacks in governance pools.
