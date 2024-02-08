# 🧪 Tests

## Introduction

In this section, we focus on the standards for writing tests. Following these guidelines ensures our tests are both robust and intuitively structured for ease of use and future modifications.

## Guidelines

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### 1 Formatting

Tests and helper scripts are written in TypeScript. We follow [Google's TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) for fundamental coding principles. To ensure consistency, we use a [Prettier Plugin](https://github.com/prettier/prettier) for formatting. Like Solidity, you can format TypeScript code manually like this.

```bash
$ npm run lint-ts-fix
```

This command is automatically executed before each commit via the [Husky](https://github.com/typicode/husky) pre-commit hook, so you don't have to worry about running it yourself.

### 2 Coverage

We aim to maintain **100% all files test coverage**. For this, we rely on the [solidity-coverage](https://github.com/sc-forks/solidity-coverage) package. To check the coverage, execute the following command.

```bash
$ npm run coverage
```

Expected output.

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>% Stmts</th>
      <th>% Branch</th>
      <th>% Funcs</th>
      <th>% Lines</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>All files</td>
      <td>100</td>
      <td>100</td>
      <td>100</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

Sometimes, reaching 100% coverage can be challenging. For these situations, we recommend creating a contract within the `contracts/mock` folder. While mock contracts themselves are not included in the coverage metrics, they are highly beneficial. These can either inherit from the contract you're testing or provide specific functions to test a library. In tests, you can use these mock contracts to replace the original contract or library.

```solidity
contract PriorityQueueMock {
    using PriorityQueue for *;

    PriorityQueue.UintQueue internal _uintQueue;

    function addUint(uint256 value_, uint256 priority_) external {
        _uintQueue.add(value_, priority_);
    }
}
```

Additionally, make use of the helpful tools available in the [@nomicfoundation/hardhat-network-helpers](https://hardhat.org/hardhat-network-helpers/docs/reference) package, which is already installed in our repo. These tools can also assist in setting up test  scenarios that might be difficult to replicate, such as time-based tests.

```typescript
import { time } from "@nomicfoundation/hardhat-network-helpers";

await time.increase(60);
```

### 3 Code organization

Tests are written using the [Mocha](https://mochajs.org/) framework. Our main rule for test organization is to create one test file for each contract, and use one `describe` block for each contract function. Furthermore, the title of each `it` block has to begin with _should..._ to clearly articulate the expected behavior or outcome.

Suppose we have two contracts.

<code>ContractA.sol</code>

```solidity
contract ContractA {
    function name() external pure returns (string memory) {
        return "name";
    }

    function symbol() external pure returns (string memory) {
        return "symbol";
    }
}
```

<code>ContractB.sol</code>

```solidity
contract ContractB is ContractA {
    constructor() { /* ... */ }

    function decimals() external pure returns (uint256) {
        return 18;
    }
}
```

Then test files should look like this.

<code>ContractA.test.ts</code>

```typescript
describe("ContractA", () => {
  describe("name", () => {
    it("should return name properly", async () => { /* ... */ });
  });

  describe("symbol", () => {
    it("should return symbol properly", async () => { /* ... */ });
  });
});
```
<code>ContractB.test.ts</code>

```typescript
describe("ContractB", () => {
  describe("constructor", () => {
    it("should set parameters properly", async () => { /* ... */ });
  });

  describe("decimals", () => {
    it("should return decimals properly", async () => { /* ... */ });
  });
});
```

### 4 Reverter

Optimize tests performance by setting up primary contracts once in the top `before` block, rather than repeating this process before each test using the `beforeEach` block. Make a snapshot at the end of the `before` block and reset the blockchain state in the `afterEach` block using our `Reverter` tool. This approach ensures a consistent starting blockchain state for each test. We avoid using [fixtures](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures) that implement similar logic.

<Tabs>
<TabItem value="good" label="Good" default>

```typescript
import { Reverter } from "@/test/helpers/reverter";

describe("ContractB", () => {
    const reverter = new Reverter();

    let contractA: ContractA;
    let contractB: ContractB;

    before(async () => {
        const ContractA = await ethers.getContractFactory("ContractA");
        const ContractB = await ethers.getContractFactory("ContractB");

        contractA = await ContractA.deploy();
        contractB = await ContractB.deploy(await contractA.getAddress());

        await reverter.snapshot();
    });

    afterEach(reverter.revert);
});
```

</TabItem>
<TabItem value="bad" label="Bad">

```typescript
describe("ContractB", () => {
    let contractA: ContractA;
    let contractB: ContractB;

    beforeEach(async () => {
        const ContractA = await ethers.getContractFactory("ContractA");
        const ContractB = await ethers.getContractFactory("ContractB");

        contractA = await ContractA.deploy();
        contractB = await ContractB.deploy(await contractA.getAddress());
    });
});
```

</TabItem>
</Tabs>

### 5 Assertions

For assertions, we utilize the [Chai](https://www.chaijs.com/) library along with its `expect` interface. We also incorporate the [@nomicfoundation/hardhat-chai-matchers](https://hardhat.org/hardhat-chai-matchers/docs/reference) plugin. This plugin extends the capabilities of the `expect` statement, providing matchers for testing smart contracts.

<Tabs>
<TabItem value="good" label="Good" default>

```typescript
import { expect } from "chai";

const tx = erc20.mint(OWNER.address, wei(1000));

await expect(tx).to.changeTokenBalance(erc20, OWNER, wei(1000));
```

</TabItem>
<TabItem value="bad" label="Bad">

```typescript
import { assert } from "chai";

assert.equal(await erc20.balanceOf(SECOND.address), 0n);

await erc20.mint(SECOND.address, wei(1000));

assert.equal(await erc20.balanceOf(SECOND.address), wei(1000));
```

</TabItem>
</Tabs>

### **6 Other agreements**

**6.1 Wei**

Use the `wei` function for representing token balances.

<Tabs>
<TabItem value="good" label="Good" default>

```typescript
import { wei } from "@/scripts/utils/utils";

await erc20.mint(SECOND.address, wei(1000));
```

</TabItem>
<TabItem value="bad" label="Bad">

```typescript
await erc20.mint(SECOND.address, 1000n ** 18n);
```

</TabItem>
</Tabs>