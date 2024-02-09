# Vesting

## Overview

#### License: MIT

```solidity
abstract contract Vesting is Initializable
```

The Abstract Vesting Contract serves as a robust module
designed to seamlessly manage vestings and associated schedules for
multiple beneficiaries and ERC20 tokens. This module stands out for its
flexibility, offering support for both linear and exponential vesting calculations out of the box.

Linear and Exponential Vesting:

Linear vesting has a constant release rate over time (exponent = 1), resulting in a linear graph.
Exponential vesting allows for a more flexible release rate, defined by the exponent.
Higher exponents result in a steeper release curve.

Vesting formula:

vestedAmount = elapsedPeriodsPercentage ** exponent * (totalVestingAmount_)).

Key concepts:

Vesting contract contains two main components: Schedule struct and Vesting struct.
Each vesting contains scheduleId, which is associated with a schedule struct.

You can create as much Schedules as needed with different parameters with an associated scheduleId.
Then a schedule can be assigned to vestings. So it's possible to create multiple vestings with the same schedule.

Schedule defines the base structure for the vesting and how the vested amount will be calculated,
with the following parameters such as the duration, cliff, period, and exponent.

Schedule parameters description:
- secondsInPeriod: The duration of each vesting period in seconds. (i.e. 86,400 sec for 1 day)
- durationInPeriods: The total number of periods for the vesting. (i.e. 20 for 20 days)
- cliffInPeriods: The number of periods before the vesting starts. (i.e. 3 for 3 days).
- exponent: The exponent for the vesting calculation. (i.e. 1 for linear vesting, 5 for exponential)

Example of schedule:
Let's define a schedule with the following parameters:
- secondsInPeriod = 86,400 (1 day)
- durationInPeriods = 20 (20 days)
- cliffInPeriods = 3 (3 days)
- exponent = 1 (linear vesting)

Using the provided schedule, you can create a vesting that will release vested amount linearly over 20 days with a 3-day cliff.
Let's say you have 1000 tokens to vest; then the vested amount will be released as follows:
- 1 day: 0 tokens
- 2 days: 0 tokens
- 3 days: 0 tokens
- 4 days: 200 tokens
- 5 days: 250 tokens
...
- 20 days: 1000 tokens

For defining linear vesting, the exponent should be set to 1,
or there is an option to create a linear schedule just by defining the baseSchedule struct
and the exponent will be automatically set to 1.

For the creation of exponential vesting, the exponent should be set to a value greater than 1.

It's not possible to create a schedule with an exponent equal to 0.
## Structs info

### BaseSchedule

```solidity
struct BaseSchedule {
	uint256 secondsInPeriod;
	uint256 durationInPeriods;
	uint256 cliffInPeriods;
}
```

Struct defining the base schedule parameters.
### Schedule

```solidity
struct Schedule {
	Vesting.BaseSchedule scheduleData;
	uint256 exponent;
}
```

Struct defining a vesting schedule, extending BaseSchedule.
### VestingData

```solidity
struct VestingData {
	uint256 vestingStartTime;
	address beneficiary;
	address vestingToken;
	uint256 vestingAmount;
	uint256 paidAmount;
	uint256 scheduleId;
}
```

Struct defining vesting data for an individual beneficiary.
## Events info

### ScheduleCreated

```solidity
event ScheduleCreated(uint256 indexed scheduleId)
```

Emitted when a new schedule is created.


Parameters:

| Name       | Type    | Description                     |
| :--------- | :------ | :------------------------------ |
| scheduleId | uint256 | The ID of the created schedule. |

### VestingCreated

```solidity
event VestingCreated(uint256 indexed vestingId, address beneficiary, address token)
```

Emitted when a new vesting contract is created.


Parameters:

| Name        | Type    | Description                                   |
| :---------- | :------ | :-------------------------------------------- |
| vestingId   | uint256 | The ID of the created vesting contract.       |
| beneficiary | address | The beneficiary of the vesting contract.      |
| token       | address | The ERC20 token address used for the vesting. |

### WithdrawnFromVesting

```solidity
event WithdrawnFromVesting(uint256 indexed vestingId, uint256 amount)
```

Emitted when funds are withdrawn from a vesting contract.


Parameters:

