# 🥓 Beacon Proxy

## Introduction

The Beacon Proxy offers an efficient approach to upgrading multiple smart contracts with the same implementation (a.k.a. pool contracts).

## Implementation

The core concept revolves around a beacon contract that holds the address of a current pool implementation contract. Beacon Proxy contracts themselves do not directly store the implementation address; instead, they reference the beacon contract. This setup allows for the simultaneous upgrading of all associated pool proxy contracts through a single update to the beacon, significantly simplifying the upgrade process and reducing associated costs.

This module holds two primary contracts: the `ProxyBeacon` and the `PublicBeaconProxy`. The `ProxyBeacon` contract holds the address of the current implementation and provides mechanisms to upgrade this address. It inherits `PermanentOwnable`, ensuring that only the fixed authorized address can perform upgrades. The `PublicBeaconProxy` contract, on the other hand, serves as the individual proxy contract that users interact with. It references the `ProxyBeacon` to delegate calls to the current implementation contract. When the implementation address in the `ProxyBeacon` is updated, all `BeaconProxy` contracts referencing it automatically start using the new implementation.

## Example

This is a simplified implementation of the `PoolContractsRegistry` contract that uses `ProxyBeacon` and `PublicBeaconProxy` to deploy and upgrade pool contracts.

```solidity
import "@solarity/solidity-lib/proxy/beacon/ProxyBeacon.sol";
import "@solarity/solidity-lib/proxy/beacon/PublicBeaconProxy.sol";

contract PoolContractsRegistry is PermanentOwnable {
    mapping(string => ProxyBeacon) public beacons;
    mapping(string => PublicBeaconProxy[]) public pools;

    constructor() PermanentOwnable(msg.sender) {}

    function setNewImplementations(
        string[] memory names_,
        address[] memory newImplementations_
    ) external onlyOwner {
        for (uint256 i = 0; i < names_.length; i++) {
            if (address(beacons[names_[i]]) == address(0)) {
                beacons[names_[i]] = new ProxyBeacon();
            }

            if (beacons[names_[i]].implementation() != newImplementations_[i]) {
                beacons[names_[i]].upgradeTo(newImplementations_[i]);
            }
        }
    }

    function deployPool(
        string memory poolType_, 
        bytes calldata data_
    ) external onlyOwner {
        pools[poolType_].push(
            new PublicBeaconProxy(address(beacons[poolType_]), data_)
        );
    }
}
```

## Production References

* &#x20;[dl-solarity/solidity-lib](https://github.com/dl-solarity/solidity-lib/tree/master) uses Beacon Proxy in the Contracts Registry module implementation.
