# 👤 Permanent Ownable

## Introduction

The concept of the Permanent Ownable module is similar to the [OpenZeppelin's Ownable contract](https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable), with the key difference being that the owner cannot be changed after the contract's creation.

## Implementation

The `PermanentOwnable` contract provides a basic access control mechanism that focuses on bytecode and gas efficiency. During the contract's creation, the provided address is set to an **immutable** variable within the contract, making it unchangeable thereafter. `PermanentOwnable` incorporates the standard `onlyOwner` modifier for use in child contracts.

## Example

Begin by creating a protected contract by inheriting it from the `PermanentOwnable`.

```solidity
contract PermanentOwnableProtectedContract is PermanentOwnable {
    constructor() PermanentOwnable(msg.sender) {}

    function protectedFunction() external onlyOwner { /* ... */ }
}
```

Deploy the created contract without any further preparations. Only the fixed owner can now call functions under the `onlyOwner` modifier.

```solidity
permanentOwnableProtectedContract = new PermanentOwnableProtectedContract();

permanentOwnableProtectedContract.owner(); // msg.sender

/// Reverts with "PermanentOwnable: caller is not the owner" 
/// if called not by the owner
permanentOwnableProtectedContract.protectedFunction(); 
```

## Production References

* [dl-solarity/solidity-lib](https://github.com/dl-solarity/solidity-lib/tree/master) uses the Permanent Ownable module in proxies implementation.
