# OwnableContractsRegistry

## Contract Description


License: MIT

## 

```solidity
contract OwnableContractsRegistry is AbstractContractsRegistry, OwnableUpgradeable
```

The Ownable preset of ContractsRegistry
## Functions info

### __OwnableContractsRegistry_init (0x1bae7a65)

```solidity
function __OwnableContractsRegistry_init() public initializer
```


### injectDependencies (0x1adad8cf)

```solidity
function injectDependencies(string calldata name_) external onlyOwner
```


### injectDependenciesWithData (0xbe96dc3e)

```solidity
function injectDependenciesWithData(
    string calldata name_,
    bytes calldata data_
) external onlyOwner
```


### upgradeContract (0x1271bd53)

```solidity
function upgradeContract(
    string calldata name_,
    address newImplementation_
) external onlyOwner
```


### upgradeContractAndCall (0x6bbe8694)

```solidity
function upgradeContractAndCall(
    string calldata name_,
    address newImplementation_,
    bytes calldata data_
) external onlyOwner
```


### addContract (0xbf5b6016)

```solidity
function addContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```


### addProxyContract (0xe0e084f8)

```solidity
function addProxyContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```


### addProxyContractAndCall (0x423c072b)

```solidity
function addProxyContractAndCall(
    string calldata name_,
    address contractAddress_,
    bytes calldata data_
) external onlyOwner
```


### justAddProxyContract (0x51dad82c)

```solidity
function justAddProxyContract(
    string calldata name_,
    address contractAddress_
) external onlyOwner
```


### removeContract (0x97623b58)

```solidity
function removeContract(string calldata name_) external onlyOwner
```

