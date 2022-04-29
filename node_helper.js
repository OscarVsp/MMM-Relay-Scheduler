/* Magic Mirror
* Module: MMM-Relay-Scheduler
*
* By Oscar Van Slijpe
* MIT Licensed.
*/

const NodeHelper = require('node_helper');
const Gpio = require('onoff').Gpio;


module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
        this.relayState = 1;
    },
  
    socketNotificationReceived: function (notification, payload) {
        var self = this;

        //Initialize the relay state and pinout
        if (notification == "MMM-Relay-Scheduler-Setup"){
            this.relayState = 1;
            this.relay = new Gpio(payload.config.relayPin, 'out');
            this.relay.writeSync(this.relayState);
            this.started = true
        }
        //Check new the state
        if (notification === "MMM-Relay-Scheduler-Check-State") {
            //Check that the relay has been initialize, to avoid getting error
            if (this.started){
                const d = new Date();
                let dayOfTheWeek = (d.getDay() - 1)%7;       //To get Monday as day number 0 instead of Sunday             

                //Case current state is on
                if (this.relayState == 1) {
                    //Turn off if we are in day off
                    if (payload.config.daysOff.includes(dayOfTheWeek)){
                        console.log("MMM-Relay-Scheduler: relay turning off because this is a day off.");
                        this.relayState = 0;
                        this.relay.writeSync(this.relayState);
                    } else {
                        //Turn off if we are not in working hours
                        let time = d.getHours() * 60 + d.getMinutes();
                        if (time < payload.config.startTime || time >= payload.config.endTime) {
                            console.log("MMM-Relay-Scheduler: relay turning off because this is a time off.");
                            this.relayState = 0;
                            this.relay.writeSync(this.relayState);
                        }
                    }
                //Case current state if off
                } else {
                    //First check if we are in day on before getting the date
                    if (!payload.config.daysOff.includes(dayOfTheWeek)){
                        let time = d.getHours() * 60 + d.getMinutes();
                        //Then turn on if we are also in working hours
                        if (time >= payload.config.startTime && time < payload.config.endTime) {
                            console.log("MMM-Relay-Scheduler: relay turning on");
                            this.relayState = 1;
                            this.relay.writeSync(this.relayState);
                        }
                    }
                }
            }
        }
    }
  });
  
