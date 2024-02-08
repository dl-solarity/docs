# 🌳 Priority Queue

## Introduction

This Priority Queue offers a way to manage elements in a sequence based on their priority, ensuring that higher priority elements are processed first. This functionality is crucial in various applications, such as priority-based withdrawals or purchases, where users with higher stakes or urgency might need faster processing. Additionally, it's instrumental in reputation-based systems, where actions or rewards are determined by a user's standing.

## Implementation

The Priority Queue follows the structure of a complete binary heap that fulfills the property: each node is higher in priority than its children. In this setup, the highest priority element is always at the top of the heap.

<figure>
    <img src={require("/static/img/docs/priority-queue-diagram.png").default} alt=""/>
    <figcaption style={{"text-align": "center"}}>Priority queue and underlying binary heap</figcaption>
</figure>

As elements are added to the Priority Queue, they are initially placed at the bottom of the heap. This step is followed by a **shift up** process, where the added element is compared with its parent node and swapped if its priority is higher. This is repeated until the new element is properly positioned, ensuring that the heap's property is maintained. The efficiency of adding elements lies in the fact that the number of comparisons and potential swaps is proportional to the height of the heap, which is logarithmic in relation to the number of stored elements.

The interaction with the Priority Queue also involves operations of accessing and removing the highest priority element. Once this top element is removed, the heap must be restructured to find the next highest priority element. This is done through a **shift down** process. In this process, the last element in the heap is temporarily moved to the top and then iteratively shifted down the heap. At each iteration, it is compared with its child nodes, and if a child node has a higher priority, a swap is made. This process continues until the temporary top element finds its correct position in the heap, thus restoring the heap property.

It's important to note that while this Priority Queue guarantees access to the highest priority element, the overall order of elements is not guaranteed.

## Functions

To use the `PriorityQueue` library, you need to import it.

```solidity
import "@solarity/solidity-lib/libs/data-structures/PriorityQueue.sol";
```

And optionally bind it to the type with the `using` statement.

```solidity
using PriorityQueue for PriorityQueue.UintQueue;
using PriorityQueue for PriorityQueue.AddressQueue;
using PriorityQueue for PriorityQueue.Bytes32Queue;
```

### add

```solidity
function add(UintQueue storage queue, uint256 value_, uint256 priority_) internal;
```

```solidity
function add(Bytes32Queue storage queue, bytes32 value_, uint256 priority_) internal;
```

```solidity
function add(AddressQueue storage queue, address value_, uint256 priority_) internal;
```

#### Description

This function adds new elements to the `queue`. It balances the inner heap, placing the `value_` in its correct position based on its `priority_`.

#### Time complexity

`O(log(n))`,  where `n` is the length of the `queue`.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);
address john_ = address(3);

queue.add(alice_, 3); // [alice_:3]
queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.add(john_, 5);  // [bob_:10, john_:5, alice_:3]
```

### removeTop

```solidity
function removeTop(UintQueue storage queue) internal;
```

```solidity
function removeTop(Bytes32Queue storage queue) internal;
```

```solidity
function removeTop(AddressQueue storage queue) internal;
```

#### Description

This function removes the element with the highest priority from the `queue`. It balances the inner heap after removal. It will revert if called on an empty `queue`.

#### Time complexity

`O(log(n))`,  where `n` is the length of the `queue`.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);
address john_ = address(3);

queue.add(alice_, 3); // [alice_:3]
queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.add(john_, 5);  // [bob_:10, john_:5, alice_:3]

queue.removeTop();    // [john_:5, alice_:3]
queue.removeTop();    // [alice_:3]
queue.removeTop();    // []
queue.removeTop();    // Reverts with: "PriorityQueue: empty queue"
```

### topValue

```solidity
function topValue(UintQueue storage queue) internal view returns (uint256);
```

```solidity
function topValue(Bytes32Queue storage queue) internal view returns (bytes32);
```

```solidity
function topValue(AddressQueue storage queue) internal view returns (address);
```

#### Description

This function returns the value of the element with the highest priority in the `queue`. It is a read-only function. It will revert if called on an empty `queue`.

#### Time complexity

Constant.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);

queue.add(alice_, 3); // [alice_:3]
queue.topValue();     // address(1)

queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.topValue();     // address(2)

queue.removeTop();    // [alice_:3]
queue.topValue();     // address(1)

queue.removeTop();    // []
queue.topValue();     // Reverts with: "PriorityQueue: empty queue"
```

### top

```solidity
function top(UintQueue storage queue) internal view returns (uint256, uint256);
```

```solidity
function top(Bytes32Queue storage queue) internal view returns (bytes32, uint256);
```

```solidity
function top(AddressQueue storage queue) internal view returns (address, uint256);
```

#### Description

This function returns the value and priority of the element with the highest priority in the `queue`. It is a read-only function. It will revert if called on an empty `queue`.

#### Time complexity

Constant.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);

queue.add(alice_, 3); // [alice_:3]
queue.top();          // (address(1), 3)

queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.top();          // (address(2), 10)

queue.removeTop();    // [alice_:3]
queue.top();          // (address(1), 3)

queue.removeTop();    // []
queue.top();          // Reverts with: "PriorityQueue: empty queue"
```

### length

```solidity
function length(UintQueue storage queue) internal view returns (uint256);
```

```solidity
function length(Bytes32Queue storage queue) internal view returns (uint256);
```

```solidity
function length(AddressQueue storage queue) internal view returns (uint256);
```

#### Description

This function returns the number of elements of the `queue`. It's a read-only function.

#### Time complexity

Constant.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);

queue.add(alice_, 3); // [alice_:3]
queue.length();       // 1

queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.length();       // 2

queue.removeTop();    // [alice_:3]
queue.length();       // 1

queue.removeTop();    // []
queue.length();       // 0
```

### values

```solidity
function values(
    UintQueue storage queue
) internal view returns (uint256[] memory values_);
```

```solidity
function values(
    Bytes32Queue storage queue
) internal view returns (bytes32[] memory values_);
```

```solidity
function values(
    AddressQueue storage queue
) internal view returns (address[] memory values_);
```

#### Description

This function returns all the `values_` stored in the `queue` in any order. Exercise caution when calling on large queues due to potential high gas consumptions. It is a read-only function.

#### Time complexity

`O(n)`,  where `n` is the length of the `queue`.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);
address john_ = address(3);

queue.add(alice_, 3); // [alice_:3]
queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.add(john_, 20); // [john_:20, bob_:10, alice_:3]

queue.values(); // [address(3), address(1), address(2)]
```

### elements

```solidity
function elements(
    UintQueue storage queue
) internal view returns (uint256[] memory values_, uint256[] memory priorities_); 
```

```solidity
function elements(
    Bytes32Queue storage queue
) internal view returns (bytes32[] memory values_, uint256[] memory priorities_);
```

```solidity
function elements(
    AddressQueue storage queue
) internal view returns (address[] memory values_, uint256[] memory priorities_);
```

#### Description

This function returns all the `values_` and their corresponding `priorities_` stored in the `queue` in any order. Exercise caution when calling on large queues due to potential high gas consumptions. It is a read-only function.

#### Time complexity

`O(n)`, where `n` is the length of the `queue`.

#### Example

```solidity
PriorityQueue.AddressQueue public queue;

address alice_ = address(1);
address bob_ = address(2);
address john_ = address(3);

queue.add(alice_, 3); // [alice_:3]
queue.add(bob_, 10);  // [bob_:10, alice_:3]
queue.add(john_, 20); // [john_:20, bob_:10, alice_:3]

queue.values(); // ([address(3), address(1), address(2)], [20, 3, 10])
```
