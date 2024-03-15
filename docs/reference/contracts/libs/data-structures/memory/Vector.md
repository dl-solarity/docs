# Vector

## Overview

#### License: MIT

```solidity
library Vector
```

The memory data structures module

This library is inspired by C++ STD vector to enable push() and pop() operations for memory arrays.

Currently Solidity allows resizing only storage arrays, which may be a roadblock if you need to
filter the elements by a specific property or add new ones without writing bulky code. The Vector library
is meant to help with that.

It is very important to create Vectors via constructors (newUint, newBytes32, newAddress) as they allocate and clean
the memory for the data structure.

The Vector works by knowing how much memory it uses (allocation) and keeping the reference to the underlying
low-level Solidity array. When a new element gets pushed, the Vector tries to store it in the underlying array. If the
number of elements exceed the allocation, the Vector will reallocate the array to a bigger memory chunk and store the
new element there.

## Usage example:
```
using Vector for Vector.UintVector;

Vector.UintVector memory vector = Vector.newUint();

vector.push(123);
```
## Structs info

### UintVector

```solidity
struct UintVector {
	Vector.Vector _vector;
}
```

UintVector      *
### Bytes32Vector

```solidity
struct Bytes32Vector {
	Vector.Vector _vector;
}
```

Bytes32Vector    *
### AddressVector

```solidity
struct AddressVector {
	Vector.Vector _vector;
}
```

AddressVector    *
### Vector

```solidity
struct Vector {
	uint256 _allocation;
	uint256 _dataPointer;
}
```

InnerVector     *
## Functions info

### newUint

```solidity
function newUint() internal pure returns (Vector.UintVector memory vector)
```

The UintVector constructor, creates an empty vector instance, O(1) complex


Return values:

| Name   | Type                     | Description                |
| :----- | :----------------------- | :------------------------- |
| vector | struct Vector.UintVector | the newly created instance |

### newUint

```solidity
function newUint(
    uint256 length_
) internal pure returns (Vector.UintVector memory vector)
```

The UintVector constructor, creates a vector instance with defined length, O(n) complex

The length_ number of default value elements will be added to the vector


Parameters:

| Name    | Type    | Description                     |
| :------ | :------ | :------------------------------ |
| length_ | uint256 | the initial number of elements  |


Return values:

| Name   | Type                     | Description                |
| :----- | :----------------------- | :------------------------- |
| vector | struct Vector.UintVector | the newly created instance |

### newUint

```solidity
function newUint(
    uint256[] memory array_
) internal pure returns (Vector.UintVector memory vector)
```

The UintVector constructor, creates a vector instance from the array, O(1) complex


Parameters:

| Name   | Type      | Description        |
| :----- | :-------- | :----------------- |
| array_ | uint256[] | the initial array  |


Return values:

| Name   | Type                     | Description                |
| :----- | :----------------------- | :------------------------- |
| vector | struct Vector.UintVector | the newly created instance |

### push

```solidity
function push(
    Vector.UintVector memory vector,
    uint256[] memory values_
) internal pure
```

The function to push new elements (as an array) to the uint256 vector, amortized O(n)


Parameters:

| Name    | Type                     | Description             |
| :------ | :----------------------- | :---------------------- |
| vector  | struct Vector.UintVector | self                    |
| values_ | uint256[]                | the new elements to add |

### push

```solidity
function push(Vector.UintVector memory vector, uint256 value_) internal pure
```

The function to push a new element to the uint256 vector, amortized O(1)


Parameters:

| Name   | Type                     | Description            |
| :----- | :----------------------- | :--------------------- |
| vector | struct Vector.UintVector | self                   |
| value_ | uint256                  | the new element to add |

### pop

```solidity
function pop(Vector.UintVector memory vector) internal pure
```

The function to pop the last element from the uint256 vector, O(1)


Parameters:

| Name   | Type                     | Description |
| :----- | :----------------------- | :---------- |
| vector | struct Vector.UintVector | self        |

### set

```solidity
function set(
    Vector.UintVector memory vector,
    uint256 index_,
    uint256 value_
) internal pure
```

The function to assign the value to a uint256 vector element


Parameters:

| Name   | Type                     | Description                              |
| :----- | :----------------------- | :--------------------------------------- |
| vector | struct Vector.UintVector | self                                     |
| index_ | uint256                  | the index of the element to be assigned  |
| value_ | uint256                  | the value to assign                      |

### at

```solidity
function at(
    Vector.UintVector memory vector,
    uint256 index_
) internal pure returns (uint256)
```

The function to read the element of the uint256 vector


Parameters:

| Name   | Type                     | Description                       |
| :----- | :----------------------- | :-------------------------------- |
| vector | struct Vector.UintVector | self                              |
| index_ | uint256                  | the index of the element to read  |


