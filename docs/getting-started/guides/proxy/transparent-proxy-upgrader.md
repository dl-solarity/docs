# 🪟 Transparent Proxy Upgrader

## Introduction

The Transparent Proxy Upgrader is designed to operate as an admin tool for managing transparent proxy contracts. It can be integrated within registries or similar structures to segregate the logic involved in manipulating proxies, thereby enhancing the overall system architecture.

## Implementation

The `TransparentProxyUpgrader` contract inherits from `PermanentOwnable`, indicating that it has a fixed owner, which is a deployer of this contract. The owner can call the `upgrade` function in order to change the current implementation address of a specified transparent proxy contract. Additionally, there is a `getImplementation` function that retrieves the implementation address.

## Example

This is a simplified implementation of the `ContractsRegistry` contract that uses `TransparentProxyUpgrader` as an admin for deployed proxies.

```solidity
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

import "@solarity/solidity-lib/proxy/transparent/TransparentProxyUpgrader.sol";

contract ContractsRegistry is PermanentOwnable {
    TransparentProxyUpgrader private _proxyAdmin;

    mapping(string => address) public proxies;

    constructor() PermanentOwnable(msg.sender) {
        _proxyAdmin = new TransparentProxyUpgrader();
    }

    function deployProxy(
        string memory name_,
        address implementation_,
        bytes memory data_
    ) external onlyOwner {
        proxies[name_] = address(
            new TransparentUpgradeableProxy(
                implementation_, 
                address(_proxyAdmin), 
                data_
            )
        );
    }

    function upgradeProxy(
        string memory name_,
        address newImplementation_,
        bytes memory data_
    ) external onlyOwner {
        _proxyAdmin.upgrade(proxies[name_], newImplementation_, data_);
    }

    function getImplementation(string memory name_) external view returns (address) {
        return _proxyAdmin.getImplementation(proxies[name_]);
    }
}
```

## Production References

* [dl-solarity/solidity-lib](https://github.com/dl-solarity/solidity-lib/tree/master) uses Transparent Proxy Upgrader in the Contracts Registry module implementation.
