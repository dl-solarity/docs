# 💻 Solidity

## Introduction

This section is dedicated to outlining the best Solidity practices and style guidelines that we adhere to. By following these guidelines, we ensure that each contribution not only enhances the capabilities of our library, but also maintains a high standard of code clarity. This uniform approach to coding is essential to prevent vulnerabilities, streamline collaboration, and create a robust foundation for both new and experienced developers.

## Guidelines

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### 1 Formatting

At the foundational level, we align closely with the official [Solidity's Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html). To assist in maintaining these standards, we've integrated a [Prettier Solidity Plugin](https://github.com/prettier-solidity/prettier-plugin-solidity). You can format Solidity code manually like this.

```bash
$ npm run lint-sol-fix
```

This command is automatically executed before each commit via the [Husky](https://github.com/typicode/husky) pre-commit hook, so you don't have to worry about running it yourself.

### 2 Naming

#### 2.1 Contract functions

Internal and private contract functions have an underscore before the name, while public and external ones have no underscore.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodContractFunctions {
    function externalFunction() external {}

    function publicFunction() public {}

    function _internalFunction() internal {}

    function _privateFunction() private {}
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadContractFunctions {
    function externalFunction_() external {}

    function _externalFunction() external {}

    function publicFunction_() public {}

    function _publicFunction() public {}

    function internalFunction() internal {}

    function internalFunction_() internal {}

    function privateFunction() private {}

    function privateFunction_() private {}
}
```

</TabItem>
</Tabs>

#### 2.2 Library functions

Internal functions in internal libs (without external and public functions) are named without an underscore before the name.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
library GoodInternalLibFunctions {
    function internalLibFunction() internal {}

    function _privateFunction() private {}
}

library GoodExternalLibFunctions {
    function externalFunction() external {}

    function publicFunction() public {}

    function _internalLibFunction() internal {}

    function _privateFunction() private {}
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
library BadInternalLibFunctions {
    function _internalLibFunction() internal {}

    function privateFunction() private {}
}

library BadExternalLibFunctions {
    function _externalFunction() external {}

    function _publicFunction() public {}

    function internalLibFunction() internal {}

    function privateFunction() private {}
}
```

</TabItem>
</Tabs>

#### 2.3 Storage variables

Internal and private storage variables are named with an underscore before the name, while public ones have no underscore. If you want to declare a variable of type storage, the name of such a variable will have the same format as the storage variable. Storage parameters have no underscores.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodStorageVariables {
    struct Point {
        uint256 x;
        uint256 y;
    }

    Point[] internal _points;

    uint256 public storageVariable1;
    uint256 internal _storageVariable2;
    uint256 private _storageVariable3;

    function someFunction() external {
        uint256 pointsLength_ = points.length;

        for (uint256 i = 0; i < pointsLength_; ++i) {
            Point storage _point = points[i];

            _processPoint(_point);
        }
    }

    function _processPoint(Point storage point) private {}
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadStorageVariables {
    struct Point {
        uint256 x;
        uint256 y;
    }

    Point[] internal points;

    uint256 public storageVariable1_;
    uint256 internal storageVariable2_;
    uint256 private storageVariable3;

    function someFunction() {
        uint256 pointsLength_ = points.length;

        for (uint256 i = 0; i < pointsLength_; ++i) {
            Point storage point = points[i];

            _processPoint(point);
        }

        for (uint256 i = 0; i < pointsLength_; ++i) {
            Point storage point_ = points[i];

            _processPoint2(point_);
        }
    }

    function _processPoint(Point storage point_) private {}

    function _processPoint2(Point storage _point) private {}
}
```

</TabItem>
</Tabs>

#### 2.4 Local variables

Local variables, both `memory` and `calldata`, including function arguments, are named with an underscore at the end. Exception: loop iterator variable.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodLocalVariables {
    function someFunction(
        uint256 localVariable1_,
        string memory localVariable2_,
        string calldata localVariable3_
    ) external {
        uint256 localVariable4_ = 1;
        string memory localVariable5_ = "hello";

        for (uint256 i = 0; i < 10; ++i) {}
    }
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadLocalVariables {
    function someFunction(
        uint256 _localVariable1,
        string memory localVariable2,
        string calldata _localVariable3
    ) external {
        uint256 localVariable4 = 1;
        string memory _localVariable5 = "hello";

        for (uint256 i_ = 0; i_ < 10; ++i_) {}
    }
}
```

</TabItem>
</Tabs>

#### 2.5 Event parameters

Event parameters are named without underscores. The name of the event must refer to an action that has already happened.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
interface IGoodEventParameterNames {
    event GoodEvent(uint256 firstParam, string secondParam);
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
interface IBadEventParameterNames {
    event BadEvent(uint256 firstParam_, string _secondParam);
}
```

</TabItem>
</Tabs>

#### 2.6 Constant and immutable variables

Constant and immutable variables are named with SCREAMING\_SNAKE\_CASE. Internal and private constant and immutable variables are named with an underscore before the name, while public ones have no underscore.&#x20;

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodConstantNames {
    uint256 public constant PUBLIC_CONSTANT = 1;
    uint256 internal constant _INTERNAL_CONSTANT = 1;
    uint256 private constant _PRIVATE_CONSTANT = 1;

    uint256 public immutable PUBLIC_IMMUTABLE = 1;
    uint256 internal immutable _INTERNAL_IMMUTABLE = 1;
    uint256 private immutable _PRIVATE_IMMUTABLE = 1;
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadConstantNames {
    uint256 public constant _PUBLIC_CONSTANT = 1;
    uint256 internal constant INTERNAL_CONSTANT = 1;
    uint256 private constant PRIVATE_CONSTANT = 1;

    uint256 public immutable _PUBLIC_IMMUTABLE = 1;
    uint256 internal immutable INTERNAL_IMMUTABLE = 1;
    uint256 private immutable PRIVATE_IMMUTABLE = 1;

    uint256 public constant publicConstant = 1;
    uint256 internal immutable _internalImmutable = 1;
    uint256 private immutable _privateImmutable = 1;
}
```

</TabItem>
</Tabs>

### 3 NatSpec and Comments

#### 3.1 All contracts must be documented using NatSpec

All NatSpec should be written in multi-line comments. Start with a `@notice` tag to describe the contract. This comment should include the module to which the contract belongs. For functions, use `@notice` to explain what they do, `@param` for each parameter, and `@return` for the return value. The `@dev` tag is also available for additional developer comments, providing deeper insights or explanations. Ideally, NatSpec should be written in the contract's interface. In cases where a contract doesn't have an interface, the documentation should be included in the contract implementation itself.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
/**
 * @notice The Hasher module
 */
interface IHasher {
    /**
     * @notice The function to calculate the keccak256 of two values
     * @param lhs_ the left-hand side value
     * @param rhs_ the right-hand side value
     * @return result_ the keccak256 of two values
     */
    function hash2(
        bytes32 lhs_,
        bytes32 rhs_
    ) external pure returns (bytes32 result_);
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
// The Hasher module
interface IHasher {
    // @notice The function to calculate the keccak256 of two values.
    // lhs_ is the left-hand side value.
    // rhs_ is the right-hand side value.
    // result_ is the keccak256 of two values.
    function hash2(
        bytes32 lhs_,
        bytes32 rhs_
    ) external pure returns (bytes32 result_);
}
```

</TabItem>
</Tabs>

#### 3.2 Comments in the implementation can be not written at all

If additional explanations are needed, write them as a single line comment.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
// Concatenates values and computes keccak256
assembly {
    mstore(0, lhs_)
    mstore(32, rhs_)
    
    result_ := keccak256(0, 64)
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
/**
 * Concatenates values and computes keccak256
 */
assembly {
    mstore(0, lhs_)
    mstore(32, rhs_)
    
    result_ := keccak256(0, 64)
}
```

</TabItem>
</Tabs>

### 4 Errors

#### 4.1 Error handling

For error handling, primarily use the `require` statement. The `revert` message statement may be used for more complex conditions but it is less common. Avoid using custom errors.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodErrorStatement {
    function someFunction() external {
        (bool ok_, ) = address(0x...).call{value: 1 ether}("");
        require(ok_, "GoodErrorHandling: transfer failed");

        if (/* Some complex condition */) {
            revert("GoodErrorHandling: condition failed");
        }
    }
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadErrorHandling {
    error TransferFailed();

    function someFunction() external {
        (bool ok_, ) = address(0x...).call{value: 1 ether}("");

        if (!ok_) {
            revert TransferFailed();
        }
    }
}
```

</TabItem>
</Tabs>

#### 4.2 Error messages

Error messages should begin with the contract name or its abbreviation, formatted as "SomeContractName: ..." or "SCN: ...", respectively. Aim to keep these messages as short as possible to optimize gas usage. Avoid errors with no message.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodErrorMessages {
    function someFunction() external {
        (bool ok_, ) = address(0x..).call{value: 1 ether}("");
        require(ok_, "GoodErrorMessages: transfer failed");

        (ok_, ) = address(0x..).call{value: 1 ether}("");
        require(ok_, "GEM: transfer failed");
    }
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadErrorMessages {
    function someFunction() external {
        (bool ok_, ) = address(0x..).call{value: 1 ether}("");
        require(ok_, "Transfer failed");

        (ok_, ) = address(0x..).call{value: 1 ether}("");
        require(ok_);
    }
}
```

</TabItem>
</Tabs>

### 5 Optimizations

While we prioritize gas optimization in our code, readability remains equally important. As such, we don't engage in extreme optimization practices that could obscure code understanding or maintainability. To guide our approach, below are examples illustrating when optimization is necessary and when it's not.

#### 5.1 Unchecked &#x20;

Use `unchecked` statements only to migrate code from older Solidity versions. Avoid using it for loop iterator variables as it reduces readability.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
for (uint256 i = 0; i < 10; ++i) {}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
for (uint256 i = 0; i < 10; ) {
    unchecked {
        ++i;
    }
}
```

</TabItem>
</Tabs>

#### 5.2 Storage usage

Optimize gas by not reusing the same storage repeatedly. Always save storage array lengths before loops. Declare variables inside functions to reduce repeated calls to storage.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodStorageUsage {
    struct Point {
        uint256 x;
        uint256 y;
    }

    Point[] public points;

    function someFunction() external {
        uint256 pointsLength_ = points.length;

        for (uint256 i = 0; i < pointsLength_; ++i) {
            Point memory point_ = points[i];

            _processPoint(point_);
            _processPoint2(point_);
        }
    }

    function _processPoint(Point memory point_) private {}

    function _processPoint2(Point memory point_) private {}
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract GoodStorageUsage {
    struct Point {
        uint256 x;
        uint256 y;
    }

    Point[] public points;

    function someFunction() external {
        for (uint256 i = 0; i < points.length; ++i) {
            _processPoint(points[i]);
            _processPoint2(points[i]);
        }
    }

    function _processPoint(Point memory point_) private {}

    function _processPoint2(Point memory point_) private {}
}
```

</TabItem>
</Tabs>

### 6 Other agreements

#### 6.1 License

All our contracts are under the MIT License. This ensures that they can be freely used, modified, and distributed.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
// SPDX-License-Identifier: MIT
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
// SPDX-License-Identifier: UNLICENSED
```

</TabItem>
</Tabs>

#### 6.2 Solidity version

Use Solidity version 0.8.4. Exceptions for specific integrations are possible but must be discussed on a case-by-case basis.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
pragma solidity ^0.8.4;
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
pragma solidity 0.8.0;
```

</TabItem>
</Tabs>

#### 6.3 Imports

Use named imports.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

</TabItem>
</Tabs>

#### 6.4 Internal storage variables

Explicitly specify `internal` keyword for internal storage variables.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodInternalStorageVariables {
    uint256 internal _internalVariable;
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadInternalStorageVariables {
    uint256 _internalVariable;
}
```

</TabItem>
</Tabs>

#### 6.5 Type cuts

Use `uint256` and `int256` types instead of `uint` and `int` cuts.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodTypeCuts {
    uint256 public variable1;
    mapping(int256 => uint256) public variable2;

    function someFunction(uint256 varaible3_, int256 variable4_) external {}
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadTypeCuts {
    uint public variable1;
    mapping(int => uint) public variable2;

    function someFunction(uint varaible3_, int variable4_) external {}
}
```

</TabItem>
</Tabs>

#### 6.6 Transfer of native currency

Use low-level calls for transferring native currency instead of `transfer` and `send`.

<Tabs>
<TabItem value="good" label="Good" default>

```solidity
contract GoodTransfer {
    function someFunction() external {
        (bool ok_, ) = address(0x..).call{value: 1 ether}("");
        require(ok_, "GoodTransfer: transfer failed");
    }
}
```

</TabItem>
<TabItem value="bad" label="Bad">

```solidity
contract BadTransfer {
    function someFunction() external {
        (0x..).transfer(1 ether);

        bool ok_ = (0x..).send(1 ether);
        require(ok_, "BadTransfer: transfer failed");
    }
}
```

</TabItem>
</Tabs>
