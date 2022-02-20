# sleeper-tracker-js
Sleep tracker JS is a component for tracking user inactivity on a web application. This component manages several pages opened


# Get started
```javascript
const sleepTrackerInstance = sleepTracker({
    timeout: 60, // in minutes, By default is 30 minutes
    delayCallAwake: 10
});
sleepTrackerInstance.on("beforeasleep", function() {
    // Open modal to ask if user is awake ! If ok call sleepTrackerInstance.awake();
});
sleepTrackerInstance.on("awakened", function() {
    // User indicate on other page he awake. If modal is open, you can close it
});
sleepTrackerInstance.on("awake", function() {
    // Execute code to indicate to the server user is awake
});
sleepTrackerInstance.on("asleep", function() {
    // Execute code because user is asleep. example logout, black screen, ...
});
```

## CDN
You can use this CDN link

```HTML
<script src="https://cdn.jsdelivr.net/gh/GBonnaire/sleep-tracker-js@latest/dist/sleeptracker.min.js"></script>
```

## NPM
npm install @guillaumebonnaire/sleep-tracker-js

```javascript
import sleepTracker from '@guillaumebonnaire/sleep-tracker-js';
```

# Documentation

## Options of component

<table>
	<thead>
		<tr>
			<th>Option name</th>
			<th>Description</th>
			<th>Type</th>
			<th>Default Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>timeout</code></td>
			<td>time out when user is considered comme asleep. In minutes</td>
			<td><code>int</code></td>
			<td><code>30</code></td>
		</tr>
        <tr>
			<td><code>timeoutBeforeAsleep</code></td>
			<td>Minutes before time out when application ask if user is awake. In minutes</td>
			<td><code>int</code></td>
			<td><code>2</code></td>
		</tr>
        <tr>
			<td><code>detectActivity</code></td>
			<td>If component detect activity like keydown, scroll, focus</td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
		</tr>
        <tr>
			<td><code>delayCallAwake</code></td>
			<td>Delay between 2 trigger event "awake". In minutes</td>
			<td><code>int</code></td>
			<td><code>5</code></td>
		</tr>
        <tr>
			<td><code>keyStorage</code></td>
			<td>Key used to store data in localStorage</td>
			<td><code>string</code></td>
			<td><code>based on hostname</code></td>
		</tr>
        <tr>
			<td><code>onload</code></td>
			<td>on load event</td>
			<td><code>function (Object: component)</code></td>
			<td><code>null</code></td>
		</tr>
        <tr>
			<td><code>oninit</code></td>
			<td>on init event</td>
			<td><code>function (Object: component)</code></td>
			<td><code>null</code></td>
		</tr>
        <tr>
			<td><code>debug</code></td>
			<td>debug mode, verbose all event triggered on console</td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
		</tr>
	</tbody>
</table>


## functions of component

<table>
	<thead>
		<tr>
			<th>Function name</th>
			<th>Description</th>
			<th>Syntax</th>
            <th>Return</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>on</code></td>
			<td>Function to defined a function triggered by the component</td>
			<td><code>on(String: event, Function: callback)</code></td>
            <td>avoid</td>
		</tr>
        <tr>
			<td><code>asleep</code></td>
			<td>Function to indicate user is asleep</td>
			<td><code>asleep()</code></td>
            <td>avoid</td>
		</tr>
        <tr>
			<td><code>wakeup</code></td>
			<td>Function to indicate user is wakeup</td>
			<td><code>wakeup()</code></td>
            <td>avoid</td>
		</tr>
        <tr>
			<td><code>awake</code></td>
			<td>Function to indicate user is awake</td>
			<td><code>awake()</code></td>
            <td>avoid</td>
		</tr>
        <tr>
			<td><code>isAwake</code></td>
			<td>Function to check if user is awake</td>
			<td><code>isAwake()</code></td>
            <td>boolean</td>
		</tr>
	</tbody>
</table>

## Events of component

<table>
	<thead>
		<tr>
			<th>Event name</th>
			<th>Description</th>
			<th>Syntax</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>asleep</code></td>
			<td>Triggered when user is asleep</td>
			<td><code>function (Object: component)</code></td>
		</tr>
        <tr>
			<td><code>beforeasleep</code></td>
			<td>Triggered some minutes before time out will be trigger</td>
			<td><code>function (Object: component)</code></td>
		</tr>
        <tr>
			<td><code>wakeup</code></td>
			<td>Triggered when user is wakeup (before asleep)</td>
			<td><code>function (Object: component)</code></td>            
		</tr>
        <tr>
			<td><code>awake</code></td>
			<td>Triggered when user is awake (activity)</td>
			<td><code>function (Object: component)</code></td>
		</tr>
        <tr>
			<td><code>awakened</code></td>
			<td>Triggered when user is awakened (trigger is beforeasleep is triggered)</td>
			<td><code>function (Object: component)</code></td>
		</tr>
        <tr>
			<td><code>init</code></td>
			<td>Triggered when component is init</td>
			<td><code>function (Object: component)</code></td>
		</tr>
        <tr>
			<td><code>load</code></td>
			<td>Triggered when component is loaded</td>
			<td><code>function (Object: component)</code></td>
		</tr>
	</tbody>
</table>