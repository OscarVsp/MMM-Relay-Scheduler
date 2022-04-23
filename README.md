# MMM-Relay-Scheduler

A Module for [MagicMirror](https://github.com/MichMich/MagicMirror) designed to
control a relay base on the date and time (usefull to power on and off the screen for example).

## Installation

**Clone the repository into MagicMirror/modules directory**
```bash
cd ~/MagicMirror/modules
git clone https://github.com/OscarVsp/MMM-Relay-Timer.git
```

**Install the dependencies**
```
cd /MMM-Relay-Timer
npm install
```

### Configuration

**Basic Example:**

```jsonc
{
  module: 'MMM-Relay-Timer',
  position: 'bottom_left',
},
```

## Parameters

<table width="100%">
  <thead>
    <tr>
      <th>Property</th>
      <th width="100%">Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td><code>refreshInterval</code></td>
      <td>The interval with which the url is queried and your values are updated.
        <br><b>Type:</b> <code>int</code> (milliseconds)
        <br><b>Default:</b> <code>60,000</code> => 1 minute
      </td>
    </tr>
    <tr>
      <td><code>relayPin</code></td>
      <td>The pin used for the relay.
        <br><b>Type:</b> <code>int</code> GPIO number of the pin.
        <br><b>Default:</b> <code>14</code> 
      </td>
    </tr>
    <tr>
      <td><code>daysOff</code></td>
      <td>The days during which the relay should be always turn off.
        <br><b>Type:</b> <code>array</code>
		<br><b>Possible values:</b> <code>0</code> -> <code>6</code>, with <code>0</code> corresonding to monday.
        <br><b>Default:</b> <code>[5,6]</code> 
      </td>
    </tr>
	<tr>
      <td><code>startTime</code></td>
      <td>The time of the day after which the relay should be turn on.
        <br><b>Type:</b> <code>int</code> The time in minute from 0:00
        <br><b>Default:</b> <code>8*60 + 30</code> => 8:30
      </td>
    </tr>
	<tr>
      <td><code>endTime</code></td>
      <td>The time of the day after which the relay should be turn off.
        <br><b>Type:</b> <code>int</code> The time in minute from 0:00
        <br><b>Default:</b> <code>18*60 + 30</code> => 18:30
      </td>
    </tr>
  </tbody>
</table>
