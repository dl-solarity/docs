# AERC1155Handler

## Overview

#### License: MIT

```solidity
abstract contract AERC1155Handler is ERC1155Holder
```


## Functions info

### getERC1155SignHash (0xb3ba3b70)

```solidity
function getERC1155SignHash(
    address token_,
    uint256 tokenId_,
    uint256 amount_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    uint256 chainId_,
    string calldata tokenURI_,
    IBridge.ERC1155BridgingType operationType_
) public pure returns (bytes32)
```

