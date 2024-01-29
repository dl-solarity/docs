# 👥 Multi Ownable

## Introduction

The concept of the Multi Owanable module is not different from the [OpenZeppelin's Ownable contract](https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable), with the exception that instead of one address as owner, a set of addresses is maintained.

## Implementation

The `MultiOwnable` contract provides a basic access control mechanism, where a list of owner addresses is granted exclusive access to specific functions. All owners have equal access rights, allowing them to add or remove other owners, including themselves. The one who calls the constructor function (i.e., the contract deployer) will become the initial owner of the contract. This module makes the `onlyOwner` modifier available, which can be applied to functions to restrict their use to the owners.

## Example

Begin by creating a protected contract by inheriting it from the `MultiOwnable`.

```solidity
contract MultiOwnableProtectedContract is MultiOwnable {
    function __MultiOwnableProtectedContract_init() external initializer {
        __MultiOwnable_init();
    }

    function protectedFunction() external onlyOwner { /* ... */ }
}
```

Deploy the created contract without any further preparations. Owners can now manage the owners list, while methods under the `onlyOwner` modifier can only be called by them.

```solidity
import "@solarity/solidity-lib/libs/utils/TypeCaster.sol";

using TypeCaster for *;

MultiOwnableProtectedContract public multiOwnableProtectedContract;

multiOwnableProtectedContract = new MultiOwnableProtectedContract();
multiOwnableProtectedContract.__MultiOwnableProtectedContract_init();

multiOwnableProtectedContract.getOwners(); // [msg.sender]

multiOwnableProtectedContract.addOwners(
    [
        0x500962685d61d4d45BD0A78E2c8e970C8D10c8CC,
        0x485566dEd54E5AEd6974198eDcE1Cfa8Ef946062
    ].asDynamic()
);

multiOwnableProtectedContract.getOwners();
/// [
///   msg.sender,
///   0x500962685d61d4d45BD0A78E2c8e970C8D10c8CC,
///   0x485566dEd54E5AEd6974198eDcE1Cfa8Ef946062
/// ]

/// Reverts with "MultiOwnable: caller is not the owner" if called not by the owner
multiOwnableProtectedContract.addOwners(
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8.asSingletonArray()
);

// Reverts with "MultiOwnable: caller is not the owner" if called not by the owner
multiOwnableProtectedContract.removeOwners(
    0x500962685d61d4d45BD0A78E2c8e970C8D10c8CC.asSingletonArray()
);

multiOwnableProtectedContract.getOwners();
/// [
///   msg.sender,
///   0x500962685d61d4d45BD0A78E2c8e970C8D10c8CC,
///   0x70997970C51812dc3A010C7d01b50e0d17dc79C8
/// ]

/// Reverts with "MultiOwnable: caller is not the owner" if called not by the owner
multiOwnableProtectedContract.protectedFunction();
```

## Production References

* [dexe-network/DeXe-Protocol​](https://github.com/dexe-network/DeXe-Protocol/tree/master) uses the Multi Ownable module for Contract Registry, Price Feed, etc.