Return values:

| Name | Type    | Description        |
| :--- | :------ | :----------------- |
| [0]  | uint256 | the vector element |

### length

```solidity
function length(
    Vector.UintVector memory vector
) internal pure returns (uint256)
```

The function to get the number of uint256 vector elements


Parameters:

| Name   | Type                     | Description |
| :----- | :----------------------- | :---------- |
| vector | struct Vector.UintVector | self        |


Return values:

| Name | Type    | Description                   |
| :--- | :------ | :---------------------------- |
| [0]  | uint256 | the number of vector elements |

### toArray

```solidity
function toArray(
    Vector.UintVector memory vector
) internal pure returns (uint256[] memory)
```

The function to cast the uint256 vector to an array

The function returns the *reference* to the underlying array. Modifying the reference
will also modify the vector itself. However, this might not always be the case as the vector
resizes


Parameters:

| Name   | Type                     | Description |
| :----- | :----------------------- | :---------- |
| vector | struct Vector.UintVector | self        |


Return values:

| Name | Type      | Description                                     |
| :--- | :-------- | :---------------------------------------------- |
| [0]  | uint256[] | the reference to the solidity array of elements |

### newBytes32

```solidity
function newBytes32()
    internal
    pure
    returns (Vector.Bytes32Vector memory vector)
```

The Bytes32Vector constructor, creates an empty vector instance, O(1) complex
### newBytes32

```solidity
function newBytes32(
    uint256 length_
) internal pure returns (Vector.Bytes32Vector memory vector)
```

The Bytes32Vector constructor, creates a vector instance with defined length, O(n) complex
### newBytes32

```solidity
function newBytes32(
    bytes32[] memory array_
) internal pure returns (Vector.Bytes32Vector memory vector)
```

The Bytes32Vector constructor, creates a vector instance from the array, O(1) complex
### push

```solidity
function push(
    Vector.Bytes32Vector memory vector,
    bytes32[] memory values_
) internal pure
```

The function to push new elements (as an array) to the bytes32 vector, amortized O(n)
### push

```solidity
function push(Vector.Bytes32Vector memory vector, bytes32 value_) internal pure
```

The function to push a new element to the bytes32 vector, amortized O(1)
### pop

```solidity
function pop(Vector.Bytes32Vector memory vector) internal pure
```

The function to pop the last element from the bytes32 vector, O(1)
### set

```solidity
function set(
    Vector.Bytes32Vector memory vector,
    uint256 index_,
    bytes32 value_
) internal pure
```

The function to assign the value to a bytes32 vector element
### at

```solidity
function at(
    Vector.Bytes32Vector memory vector,
    uint256 index_
) internal pure returns (bytes32)
```

The function to read the element of the bytes32 vector
### length

```solidity
function length(
    Vector.Bytes32Vector memory vector
) internal pure returns (uint256)
```

The function to get the number of bytes32 vector elements
### toArray

```solidity
function toArray(
    Vector.Bytes32Vector memory vector
) internal pure returns (bytes32[] memory)
```

The function to cast the bytes32 vector to an array
### newAddress

```solidity
function newAddress()
    internal
    pure
    returns (Vector.AddressVector memory vector)
```

The AddressVector constructor, creates an empty vector instance, O(1) complex
### newAddress

```solidity
function newAddress(
    uint256 length_
) internal pure returns (Vector.AddressVector memory vector)
```

The AddressVector constructor, creates a vector instance with defined length, O(n) complex
### newAddress

```solidity
function newAddress(
    address[] memory array_
) internal pure returns (Vector.AddressVector memory vector)
```

The AddressVector constructor, creates a vector instance from the array, O(1) complex
### push

```solidity
function push(
    Vector.AddressVector memory vector,
    address[] memory values_
) internal pure
```

The function to push new elements (as an array) to the address vector, amortized O(n)
### push

```solidity
function push(Vector.AddressVector memory vector, address value_) internal pure
```

The function to push a new element to the address vector, amortized O(1)
### pop

```solidity
function pop(Vector.AddressVector memory vector) internal pure
```

The function to pop the last element from the address vector, O(1)
### set

```solidity
function set(
    Vector.AddressVector memory vector,
    uint256 index_,
    address value_
) internal pure
```

The function to assign the value to an address vector element
### at

```solidity
function at(
    Vector.AddressVector memory vector,
    uint256 index_
) internal pure returns (address)
```

The function to read the element of the address vector
### length

```solidity
function length(
    Vector.AddressVector memory vector
) internal pure returns (uint256)
```

The function to get the number of address vector elements
### toArray

```solidity
function toArray(
    Vector.AddressVector memory vector
) internal pure returns (address[] memory)
```

The function to cast the address vector to an array