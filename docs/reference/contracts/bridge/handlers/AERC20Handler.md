# AERC20Handler

## Overview

#### License: MIT

```solidity
abstract contract AERC20Handler
```


## Functions info

### getERC20SignHash (0x255a932d)

```solidity
function getERC20SignHash(
    address token_,
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    uint256 chainId_,
    IBridge.ERC20BridgingType operationType_
) public pure returns (bytes32)
```

