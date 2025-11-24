# ERC20Handler

## Overview

#### License: MIT

```solidity
contract ERC20Handler is IHandler
```


## Enums info

### ERC20BridgingType

```solidity
enum ERC20BridgingType {
	 LiquidityPool,
	 Wrapped,
	 USDCType
}
```


## Structs info

### ERC20DispatchData

```solidity
struct ERC20DispatchData {
	address token;
	uint256 amount;
	string receiver;
	string network;
	bytes batch;
	ERC20Handler.ERC20BridgingType operationType;
}
```


### ERC20RedeemData

```solidity
struct ERC20RedeemData {
	address token;
	uint256 amount;
	address receiver;
	bytes batch;
	ERC20Handler.ERC20BridgingType operationType;
	bytes32 nonce;
}
```

Nonce is computed as keccak256(abi.encodePacked(originNetworkName, originTxHash, eventNumber)).
## Events info

### DispatchedERC20

```solidity
event DispatchedERC20(address token, uint256 amount, string receiver, string network, bytes batch, ERC20Handler.ERC20BridgingType operationType)
```


## Functions info

### dispatch (0xab7fff18)

```solidity
function dispatch(bytes calldata dispatchDetails_) external payable virtual
```

A function to dispatch assets or messages from the origin chain.


Parameters:

| Name             | Type  | Description                                   |
| :--------------- | :---- | :-------------------------------------------- |
| dispatchDetails_ | bytes | encoded data defining the dispatch operation. |

### redeem (0x3841185e)

```solidity
function redeem(
    IBatcher batcher_,
    bytes calldata redeemDetails_
) external virtual
```

A function to redeem assets or messages on the destination chain.


Parameters:

| Name           | Type              | Description                                            |
| :------------- | :---------------- | :----------------------------------------------------- |
| batcher_       | contract IBatcher | the batcher contract coordinating batched executions.  |
| redeemDetails_ | bytes             | encoded data defining the redeem operation.            |

### getOperationHash (0xfd0532cf)

```solidity
function getOperationHash(
    IBridge bridge_,
    string calldata network_,
    bytes calldata redeemDetails_
) external view virtual returns (bytes32)
```

A function to compute a redeem operation hash used for signing.


Parameters:

| Name           | Type             | Description                        |
| :------------- | :--------------- | :--------------------------------- |
| bridge_        | contract IBridge | the bridge contract.               |
| network_       | string           | the network name.                  |
| redeemDetails_ | bytes            | encoded redeem operation details.  |


Return values:

| Name | Type    | Description                                    |
| :--- | :------ | :--------------------------------------------- |
| [0]  | bytes32 | Operation hash to be signed by bridge signers. |
