# Traversal

## Overview

#### License: MIT

```solidity
library Traversal
```

Traversal module

This library provides functions to perform an in-order traversal of the AVL Tree
## Structs info

### Iterator

```solidity
struct Iterator {
	uint256 treeMappingSlot;
	uint64 currentNode;
}
```

Iterator struct to keep track of the current position in the tree.


Parameters:

| Name            | Type    | Description                                     |
| :-------------- | :------ | :---------------------------------------------- |
| treeMappingSlot | uint256 | The storage slot of the tree mapping.           |
| currentNode     | uint64  | The index of the current node in the traversal. |

## Functions info

### isValid

```solidity
function isValid(
    Traversal.Iterator memory iterator_
) internal pure returns (bool)
```

The function to check if the iterator is currently valid (has not reached the end of the traversal).


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type | Description                                     |
| :--- | :--- | :---------------------------------------------- |
| [0]  | bool | True if the iterator is valid, false otherwise. |

### hasNext

```solidity
function hasNext(
    Traversal.Iterator memory iterator_
) internal view returns (bool)
```

The function to check if there is a next node in the traversal.


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type | Description                                    |
| :--- | :--- | :--------------------------------------------- |
| [0]  | bool | True if there is a next node, false otherwise. |

### hasPrev

```solidity
function hasPrev(
    Traversal.Iterator memory iterator_
) internal view returns (bool)
```

The function to check if there is a previous node in the traversal.


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type | Description                                        |
| :--- | :--- | :------------------------------------------------- |
| [0]  | bool | True if there is a previous node, false otherwise. |

### next

```solidity
function next(
    Traversal.Iterator memory iterator_
) internal view returns (bytes32, bytes32)
```

The function to move the iterator to the next node and retrieve its key and value.


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type    | Description                 |
| :--- | :------ | :-------------------------- |
| [0]  | bytes32 | The key of the next node.   |
| [1]  | bytes32 | The value of the next node. |

### prev

```solidity
function prev(
    Traversal.Iterator memory iterator_
) internal view returns (bytes32, bytes32)
```

The function to move the iterator to the previous node and retrieve its key and value.


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type    | Description                     |
| :--- | :------ | :------------------------------ |
| [0]  | bytes32 | The key of the previous node.   |
| [1]  | bytes32 | The value of the previous node. |

### value

```solidity
function value(
    Traversal.Iterator memory iterator_
) internal view returns (bytes32, bytes32)
```

The function to retrieve the key and value of the current node.


Parameters:

| Name      | Type                      | Description |
| :-------- | :------------------------ | :---------- |
| iterator_ | struct Traversal.Iterator | self.       |


Return values:

| Name | Type    | Description                    |
| :--- | :------ | :----------------------------- |
| [0]  | bytes32 | The key of the current node.   |
| [1]  | bytes32 | The value of the current node. |

### _moveToAdjacent

```solidity
function _moveToAdjacent(
    Traversal.Iterator memory iterator_,
    bool next_
) internal view returns (bytes32, bytes32)
```

