/* global Module */

/* Magic Mirror
* Module: MMM-Relay-Scheduler
*
* By Oscar Van Slijpe
* MIT Licensed.
*/

Module.register('MMM-Relay-Scheduler',{
	defaults: {
		relayPin: 14,
		daysOff: [5,6],
		startTime: 8*60,
		endTime: 18*60,
		refreshInterval: 1000*10
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification("MMM-Relay-Scheduler-Setup",{config: this.config,identifier: this.identifier})
		var self = this;
		self.checkState();
		// Schedule updates
		setInterval(function () {
		  self.checkState();
		}, this.config.refreshInterval);
	  },

	checkState: function () {
		Log.info("MMM-Relay-Scheduler: start check state");
		this.sendSocketNotification("MMM-Relay-Scheduler-Check-State", {
			config: this.config,
			identifier: this.identifier
		});
	}
});
