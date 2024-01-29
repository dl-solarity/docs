# PriorityQueue

## Overview

#### License: MIT

```solidity
library PriorityQueue
```

The library that realizes a heap based priority queue.

Courtesy of heap property,
add() and removeTop() operations are O(log(n)) complex
top(), topValue() operations are O(1)

The library might be useful to implement priority withdrawals/purchases, reputation based systems, and similar logic.

The library is a maximal priority queue. The element with the highest priority is the topmost element.
If you wish a minimal queue, change the priority of the elements to type(uint256).max - priority.

IMPORTANT
The queue order of the elements is NOT guaranteed.
The interaction with the data structure must be made via the topmost element only.

## Usage example:

```
using PriorityQueue for PriorityQueue.UintQueue;
using PriorityQueue for PriorityQueue.AddressQueue;
using PriorityQueue for PriorityQueue.Bytes32Queue;
```
## Structs info

### UintQueue

```solidity
struct UintQueue {
	PriorityQueue.Queue _queue;
}
```

UintQueue       *
### Bytes32Queue

```solidity
struct Bytes32Queue {
	PriorityQueue.Queue _queue;
}
```

Bytes32Queue     *
### AddressQueue

```solidity
struct AddressQueue {
	PriorityQueue.Queue _queue;
}
```

AddressQueue     *
### Queue

```solidity
struct Queue {
	bytes32[] _values;
	uint256[] _priorities;
}
```

Internal Queue    *
## Functions info

### add

```solidity
function add(
    PriorityQueue.UintQueue storage queue,
    uint256 value_,
    uint256 priority_
) internal
```

The function to add an element to the uint256 queue. O(log(n)) complex


Parameters:

| Name      | Type                           | Description          |
| :-------- | :----------------------------- | :------------------- |
| queue     | struct PriorityQueue.UintQueue | self                 |
| value_    | uint256                        | the element value    |
| priority_ | uint256                        | the element priority |

### removeTop

```solidity
function removeTop(PriorityQueue.UintQueue storage queue) internal
```

The function to remove the element with the highest priority. O(log(n)) complex


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |

### topValue

```solidity
function topValue(
    PriorityQueue.UintQueue storage queue
) internal view returns (uint256)
```

The function to read the value of the element with the highest priority. O(1) complex


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |


Return values:

| Name | Type    | Description                                        |
| :--- | :------ | :------------------------------------------------- |
| [0]  | uint256 | the value of the element with the highest priority |

### top

```solidity
function top(
    PriorityQueue.UintQueue storage queue
) internal view returns (uint256, uint256)
```

The function to read the element with the highest priority. O(1) complex


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |


Return values:

| Name | Type    | Description                           |
| :--- | :------ | :------------------------------------ |
| [0]  | uint256 | the element with the highest priority |

### length

```solidity
function length(
    PriorityQueue.UintQueue storage queue
) internal view returns (uint256)
```

The function to read the size of the queue. O(1) complex


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |


Return values:

| Name | Type    | Description           |
| :--- | :------ | :-------------------- |
| [0]  | uint256 | the size of the queue |

### values

```solidity
function values(
    PriorityQueue.UintQueue storage queue
) internal view returns (uint256[] memory values_)
```

The function to get the values stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |


Return values:

| Name    | Type      | Description                       |
| :------ | :-------- | :-------------------------------- |
| values_ | uint256[] | the values of the elements stored |

### elements

```solidity
function elements(
    PriorityQueue.UintQueue storage queue
)
    internal
    view
    returns (uint256[] memory values_, uint256[] memory priorities_)
```

The function to get the values and priorities stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously


Parameters:

| Name  | Type                           | Description |
| :---- | :----------------------------- | :---------- |
| queue | struct PriorityQueue.UintQueue | self        |


Return values:

| Name        | Type      | Description                           |
| :---------- | :-------- | :------------------------------------ |
| values_     | uint256[] | the values of the elements stored     |
| priorities_ | uint256[] | the priorities of the elements stored |

### add

```solidity
function add(
    PriorityQueue.Bytes32Queue storage queue,
    bytes32 value_,
    uint256 priority_
) internal
```

The function to add an element to the bytes32 queue. O(log(n)) complex
### removeTop

```solidity
function removeTop(PriorityQueue.Bytes32Queue storage queue) internal
```

The function to remove the element with the highest priority. O(log(n)) complex
### topValue

```solidity
function topValue(
    PriorityQueue.Bytes32Queue storage queue
) internal view returns (bytes32)
```

The function to read the value of the element with the highest priority. O(1) complex
### top

```solidity
function top(
    PriorityQueue.Bytes32Queue storage queue
) internal view returns (bytes32, uint256)
```

The function to read the element with the highest priority. O(1) complex
### length

```solidity
function length(
    PriorityQueue.Bytes32Queue storage queue
) internal view returns (uint256)
```

The function to read the size of the queue. O(1) complex
### values

```solidity
function values(
    PriorityQueue.Bytes32Queue storage queue
) internal view returns (bytes32[] memory values_)
```

The function to get the values stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously
### elements

```solidity
function elements(
    PriorityQueue.Bytes32Queue storage queue
)
    internal
    view
    returns (bytes32[] memory values_, uint256[] memory priorities_)
```

The function to get the values and priorities stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously
### add

```solidity
function add(
    PriorityQueue.AddressQueue storage queue,
    address value_,
    uint256 priority_
) internal
```

The function to add an element to the address queue. O(log(n)) complex
### removeTop

```solidity
function removeTop(PriorityQueue.AddressQueue storage queue) internal
```

The function to remove the element with the highest priority. O(log(n)) complex
### topValue

```solidity
function topValue(
    PriorityQueue.AddressQueue storage queue
) internal view returns (address)
```

The function to read the value of the element with the highest priority. O(1) complex
### top

```solidity
function top(
    PriorityQueue.AddressQueue storage queue
) internal view returns (address, uint256)
```

The function to read the element with the highest priority. O(1) complex
### length

```solidity
function length(
    PriorityQueue.AddressQueue storage queue
) internal view returns (uint256)
```

The function to read the size of the queue. O(1) complex
### values

```solidity
function values(
    PriorityQueue.AddressQueue storage queue
) internal view returns (address[] memory values_)
```

The function to get the values stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously
### elements

```solidity
function elements(
    PriorityQueue.AddressQueue storage queue
)
    internal
    view
    returns (address[] memory values_, uint256[] memory priorities_)
```

The function to get the values and priorities stored in the queue. O(n) complex
It is very expensive to call this function as it reads all the queue elements. Use cautiously