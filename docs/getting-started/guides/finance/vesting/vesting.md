# 💸 Vesting

## Introduction

The main concept of the Vesting module is to lock `ERC20` tokens for the predetermined amount of time before allowing token holders fully access their asset.

## Implementation

The `AVesting` contract manages vestings and associated schedules for multiple beneficiaries and `ERC20` tokens. 
This contract stands out for its flexibility, offering support for both linear and exponential vesting calculations out of the box.
Linear vesting has a constant release rate over time (`exponent = 1`), resulting in a linear graph.
Exponential vesting allows for a more flexible release rate, defined by the exponent.
Higher exponents result in a steeper release curve.

The current vesting contract implementation supports:

- Multiple vestings
- Multiple beneficiaries (one beneficiary for one vesting)
- Multiple ERC20 tokens (one token per vesting)
- Linear calculation
- Exponential calculation
- Customizable cliff

Vesting formula is as follows:

<img src={require("/static/img/docs/vesting.png").default} alt=""/>

where:

- _vestedAmount_ - the calculated vested amount
- _elapsedPeriodsPercentage_ - the percentage of passed periods
- _exponent_ - the exponent number that is set in `scheduleStruct`
- _totalVestingAmount_ - the amount vested initially

Vesting contract has two main components: Schedule struct and Vesting struct.

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

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>vestingStartTime</code></td>
      <td>Timestamp of the start of the vesting</td>
    </tr>
    <tr>
      <td><code>beneficiary</code></td>
      <td>The address that will eventually receive vested assets</td>
    </tr>
    <tr>
      <td><code>vestingToken</code></td>
      <td>The address of the vested token</td>
    </tr>
    <tr>
      <td><code>vestingAmount</code></td>
      <td>The amount the user wants to put in vesting</td>
    </tr>
    <tr>
      <td><code>paidAmount</code></td>
      <td>The amount paid to the beneficiary at the current time</td>
    </tr>
    <tr>
      <td><code>scheduleId</code></td>
      <td>The ID of the associated schedule</td>
    </tr>
  </tbody>
</table>

Each vesting contains `scheduleId`, which is associated with a schedule struct.

```solidity
struct BaseSchedule {
  uint256 secondsInPeriod;
  uint256 durationInPeriods;
  uint256 cliffInPeriods;
}

struct Schedule {
  BaseSchedule scheduleData;
  uint256 exponent;
}
```

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Example value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>secondsInPeriod</code></td>
      <td>The duration of each vesting period in seconds</td>
      <td>86400 seconds for 1 day</td>
    </tr>
    <tr>
      <td><code>durationInPeriods</code></td>
      <td>The total number of periods for the vesting</td>
      <td>20 for 20 days</td>
    </tr>
    <tr>
      <td><code>cliffInPeriods</code></td>
      <td>The number of periods before the vesting starts</td>
      <td>3 for 3 days</td>
    </tr>
    <tr>
      <td><code>exponent</code></td>
      <td>The exponent for the vesting calculation</td>
      <td>1 for linear vesting, >=2 for exponential. It's not possible to set the exponent as 0</td>
    </tr>
  </tbody>
</table>

You can create as many Schedules as needed with different parameters with an associated `scheduleId`.
Then a schedule can be assigned to vestings. So it's possible to create multiple vestings with the same schedule.

The contract includes the following public functions:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>withdrawFromVesting</code></td>
      <td>Withdraws funds from a vesting contract</td>
    </tr>
    <tr>
      <td><code>getSchedule</code></td>
      <td>Retrieves a schedule by ID</td>
    </tr>
    <tr>
      <td><code>getVesting</code></td>
      <td>Retrieves vesting data by ID</td>
    </tr>
    <tr>
      <td><code>getVestings</code></td>
      <td>Retrieves all vesting data for a beneficiary</td>
    </tr>
    <tr>
      <td><code>getVestingIds</code></td>
      <td>Retrieves all vesting IDs for a beneficiary</td>
    </tr>
    <tr>
      <td><code>getVestedAmount</code></td>
      <td>Retrieves the vested amount for a vesting ID</td>
    </tr>
    <tr>
      <td><code>getWithdrawableAmount</code></td>
      <td>Retrieves the withdrawable amount for a vesting ID</td>
    </tr>
  </tbody>
</table>

Additionally, there are a couple of internal functions that allow creating vesting, schedule, and calculating the vesting amount:

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>createSchedule</code></td>
      <td>Creates a new vesting schedule with a custom exponent</td>
    </tr>
    <tr>
      <td><code>createVesting</code></td>
      <td>Creates a new vesting</td>
    </tr>
    <tr>
      <td><code>vestingCalculation</code></td>
      <td>Performs the vesting calculation</td>
    </tr>
  </tbody>
</table>

## Example

Example of creating and calculating vesting.

```solidity
Schedule memory schedule_ = Schedule({
    scheduleData: BaseSchedule({
        secondsInPeriod: 1 days, // 86400 seconds,
        durationInPeriods: 20, // 20 days,
        cliffInPeriods: 3 // 3 days
    }),
    exponent: 1 // linear vesting
});

// as this is the first schedule we create, the id will be 1
_createSchedule(schedule_);

// will be our beneficiary
address bob_ = address(0xb0b);
// vesting token
address usdt_ = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

VestingData memory vestingData_ = VestingData({
    vestingStartTime: block.timestamp, // start vesting from the last block
    beneficiary: bob_, // beneficiary
    vestingToken: usdt_, // vesting token,
    vestingAmount: 1000, // 1000 tokens,
    paidAmount: 0, // paid tokens at the current time
    scheduleId: 1 // id of the schedule
});

// create vesting
_createVesting(vestingData_);

vestingCalculation(1 days);  // 1 day: 0 tokens
vestingCalculation(2 days);  // 2 day: 0 tokens
vestingCalculation(3 days);  // 3 day: 0 tokens
vestingCalculation(4 days);  // 4 day: 200 tokens
vestingCalculation(5 days);  // 5 day: 250 tokens
vestingCalculation(6 days);  // 6 day: 300 tokens
vestingCalculation(7 days);  // 7 day: 350 tokens
vestingCalculation(8 days);  // 8 day: 400 tokens
vestingCalculation(9 days);  // 9 day: 450 tokens

// ...
vestingCalculation(20 days); // 20 day: 1000 tokens
```
