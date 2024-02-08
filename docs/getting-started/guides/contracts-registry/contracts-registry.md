# 🗒️ Contracts Registry

## Introduction

This module contains an implementation of [ERC-6224: Contracts Dependencies Registry](https://eips.ethereum.org/EIPS/eip-6224).

We highly recommend reading the EIP before proceeding. This documentation provides a genuine follow up guide for the technical EIP description.

The Contracts Registry module streamlines the maintenance of large projects by offering a comprehensive solution for organizing contracts, handling their interdependencies, and enabling seamless system upgrades. Its main features include:

* A unified repository for all system contract addresses, ensuring easy access.
* Dynamic contract addition, removal, and replacement.
* A dependency injection mechanism to effectively manage smart contract dependencies.
* Automated management of proxy contracts.
* Compatibility with both standalone and pool contracts.

## Implementation

<figure>
    <img src={require("/static/img/docs/contracts-registry-diagram.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>Contracts Registry architecture</figcaption>
</figure>

#### 1 ContractsRegistry contract

The `ContractsRegistry` is a contract that should be used as the highest level repository that is aware of all other contracts present in the system.

Behind the scenes, the `ContractRegistry` maintains a mapping of string contract names to their corresponding addresses. The use of string keys, selected by ERC-6224 for their high readability, is favored even though it might not be the most gas-efficient option. Generally, the `ContractRegistry` adds system contracts under the self-deployed **transparent proxies**, gaining the rights to use administrative methods on these proxies, such as `upgradeTo`. It also permits adding pre-deployed contracts, regardless of their proxy status. However, users should set up permissions for these contracts themselves.

Functions featured by the `ContractsRegisry`:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>injectDependencies</code>, <code>injectDependenciesWithData</code></td>
      <td>Injects the dependencies into the given contract</td>
    </tr>
    <tr>
      <td><code>upgradeContract</code>, <code>upgradeContractAndCall</code></td>
      <td>Upgrades added proxy contract with a new implementation</td>
    </tr>
    <tr>
      <td><code>addContract</code></td>
      <td>Adds contracts that the system does not have direct upgradeability control over, or the contracts that are not upgradeable</td>
    </tr>
    <tr>
      <td><code>addProxyContract</code>, <code>addProxyContractAndCall</code></td>
      <td>Adds the contracts and deploys the proxy above them</td>
    </tr>
    <tr>
      <td><code>justAddProxyContract</code></td>
      <td>Adds the already deployed proxy</td>
    </tr>
    <tr>
      <td><code>removeContact</code></td>
      <td>Removes the contract</td>
    </tr>
  </tbody>
</table>

#### 2 Dependency Injection

The `ContractsRegistry` works together with `Dependant` contracts. Every standalone contract of a protocol must be `Dependant` in order to support the **dependency injection** mechanism. The required dependencies must be set in the overridden `setDependencies` method, not in the `constructor` or `initializer` methods. The `setDependencies` function has the `ContractsRegistry` as a parameter, so the required dependencies can be retrieved from it. Unlike `initializer` methods, the `setDependencies` might be called as much as needs.

#### 3 PoolRegistry and PoolFactory contracts

To facilitate the deployment and management of pool contracts, the `PoolRegistry` and `PoolFactory` contracts are essential. Both of them are `Dependant` and typically included into the `ContractsRegistry`. These contracts utilize the [Beacon Proxy](https://eips.ethereum.org/EIPS/eip-1967#beacon-contract-address) to enable simultaneous upgrades of pools. Dependency injection for `Dependant` pool contracts is performed by the `PoolFactory` upon initial deployment and by the `PoolRegistry` for existing pools.

Functions featured by the `PoolRegistry`:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>setNewImplementations</code></td>
      <td>Sets pools' implementations</td>
    </tr>
    <tr>
      <td><code>injectDependenciesToExistingPools, injectDependenciesToExistingPoolsWithData</code></td>
      <td>Injects dependencies to the pools</td>
    </tr>
    <tr>
      <td><code>addProxyPool</code></td>
      <td>Adds new pools</td>
    </tr>
  </tbody>
</table>

Functions featured by the `PoolFactory`:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>deploy</code></td>
      <td>Deploys Beacon Proxy pointing to the pool implementation taken from the <code>PoolRegistry</code></td>
    </tr>
    <tr>
      <td><code>deploy2</code></td>
      <td>Deploys Beacon Proxy pointing to the pool implementation taken from the <code>PoolRegistry</code> using the create2 mechanism</td>
    </tr>
    <tr>
      <td><code>register</code></td>
      <td>Registers the newly deployed pool in the <code>PoolRegistry</code></td>
    </tr>
    <tr>
      <td><code>injectDependencies</code></td>
      <td>Injects dependencies into the newly deployed pool and sets <code>PoolRegistry</code> as an injector</td>
    </tr>
  </tbody>
</table>

#### 4 Presets

The Contracts Registry module includes several preset contracts to help you establish permissions.

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/contracts-registry/presets/OwnableContractsRegistry.sol">OwnableContractsRegistry</a></td>
      <td>Only the owner can inject dependencies into, add, remove, and upgrade contracts</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/contracts-registry/presets/MultiOwnableContractsRegistry.sol">MultiOwnableContractsRegistry</a></td>
      <td>Only multiple owners can inject dependencies into, add, remove, and upgrade contracts</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/contracts-registry/pools/presets/OwnablePoolContractsRegistry.sol">OwnablePoolContractsRegistry</a></td>
      <td>Only the owner can call set pools' implementations and inject dependencies into existing pools</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/contracts-registry/pools/presets/MultiOwnablePoolContractsRegistry.sol">MultiOwnablePoolContractsRegistry</a></td>
      <td>Only multiple owners can call set pools' implementations and inject dependencies into existing pools</td>
    </tr>
  </tbody>
</table>

## Example

To set up a system, start by creating the `ContractsRegistry` contract, which inherits from the `OwnableContractsRegistry`. This preset ensures that only the owner can use methods for managing contract addresses and performing dependency injections.

Assume the system has two standalone contracts, named `SystemContract1` and `SystemContract2`, each associated with a unique string identifier. It is recommended to establish constants within the `ContractsRegistry` to signify the contracts it includes, such as `SYSTEM_CONTRACT_1` and `SYSTEM_CONTRACT_2`. Furthermore, it is beneficial to introduce functions that enable the retrieval of contract addresses using these constants. The `ContractsRegistry` is intended to be an upgradeable contract, e.g. `UUPSUpgradeable`, but for the sake of simplicity we leave it as it is.

```solidity
import "@solarity/solidity-lib/contracts-registry/presets/OwnableContractsRegistry.sol";

contract ContractsRegistry is OwnableContractsRegistry {
    string public constant SYSTEM_CONTRACT_1 = "SYSTEM_CONTRACT_1";
    string public constant SYSTEM_CONTRACT_2 = "SYSTEM_CONTRACT_2";

    function getSystemContract1() external view returns (address) {
        return getContract(SYSTEM_CONTRACT_1);
    }

    function getSystemContract2() external view returns (address) {
        return getContract(SYSTEM_CONTRACT_2);
    }
}
```

Now, let's create system contracts. In this example, `SystemContract1` is designed to work with `SystemContract2` as a dependency. It inherits from `AbstractDependant` to implement the necessary dependency handling. The `setDependencies` function allows `SystemContract1` to retrieve the address of `SystemContract2` from the `ContractsRegistry`. Note that the `dependant` modifier is applied to the `setDependencies` method, ensuring that only the **injector**, typically the `ContractsRegistry`, can call it.

```solidity
contract SystemContract1 is AbstractDependant {
    address public systemContract2;

    function setDependencies(
        address contractsRegistry_,
        bytes memory
    ) public override dependant {
        systemContract2 = ContractsRegistry(contractsRegistry_).getSystemContract2();
    }
    
    function systemContract1Method() external { /* ... */ }
}

contract SystemContract2 {
    /// ...
}
```

To initiate the migration process, begin by deploying and initializing the `ContractsRegistry` contract. Following this, deploy all system contracts and register them. In this example, `SystemContract1` is deployed under the transparent proxy managed by `ContractsRegistry`, while `SystemContract2` is added as is. Conclude by injecting dependencies into the `SystemContract1`.

```solidity
function migration() external {
    ContractsRegistry contractsRegistry_ = new ContractsRegistry();

    contractsRegistry_.__OwnableContractsRegistry_init();

    SystemContract1 systemContract1_ = new SystemContract1();
    SystemContract2 systemContract2_ = new SystemContract2();

    contractsRegistry_.addProxyContract(
        contractsRegistry_.SYSTEM_CONTRACT_1(),
        address(systemContract1_)
    );
    contractsRegistry_.addContract(
        contractsRegistry_.SYSTEM_CONTRACT_2(),
        address(systemContract2_)
    );

    contractsRegistry_.injectDependencies(contractsRegistry_.SYSTEM_CONTRACT_1());

    contractsRegistry_.transferOwnership(msg.sender);
}
```

Now we may want our system to support pool contracts. Pool contracts are designed to be deployed multiple times within the same system, each instance operating with the same underlying implementation. `PoolA`, in particular, inherits from both `AbstractDependant` and `Initializable`, illustrating its capabilities for dependency management and one-time initialization. These features ensure that each instance of `PoolA` seamlessly integrates into the system, interacting appropriately with other system components.

```solidity
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract PoolA is AbstractDependant, Initializable {
    struct Parameters {
        address token1;
        address token2;
    }

    struct Dependencies {
        address systemContract1;
    }

    Parameters public parameters;
    Dependencies public dependencies;

    function __PoolA_init(Parameters calldata parameters_) external initializer {
        parameters = parameters_;
    }

    function setDependencies(
        address contractsRegistry_,
        bytes memory data_
    ) public override dependant {
        dependencies.systemContract1 = ContractsRegistry(contractsRegistry_)
            .getSystemContract1();
    }
    
    function poolAMethod() external { /* ... */ }

    /// ...
}
```

There is no need to alter the `ContractsRegistry` for each pool addition. Instead, we propose utilizing the specialized `PoolRegistry` contract. Mirroring the approach of `ContractsRegistry`, `PoolRegistry` utilizes string keys, such as `POOL_A`, for pools identification. In order to facilitate the process of registering new pools, the `addProxyPool` function has been overridden. This modification restricts the registration of new pools exclusively to the designated factory.

```solidity
import "@solarity/solidity-lib/contracts-registry/pools/presets/OwnablePoolContractsRegistry.sol";

contract PoolRegistry is OwnablePoolContractsRegistry {
    string public constant POOL_A = "POOL_A";

    address public poolFactory;

    modifier onlyPoolFactory() {
        require(poolFactory == msg.sender, "PoolRegistry: caller is not a factory");
        _;
    }

    function __PoolRegistry_init() external {
        __OwnablePoolContractsRegistry_init();
    }

    function setDependencies(
        address contractsRegistry_, 
        bytes memory data_
    ) public override {
        super.setDependencies(contractsRegistry_, data_);

        poolFactory = ContractsRegistry(contractsRegistry_).getPoolFactory();
    }

    function addProxyPool(
        string memory name_,
        address poolAddress_
    ) public override onlyPoolFactory {
        _addProxyPool(name_, poolAddress_);
    }
}
```

The `PoolRegistry` contract typically works in tandem with the `PoolFactory` contract. Note that both of them require each other as dependencies in their respective `setDependencies` methods. This scenario is referred to as **recursive dependencies**, which is also applicable within `Dependant` contracts.

The `PoolFactory` itself contains deployment methods, like `deployPoolA`, each tailored to a specific pool type. The process of setting up a new pool encompasses several steps:

1. Deployment: The initial task of the deployment method is to deploy a new pool. This is accomplished using either the `_deploy` function (for standard CREATE deployments) or the `_deploy2` function (for CREATE2 deployments) from the `AbstractPoolFactory`. By default, these methods deploy beacon proxies, utilizing wrapped pool implementations provided by the `PoolRegistry`.
2. Initialization: Following deployment, much like typical upgradeable contracts, the new pool contract undergoes an initialization process.
3. Dependency Injection: After the pool is initialized, it may need specific dependencies to be fully operational. The `_injectDependencies` method injects dependencies to the pool and transfers injector permissions to the `PoolRegistry`.
4. Registration: The final phase in the setup process is the registration of the new pool contract in the registry. The `_register` method adds the pool to the `PoolRegistry` using its `addProxyPool` method.

```solidity
import "@solarity/solidity-lib/contracts-registry/pools/pool-factory/AbstractPoolFactory.sol";

contract PoolFactory is AbstractPoolFactory {
    address public poolRegistry;

    function setDependencies(
        address contractsRegistry_,
        bytes memory data_
    ) public override {
        super.setDependencies(contractsRegistry_, data_);

        poolRegistry = ContractsRegistry(contractsRegistry_).getPoolRegistry();
    }

    function deployPoolA(
        PoolA.Parameters calldata parameters_
    ) external returns (address) {
        address poolRegistry_ = poolRegistry;
        string memory poolAIdentifier_ = PoolRegistry(poolRegistry_).POOL_A();

        address poolABeaconProxy_ = _deploy(poolRegistry_, poolAIdentifier_);

        PoolA(poolABeaconProxy_).__PoolA_init(parameters_);

        _injectDependencies(poolRegistry_, poolABeaconProxy_);
        _register(poolRegistry_, poolAIdentifier_, poolABeaconProxy_);

        return poolABeaconProxy_;
    }
}
```

The final step is to add the `PoolRegistry` and `PoolFactory`  contracts to the `ContractsRegistry`. If the `ContractsRegistry` was created under a proxy, this can be done as an upgrade.

```solidity
contract ContractsRegistry is OwnableContractsRegistry {
    string public constant SYSTEM_CONTRACT_1 = "SYSTEM_CONTRACT_1";
    string public constant SYSTEM_CONTRACT_2 = "SYSTEM_CONTRACT_2";

    string public constant POOL_REGISTRY = "POOL_REGISTRY";
    string public constant POOL_FACTORY = "POOL_FACTORY";

    function getSystemContract1() external view returns (address) {
        return getContract(SYSTEM_CONTRACT_1);
    }

    function getSystemContract2() external view returns (address) {
        return getContract(SYSTEM_CONTRACT_2);
    }

    function getPoolRegistry() external view returns (address) {
        return getContract(POOL_REGISTRY);
    }

    function getPoolFactory() external view returns (address) {
        return getContract(POOL_FACTORY);
    }
}
```

Then the `migration` function can be extended with the deployment of the `PoolRegistry` and `PoolFactory` . Additionally, this extension involves deploying the `PoolA` implementation contract. Once deployed, the `PoolA` is added to the `PoolRegistry` via the `setNewImplementations` function.

```solidity
import "@solarity/solidity-lib/libs/utils/TypeCaster.sol";

using TypeCaster for string;

function migration() external {
    ContractsRegistry contractsRegistry_ = new ContractsRegistry();

    contractsRegistry_.__OwnableContractsRegistry_init();

    contractsRegistry_.addProxyContract(
        contractsRegistry_.SYSTEM_CONTRACT_1(),
        address(new SystemContract1())
    );
    contractsRegistry_.addContract(
        contractsRegistry_.SYSTEM_CONTRACT_2(),
        address(new SystemContract2())
    );
    contractsRegistry_.addProxyContract(
        contractsRegistry_.POOL_FACTORY(),
        address(new PoolFactory())
    );
    contractsRegistry_.addProxyContractAndCall(
        contractsRegistry_.POOL_REGISTRY(),
        address(new PoolFactory()),
        abi.encodeWithSelector(PoolRegistry.__PoolRegistry_init.selector)
    );

    contractsRegistry_.injectDependencies(contractsRegistry_.SYSTEM_CONTRACT_1());
    contractsRegistry_.injectDependencies(contractsRegistry_.POOL_FACTORY());
    contractsRegistry_.injectDependencies(contractsRegistry_.POOL_REGISTRY());

    PoolFactory poolFactory_ = PoolFactory(contractsRegistry_.getPoolFactory());
    PoolRegistry poolRegistry_ = PoolRegistry(contractsRegistry_.getPoolRegistry());

    string[] memory poolNames_ = poolRegistry_.POOL_A().asSingletonArray();
    address[] memory poolImplementations_ = address(new PoolA()).asSingletonArray();

    poolRegistry_.setNewImplementations(poolNames_, poolImplementations_);
    poolFactory_.deployPoolA(
        PoolA.Parameters({token1: address(1), token2: address(2)})
    );

    contractsRegistry_.transferOwnership(msg.sender);
}
```

After executing the `migration` function, all you need to access the addresses of both standalone and pool contracts is a `ContractsRegistry` instance.

```solidity
function accessContracts(ContractsRegistry contractsRegistry_) external {
    address systemContract1_ = contractsRegistry_.getSystemContract1();
    address poolRegistry_ = contractsRegistry_.getPoolRegistry();

    /// offset_ = 0, limit_ = 1
    address firstPoolA_ = PoolRegistry(poolRegistry_).listPools(
        PoolRegistry(poolRegistry_).POOL_A(),
        0,
        1
    )[0];

    SystemContract1(systemContract1_).systemContract1Method();
    PoolA(firstPoolA_).poolAMethod();
}
```

## Production References

* [dexe-network/DeXe-Protocol](https://github.com/dexe-network/DeXe-Protocol/tree/master) is entirely based on the Contracts Registry module.