| Name      | Type    | Description                                                     |
| :-------- | :------ | :-------------------------------------------------------------- |
| vestingId | uint256 | The ID of the vesting contract from which funds are withdrawn.  |
| amount    | uint256 | The amount of funds withdrawn.                                  |

## Constants info

### LINEAR_EXPONENT (0xfff5197a)

```solidity
uint256 constant LINEAR_EXPONENT = 1
```


## State variables info

### scheduleId (0x28c802cd)

```solidity
uint256 scheduleId
```


### vestingId (0xd453bec6)

```solidity
uint256 vestingId
```


## Functions info

### withdrawFromVesting (0xa5dee4eb)

```solidity
function withdrawFromVesting(uint256 vestingId_) public virtual
```

Withdraws funds from a vesting contract.


Parameters:

| Name       | Type    | Description                     |
| :--------- | :------ | :------------------------------ |
| vestingId_ | uint256 | The ID of the vesting contract. |

### getSchedule (0xc5ca93a7)

```solidity
function getSchedule(
    uint256 scheduleId_
) public view virtual returns (Vesting.Schedule memory)
```

Retrieves a schedule by ID.


Parameters:

| Name        | Type    | Description                          |
| :---------- | :------ | :----------------------------------- |
| scheduleId_ | uint256 | The ID of the schedule to retrieve.  |


Return values:

| Name | Type                    | Description      |
| :--- | :---------------------- | :--------------- |
| [0]  | struct Vesting.Schedule | Schedule struct. |

### getVesting (0x615155dd)

```solidity
function getVesting(
    uint256 vestingId_
) public view virtual returns (Vesting.VestingData memory)
```

Retrieves vesting data by ID.


Parameters:

| Name       | Type    | Description                                  |
| :--------- | :------ | :------------------------------------------- |
| vestingId_ | uint256 | The ID of the vesting contract to retrieve.  |


Return values:

| Name | Type                       | Description         |
| :--- | :------------------------- | :------------------ |
| [0]  | struct Vesting.VestingData | VestingData struct. |

### getVestings (0x7a0c6dc0)

```solidity
function getVestings(
    address beneficiary_
) public view virtual returns (Vesting.VestingData[] memory)
```

Retrieves all vesting data for a beneficiary.


Parameters:

| Name         | Type    | Description                      |
| :----------- | :------ | :------------------------------- |
| beneficiary_ | address | The address of the beneficiary.  |


Return values:

| Name | Type                         | Description                     |
| :--- | :--------------------------- | :------------------------------ |
| [0]  | struct Vesting.VestingData[] | An array of VestingData struct. |

### getVestingIds (0xe3e690d5)

```solidity
function getVestingIds(
    address beneficiary_
) public view virtual returns (uint256[] memory)
```

Retrieves all vesting IDs for a beneficiary.


Parameters:

| Name         | Type    | Description                      |
| :----------- | :------ | :------------------------------- |
| beneficiary_ | address | The address of the beneficiary.  |


Return values:

| Name | Type      | Description                                                           |
| :--- | :-------- | :-------------------------------------------------------------------- |
| [0]  | uint256[] | An array of uint256 representing all vesting IDs for the beneficiary. |

### getVestedAmount (0xcafeedf6)

```solidity
function getVestedAmount(
    uint256 vestingId_
) public view virtual returns (uint256)
```

Retrieves the vested amount for a vesting ID.


Parameters:

| Name       | Type    | Description                      |
| :--------- | :------ | :------------------------------- |
| vestingId_ | uint256 | The ID of the vesting contract.  |


Return values:

| Name | Type    | Description                  |
| :--- | :------ | :--------------------------- |
| [0]  | uint256 | The amount of tokens vested. |

### getWithdrawableAmount (0x875f4384)

```solidity
function getWithdrawableAmount(
    uint256 vestingId_
) public view virtual returns (uint256)
```

Retrieves the withdrawable amount for a vesting ID.


Parameters:

| Name       | Type    | Description                      |
| :--------- | :------ | :------------------------------- |
| vestingId_ | uint256 | The ID of the vesting contract.  |


Return values:

| Name | Type    | Description                                 |
| :--- | :------ | :------------------------------------------ |
| [0]  | uint256 | The amount of tokens available to withdraw. |
