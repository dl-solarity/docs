# 🪟 Adminable Proxy

## Introduction

The Adminable Proxy is a simple ERC-1967 proxy that is designed to be managed by an admin. The admin can upgrade the proxy and get it's latest implementation.

## Implementation

The `AdminableProxy` is very similar to OZ's `TransparentProxy` except that the proxy admin is not deployed everytime in the constructor. Users can freely pass their own Admin contract address.

```solidity
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract AdminableProxy is ERC1967Proxy {
    address private immutable _ADMIN;

    constructor(
        address logic_,
        address admin_, // can be arbitrary
        bytes memory data_
    ) payable ERC1967Proxy(logic_, data_) {
        _ADMIN = admin_;
        ERC1967Utils.changeAdmin(admin_);
    }

    . . .
}
```
