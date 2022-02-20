/**
 * Component Sleep Tracker
 * @version 1.0
 * @author GBonnaire <contact@gbonnaire.fr>
 * @website www.gbonnaire.fr
 * @license MIT
 * @description
 * Check if user is asleep behind computer include the management with several pages opended
 */

 ;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.sleepTracker = factory();
}(this, (function () {
    'use strict';
    const sleepTracker = (function(options) {
        const app = {}; 
        const eventCallBack = []; // Contains all callback function

        // Private var
        let siCheck;
        let lastMinutesASleep;
        let beforeAsleepExecuted = false;

        // Options
        // Set options
        app.options = Object.assign({},options);


        // Options
        const defaultOptions = {
            timeout: 30, // Minutes
            timeoutBeforeAsleep: 2,
            detectActivity: true,
            delayCallAwake: 5,
            keyStorage: window.location.hostname+"_sleepTrackerDateWakedUp",
            onload: null,
            oninit: null,
            debug: false,
        }

        // Set default value
        if(app.options==null) {
           app.options = {};
        }

        for(let property in defaultOptions) {
            if (!app.options.hasOwnProperty(property) || app.options[property]==null ) {
                app.options[property] = defaultOptions[property];
            }
        }

        /**
         * public function
         */

        /**
         * Event listener
         * @param {string} event 
         * @param {function} callback 
         * @returns object
         */
        app.on = function(event, callback) {
            eventCallBack.push({
                event: event,
                callback: callback
            });
            return app;
        }

        /**
         * asleep
         */
        app.asleep = function() {
            clearInterval(siCheck);
            siCheck = null;
            resetDateWakedUp();
            trigger("asleep", app);
        }

        /**
         * wakeup
         */
        app.wakeup = function() {
            if(siCheck) {
                clearInterval(siCheck);
            }
           
            // reset value
            beforeAsleepExecuted = false;
            updateDateWakedUp();

            // start check
            siCheck = setInterval(checkASleep, 60000);

            trigger("wakeup", app);
        } 

        /**
         * awake
         */
        app.awake = function() {
            if(siCheck) {
                if(beforeAsleepExecuted) {
                    trigger("awakened", app);
                    beforeAsleepExecuted = false;
                }
                if(getMinutesAsleep() >= app.options.delayCallAwake) {
                    updateDateWakedUp();
                    trigger("awake", app);
                } 
            }
        } 

        /**
         * is awake
         * @returns boolean
         */
        app.isAwake = function() {
            if(siCheck) {
                return true;
            }
            return false;
        }

        /**
         * Private function
         */

        /**
         * Initialisation
         * @private
         */
        const init = function() {
            if(app.options.oninit && typeof app.options.oninit == "function") {
                app.on("init", app.options.oninit);
            }
            if(app.options.onload && typeof app.options.onload == "function") {
                app.on("load", app.options.onload);
            }

            if(app.options.detectActivity) {
                window.addEventListener("focus", app.awake);
                window.addEventListener("scroll", app.awake);
                window.addEventListener("keyup", app.awake);
            }
            
            trigger("init", app);
        }

        /**
         * load
         * @private
         */
        const load = function() {
            app.wakeup();
            trigger("load", app);
        }

        /**
         * trigger
         * @private
         * @param {string} event 
         * @returns 
         */
        const trigger = function(event) {
            let args = Array.from(arguments);
            args.shift();
            if(app.options.debug) {
                console.log("sleepTracker *DEBUG*", event, args);
            }
            let res;
            for(let ite_eventcallback = 0; ite_eventcallback < eventCallBack.length; ite_eventcallback ++) {
                const cb = eventCallBack[ite_eventcallback];
                if(cb.event.toLowerCase() === event.toLowerCase() && typeof cb.callback === "function") {
                    const tmp = cb.callback.apply(this, args);
                    if(tmp !== undefined) {
                        res = tmp;
                    }
                }
            }
            return res;
        }

        /**
         * before asleep
         * @private
         * @returns 
         */
        const beforeAsleep = function() {
            if(beforeAsleepExecuted) {
                return;
            } 
            beforeAsleepExecuted = true;

            const res = trigger("beforeasleep", app);
            if(res === true) {
                app.awake();
            }
        }

        /**
         * check asleep
         * @private
         * @returns 
         */
        const checkASleep = function() {   
            const minutes = getMinutesAsleep();

            if(beforeAsleepExecuted && minutes < lastMinutesASleep) {
                app.awake();
            } else if(minutes >= app.options.timeout) {
                app.asleep();
            } else if(beforeAsleepExecuted == false && (app.options.timeout - minutes) <= app.options.timeoutBeforeAsleep ) {
                beforeAsleep();
            }

            lastMinutesASleep = minutes;            
        }

        /**
         * get minutes asleep
         * @private
         * @returns 
         */
        const getMinutesAsleep = function() {
            const millis = Date.now() - getDateWakedUp();
            return Math.round((millis / 1000) / 60);
        }

        /**
         * update date wakedup
         * @private
         */
        const updateDateWakedUp = function() {
            window.localStorage.setItem(app.options.keyStorage,  Date.now());
        }

        /**
         * reset date wakedup
         * @private
         */
        const resetDateWakedUp = function() {
            window.localStorage.setItem(app.options.keyStorage,  -1);
        }

        /**
         * get date waked up timestamp
         * @private
         * @returns int
         */
        const getDateWakedUp = function() {
            return window.localStorage.getItem(app.options.keyStorage);
        }

        /**
         * auto load
         */
        init();
        window.addEventListener("DOMContentLoaded", load);


        return app;
    });

    return sleepTracker;
})));