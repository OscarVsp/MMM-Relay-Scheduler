/* Magic Mirror
* Module: MMM-Relay-Timer
*
* By Oscar Van Slijpe
* MIT Licensed.
*/

const NodeHelper = require('node_helper');
const Gpio = require('onoff').Gpio;

module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
    },
  
    socketNotificationReceived: function (notification, payload) {
        var self = this;

        if (notification == "MMM-Relay-Timer-Setup"){
            this.relayState = 0;
            this.relay = new Gpio(payload.config.relayPin, 'out');
            this.relay.writeSync(this.relayState);
            this.started = true
        }
        
        if (notification === "MMM-Relay-Timer-Check-State") {
            const d = new Date();
            let dayOfTheWeek = d.getDay() + 1;                    

            if (this.relayState == 1) {
                //Check if we are in day off
                if (payload.config.daysOff.includes(dayOfTheWeek)){
                    console.log("MMM-Relay-Timer: relay turning off because this is a day off.");
                    this.relayState = 0;
                } else {
                    //Check the time
                    let time = d.getHours() * 60 + d.getMinutes();
                    if (time < payload.config.startTime || time >= payload.config.endTime) {
                        console.log("MMM-Relay-Timer: relay turning off because this is a time off.");
                        this.relayState = 0;
                    }
                }
            } else {
                if (!payload.config.daysOff.includes(dayOfTheWeek)){
                    let time = d.getHours() * 60 + d.getMinutes();
                    if (time >= payload.config.startTime && time < payload.config.endTime) {
                        console.log("MMM-Relay-Timer: relay turning on");
                        this.relayState = 1;
                        
                    }
                }
            }
            this.relay.writeSync(this.relayState);
        }
    }
  });
  