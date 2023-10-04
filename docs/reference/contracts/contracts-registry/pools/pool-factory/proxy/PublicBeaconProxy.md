# PublicBeaconProxy

## Contract Description


License: MIT

## 

```solidity
contract PublicBeaconProxy is BeaconProxy
```

The PoolContractsRegistry module

The helper BeaconProxy that get deployed by the PoolFactory. Note that the external
`implementation()` function is added to the contract to provide compatability with the
Etherscan. This means that the implementation must not have such a function declared.
## Functions info

### constructor

```solidity
constructor(
    address beacon_,
    bytes memory data_
) payable BeaconProxy(beacon_, data_)
```


### implementation (0x5c60da1b)

```solidity
function implementation() external view virtual returns (address)
```

The function that returns implementation contract this proxy points to


Return values:

| Name | Type    | Description                        |
| :--- | :------ | :--------------------------------- |
| [0]  | address | address the implementation address |
