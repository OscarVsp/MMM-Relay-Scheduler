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
		daysOff: [5,6],		//Starting at 0 for Monday, so [5,6] is Saturday and Sunday
		startTime: 8*60,		//8:00
		endTime: 18*60,			//18:00
		refreshInterval: 1000*60	//Check every minute
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification("MMM-Relay-Scheduler-Setup",{config: this.config,identifier: this.identifier})
		var self = this;
		// Wait a bit before first state check so that the node_helper get initialized.
		setTimeout(self.checkState(),1000);
		// Schedule updates
		setInterval(function () {
		  self.checkState();
		}, this.config.refreshInterval);
	  },
	//Ask to the node_helper to check the state
	checkState: function () {
		Log.info("MMM-Relay-Scheduler: start check state");
		this.sendSocketNotification("MMM-Relay-Scheduler-Check-State", {
			config: this.config,
			identifier: this.identifier
		});
	}
});
