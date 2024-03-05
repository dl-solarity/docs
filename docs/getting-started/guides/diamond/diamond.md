# 💎 Diamond

## Introduction

The Diamond module contains a custom implementation of the [ERC-2535: Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535), designed to be fully compatible with this standard.

The Diamond pattern allows for creating virtually unlimited size contracts by dividing large contracts into smaller ones. These small contracts share the same storage and work together seamlessly as if they were a single contract. This approach is particularly useful for the following cases:

- **Overcoming Bytecode Size Limits:** Smart contracts have a bytecode size limit of 24 KB. If your contract exceeds this size, it will be impossible to deploy it. The Diamond Pattern solves this by allowing you to divide a large contract into smaller ones, each fitting within the size constraints.
- **Simplifying Development and Maintenance:** By splitting a big contract into smaller parts, it becomes easier to develop and maintain each piece. Smaller contracts are better suited for adding features and are less prone to errors, making overall management more efficient.
- **Flexible Upgradability:** The Diamond pattern provides an efficient way to upgrade smart contracts by allowing functions to be selectively enabled or disabled. This method is more convenient as it eliminates the need to redeploy the entire implementation contract.

## Implementation

<figure>
    <img src={require("/static/img/docs/diamond-diagram.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>Diamond with 3 facets</figcaption>
</figure>

#### 1 Facets and Selectors

The **Diamond** serves as a proxy contract linked to multiple implementation contracts called **facets**. Each facet is assigned unique function **selectors**, ensuring no overlap in selectors across different facets. In the Diamond proxy, like standard proxies, the `fallback` method is essential for handling client calls. This method identifies the requested function selector, locates the facet containing this method, and `delegatecall` execution to it.

#### 2 Diamond Cut and Diamond Loupe

The Diamond proxy contains two primary sets of functions: the **diamond cut** and the **diamond loupe**.

The `diamondCut` function is essential for managing facets and selectors, allowing them to be added, replaced, or removed.

In parallel, the diamond loupe is a group of view functions utilized for accessing the current configuration of facets and selectors. These functions include:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>facets</code></td>
      <td>Provides a list of all facets and their associated function selectors</td>
    </tr>
    <tr>
      <td><code>facetFunctionSelectors</code></td>
      <td>Details the function selectors linked to a specific facet</td>
    </tr>
    <tr>
      <td><code>facetAddresses</code></td>
      <td>Lists all the facets</td>
    </tr>
    <tr>
      <td><code>facetAddress</code></td>
      <td>Returns the address of the facet implementing a given function selector</td>
    </tr>
  </tbody>
</table>

#### **3 Storage and Initialization**

Facets often require own state for proper functionality. Storing this state beginning from `slot0` inside the facet may lead to collisions due to the shared storage space among facets. To resolve this, each stateful facet defines a struct to represent its state and allocates a unique storage slot for this struct. This slot is typically calculated by hashing a string associated with the facet's name. The state can then be simply accessed using the `sload` assembly function.

ERC-2535 recommends storing the slot key and function for accessing the storage struct within an internal library. Our implementation improves upon this by defining these elements in a separate contracts called **storages**, which facets are required to inherit. Once inherited, facets are then responsible for providing functions that modify the storage. This structure clearly separates functions that view data from those that alter it. This approach offers several key advantages:

* By examining the inheritance list, anyone can easily identify the storages utilized by a particular facet, enhancing clarity and understanding of the contract's structure.
* This structure facilitates the conversion of upgradeable contracts into diamond-compatible ones.
* Facets can effortlessly manage multiple storages, allowing for more flexible and powerful contract interactions and data handling.

Additionally, there are cases when you might require an **initializable** facet. To facilitate this, inherit from the `InitializableStorage` contract, which can be imported from our Diamond module. This allows the use of  `initialize` and `onlyInitializing` modifiers, similar to those in standard upgradeable contracts. When you add a new facet through the `diamondCut`, the initialization process is designed to be executed a single time, preventing reinitialization and maintaining the facet's state integrity.

#### 4 Presets

It's important to secure the `diamondCut` function in your Diamond. To achieve this, consider using our `OwnableDiamond` preset. This preset inherits the `OwnableDiamondStorage` and uses the `onlyOwner` modifier from it, ensuring that only the owner can manage facets and selectors.

#### 5 Predefined facets/storages

If you want your Diamond to behave like an `ERC20`, `ERC721`, or other popular standard, check out our constantly evolving list of predefined facets and storages. It might have what you need, saving you time in development.

<table>
  <thead>
    <tr>
      <th>Facet/Storage Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/tree/master/contracts/diamond/tokens/ERC20">DiamondERC20</a></td>
      <td>OpenZeppelin ERC20-based Facet</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/tree/master/contracts/diamond/tokens/ERC721">DiamondERC721</a></td>
      <td>OpenZeppelin ERC721-based Facet</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/diamond/introspection/DiamondERC165.sol">DiamondERC165</a></td>
      <td>OpenZeppelin ERC165-based Facet</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/tree/master/contracts/diamond/access/ownable">DiamondOwnable</a></td>
      <td>OpenZeppelin Ownable-based Facet</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/tree/master/contracts/diamond/access/access-control">DiamondAccessControl</a></td>
      <td>OpenZeppelin AccessControl-based Facet</td>
    </tr>
    <tr>
      <td><a href="https://github.com/dl-solarity/solidity-lib/blob/master/contracts/diamond/utils/InitializableStorage.sol">InitializableStorage</a></td>
      <td>OpenZeppelin Initializable-based Storage</td>
    </tr>
  </tbody>
</table>

## Example

Imagine we want to create a diamond contract where anyone can deposit tokens, but only the owner can withdraw them. This functionality can be divided into two facets: `DepositFacet` and `WithdrawFacet`. In the `withdraw` function, applying an `onlyOwner` modifier is critical for security. Instead of building this modifier from scratch, we can efficiently inherit it from `OwnableDiamondStorage`. This is enabled by the `OwnableDiamond` preset, which uses `OwnableDiamondStorage` to store information about the diamond's deployer. This way facets can access and utilize each other's storages since they also operate on the same storage space.

```solidity
import "@solarity/solidity-lib/diamond/presets/OwnableDiamond/OwnableDiamond.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract DepositFacet {
    using SafeERC20 for IERC20;

    function deposit(IERC20 token_, uint256 amount_) external {
        token_.safeTransferFrom(msg.sender, address(this), amount_);
    }
}

contract WithdrawFacet is OwnableDiamondStorage {
    using SafeERC20 for IERC20;

    function withdraw(
        IERC20 token_, 
        address to_, 
        uint256 amount_
    ) external onlyOwner {
        token_.safeTransfer(to_, amount_);
    }
}
```

To set up a Diamond, start by deploying the `OwnableDiamond` contract. Then, individually deploy each facet, and prepare their function selectors. Construct a diamond cut comprising facets and selectors, and execute it on the Diamond for integration. If needed, transfer ownership of the Diamond. This process sets up your Diamond with the desired functionalities and structure.

```solidity
function deploy() external returns (address payable diamond_) {
    diamond_ = payable(new OwnableDiamond());
 
    address depositFacet_ = address(new DepositFacet());
    
    bytes4[] memory depositSelectors_ = new bytes4[](1);
    depositSelectors_[0] = DepositFacet.deposit.selector;
 
    address withdrawFacet_ = address(new WithdrawFacet());
    
    bytes4[] memory withdrawSelectors_ = new bytes4[](1);
    withdrawSelectors_[0] = WithdrawFacet.withdraw.selector;
    
    Diamond.Facet[] memory facets_ = new Diamond.Facet[](2);
    
    facets_[0] = Diamond.Facet(
        depositFacet_, 
        Diamond.FacetAction.Add, 
        depositSelectors_
    );
    facets_[1] = Diamond.Facet(
        withdrawFacet_, 
        Diamond.FacetAction.Add, 
        withdrawSelectors_
    );
  
    OwnableDiamond(diamond_).diamondCut(facets_);
    
    OwnableDiamond(diamond_).transferOwnership(msg.sender);
}
```

Once the facets are added, you can interact with the diamond by casting its address to the specific facet interface.

```solidity
function interactWithDiamond(address diamond_, IERC20 token_) external {
    token_.approve(diamond_, 1 ether);

    DepositFacet(diamond_).deposit(token_, 1 ether);

    WithdrawFacet(diamond_).withdraw(token_, msg.sender, 0.5 ether);
}
```

Now consider we want to add a new feature to our Diamond, enabling it to exchange tokens on a DEX such as UniswapV2. To achieve this, we'll implement a separate storage to hold the UniswapV2 router contract address. Additionally, we'll develop a new facet, equipped with a function to swap tokens. This facet will interact with the UniswapV2 router, using the address stored in the new storage to execute token swaps.

```solidity
import "@solarity/solidity-lib/diamond/presets/OwnableDiamond/OwnableDiamond.sol";
import "@solarity/solidity-lib/diamond/utils/InitializableStorage.sol";

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";

contract UniswapV2Storage {
    struct DUniswapV2Storage {
        address router;
    }

    bytes32 public constant UNISWAP_V2_STORAGE_SLOT = 
        keccak256("diamond.standard.univ2.storage");

    function getUniswapV2Router() public view returns (address uniswapV2Router_) {
        return _getUniswapV2Storage().router;
    }

    function _getUniswapV2Storage()
        internal
        pure
        returns (DUniswapV2Storage storage _uniswapV2Storage)
    {
        bytes32 slot_ = UNISWAP_V2_STORAGE_SLOT;

        assembly {
            _uniswapV2Storage.slot := slot_
        }
    }
}

contract UniswapV2Facet is 
    UniswapV2Storage, 
    OwnableDiamondStorage, 
    InitializableStorage 
{
    function __UniswapV2Facet_init(
        address router_
    ) external initializer(UNISWAP_V2_STORAGE_SLOT) {
        _getUniswapV2Storage().router = router_;
    }

    function swapExactTokensForTokensV2(
        uint256 amountIn_,
        uint256 amountOutMin_,
        address[] calldata path_,
        address receiver_
    ) external onlyOwner {
        address uniswapV2router_ = getUniswapV2Router();

        /// approve, etc.

        IUniswapV2Router01(uniswapV2router_).swapExactTokensForTokens(
            amountIn_,
            amountOutMin_,
            path_,
            receiver_,
            block.timestamp
        );
    }
}
```

The provided code listing highlights key aspects in implementing custom storage and facets:

* When a facet requires its own unique storage, it must be manually implemented. This includes defining a struct to represent the storage, such as `DUniswapV2Storage`, and a function to retrieve this storage struct using a slot key, e.g. `_getUniswapV2Storage`.
* The slot key for a specific storage is typically computed as `keccak256("diamond.standard.facetname.storage")`. This ensures that each facet's storage slot is uniquely identified.
* Facets can include initialization functions. The `initializer` modifier, inherited from `InitializableStorage`, takes the slot key as an argument to ensure that the facet is initialized only once.

Finally, the Diamond can be upgraded by executing a UniswapV2 diamond cut. This upgrade involves deploying the `UniswapV2Facet` and preparing its function selectors.  Additionally, an initialization function is included in the upgrade process. This function is designed to be called only once to set up the `UniswapV2Facet`, and it does not need to be set as an active facet selector. This upgrade adds UniswapV2 functionality to the Diamond, expanding its capabilities.

```solidity
function upgradeDiamond(
    address payable diamond_,
    address uniswapV2Router_
) external {
    address uniswapV2Facet_ = address(new UniswapV2Facet());

    bytes4[] memory uniswapV2Selectors_ = new bytes4[](2);
    uniswapV2Selectors_[0] = UniswapV2Storage.getUniswapV2Router.selector;
    uniswapV2Selectors_[1] = UniswapV2Facet.swapExactTokensForTokensV2.selector;

    Diamond.Facet[] memory facets_ = new Diamond.Facet[](1);

    facets_[0] = Diamond.Facet(
        uniswapV2Facet_, 
        Diamond.FacetAction.Add, 
        uniswapV2Selectors_
    );

    OwnableDiamond(diamond_).diamondCut(
        facets_,
        uniswapV2Facet_,
        abi.encodeWithSelector(
            UniswapV2Facet.__UniswapV2Facet_init.selector, 
            uniswapV2Router_
        )
    );
}
```

Congratulations! Now you can invoke methods related to the `UniswapV2Router`, such as token swaps, directly on the Diamond, utilizing the newly integrated UniswapV2 functionality.

```solidity
function interactWithUpgradedDiamond(address diamond_) external {
    address uniswapV2Router = UniswapV2Facet(diamond_).getUniswapV2Router();
    
    UniswapV2Facet(diamond_).swapExactTokensForTokensV2(...);
 
    /// ...
}
```

An additional technique you may find useful is the ability to call one facet from another. Since they operate within the same storage space, you can simply make a `delegatecall` to another facet's address. The address of the facet can be obtained using the `facetAddress` function from the diamond loupe, which can be inherited from the `DiamondStorage` contract. Here's an example illustrating the implementation of the `DepositSwapFacet`, which sequentially calls the `DepositFacet` and the `UniswapV2Facet`.

```solidity
import "@solarity/solidity-lib/diamond/DiamondStorage.sol";

contract DepositSwapFacet is DiamondStorage {
    function depositAndSwap(
        IERC20 token_, 
        uint256 amount_,
        bytes calldata swapData_
    ) external {
        address depositFacet_ = facetAddress(DepositFacet.deposit.selector);
        address uniswapV2Facet_ = facetAddress(
            UniswapV2Facet.swapExactTokensForTokensV2.selector
        );

        (bool ok_, ) = depositFacet_.delegatecall(
            abi.encodeWithSelector(DepositFacet.deposit.selector, token_, amount_)
        );

        require(ok_);

        (ok_, ) = uniswapV2Facet_.delegatecall(swapData_);
        
        require(ok_);
    }
}
```

## Production References

* [rarimo/evm-swap-contracts-v2](https://github.com/rarimo/evm-swap-contracts-v2) utilizes the Diamond module for its custom [uniswap/universal-router](https://github.com/Uniswap/universal-router/tree/main) implementation.
