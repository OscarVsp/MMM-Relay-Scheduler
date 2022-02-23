/* global Module */

/* Magic Mirror
* Module: MMM-Relay-Timer
*
* By Oscar Van Slijpe
* MIT Licensed.
*/

Module.register('MMM-Relay-Timer',{
	requiresVersion: '2.1.0',
	defaults: {
		relayPin: 14,
		daysOff: [5,6],
		startTime: 8*60,
		endTime: 18*60,
		refreshInterval: 1000*10
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification("MMM-Relay-Timer-Setup",{config: this.config,identifier: this.identifier})
		var self = this;
		self.checkState();
		// Schedule updates
		setInterval(function () {
		  self.checkState();
		  self.updateDom();
		}, this.config.refreshInterval);
	  },

	checkState: function () {
		Log.info("MMM-Relay-Timer: start check state");
		this.sendSocketNotification("MMM-Relay-Timer-Check-State", {
			config: this.config,
			identifier: this.identifier
		});
	}
});
