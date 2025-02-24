# AdminableProxy

## Overview

#### License: MIT

```solidity
contract AdminableProxy is ERC1967Proxy
```

This contract implements a proxy that is upgradeable by an admin.

The implementation of this contract is based on OpenZeppelin's TransparentUpgradeableProxy.
The main change is in the constructor. While the original contract deploys an instance of ProxyAdmin
for every proxy, this implementation simply sets the specified address as the admin.
Additionally, an implementation function has been added.

For more information about proxy logic, please refer to the OpenZeppelin documentation.
## Errors info

### ProxyDeniedAdminAccess

```solidity
error ProxyDeniedAdminAccess()
```


## Functions info

### constructor

```solidity
constructor(
    address logic_,
    address admin_,
    bytes memory data_
) payable ERC1967Proxy(logic_, data_)
```

