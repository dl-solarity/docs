# ANativeHandler

## Overview

#### License: MIT

```solidity
abstract contract ANativeHandler
```


## Functions info

### receive

```solidity
receive() external payable
```


### getNativeSignHash (0x337e03a9)

```solidity
function getNativeSignHash(
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    uint256 chainId_
) public pure returns (bytes32)
```

