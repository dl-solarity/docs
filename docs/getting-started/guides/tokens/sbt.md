# 👻 SBT

## Introduction

The SBT token is an elegantly crafted implementation of a Soul Bound Token, designed for optimal efficiency and minimal resource usage.

## Implementation

Given that the token owner is unable to transfer the token to others, certain functionalities, such as `approve` and `transfer`, have been excluded intentionally to streamline bytecode. While this departure means that the token does not strictly adhere to the ERC721 standard, the implementation maintains seamless integration with the [MetaMask](https://metamask.io/) and [OpenSea](https://opensea.io/) platforms.

## Example

To create own Soul Bound Token, start by inheriting from the `SBT` contract. You can optionally create external functions, such as `mint` and `burn`, remembering to apply the `onlyOwner` modifier.

```solidity
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@solarity/solidity-lib/tokens/ASBT.sol";

contract MySBT is ASBT, OwnableUpgradeable {
    function __MySBT_init(
        string memory name_, 
        string memory symbol_
    ) external initializer {
        __ASBT_init(name_, symbol_);
        __Ownable_init(msg.sender);
    }

    function mint(address to_, uint256 tokenId_) external onlyOwner {
        _mint(to_, tokenId_);
    }

    function burn(uint256 tokenId_) external onlyOwner {
        _burn(tokenId_);
    }
}
```

After creating and initializing token, it can be used in different contexts.

```solidity
MySBT public sbt = new MySBT();
sbt.__MySBT_init("MySBT", "MSBT");

sbt.mint(address(1), 0); // address(1) has tokens: [0]
sbt.mint(address(1), 1); // address(1) has tokens: [0, 1]

sbt.burn(0); // address(1) has tokens: [1]

sbt.ownerOf(0); // address(0)
sbt.ownerOf(1); // address(1)

sbt.tokenURI(1); // ""

sbt.setBaseURI("base/");
sbt.tokenURI(1); // "base/1"

sbt.setTokenURI(1, "token1");
sbt.tokenURI(1); // "token1"
```

To customize the logic of the token, we can use a hook `_beforeTokenAction` that is called before the `mint` and `burn` actions. For instance, the next hook prohibits tokens from being mined to `address(this)`.

```solidity
contract MySBT is /* ... */ {
    // ...
 
    function _beforeTokenAction(address to_, uint256 tokenId_) internal override {
        require(to_ != address(this), "SBT: can't transfer to the contract itself");
    }
}
```
