# AERC721Handler

## Overview

#### License: MIT

```solidity
abstract contract AERC721Handler is ERC721Holder
```


## Functions info

### getERC721SignHash (0x6d7ec772)

```solidity
function getERC721SignHash(
    address token_,
    uint256 tokenId_,
    address receiver_,
    bytes32 txHash_,
    uint256 txNonce_,
    uint256 chainId_,
    string calldata tokenURI_,
    IBridge.ERC721BridgingType operationType_
) public pure returns (bytes32)
```

