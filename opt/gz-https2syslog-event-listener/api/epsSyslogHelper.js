'use strict';

let EpsSyslogHelper;

const syslog = require('syslog-client');
const os = require('os');

/**
 * EventConverter class
 */
EpsSyslogHelper = function (config) {

    let hostName = os.hostname();
    if (!hostName) {
        hostName = 'localhost';
    }

    let dot = hostName.indexOf('.');
    if (dot > 0) {
        hostName = hostName.substring(0, dot);
    }
    console.log('Logging using host name %s', hostName);

    this._client = syslog.createClient(config.target, {
        syslogHostname: hostName,
        port: config.syslog_port,
        transport: syslog.Transport[config.transport],
    });
    this._client.on('error', function(err) {
        console.error('Error from syslog network: %s', err);
    });

};

EpsSyslogHelper.prototype.log = function _log(msg) {

    let options = {
        facility: syslog.Facility.Local0,
        severity: syslog.Severity.Informational
    };
    let events;

    if(msg.hasOwnProperty('cef')){
        events = msg.events;
    } else if (msg.hasOwnProperty('jsonrpc')) {
         events = msg.params.events;
    }

      if(events){

        for(let eventKey in events) {
            let syslogMessage = events[eventKey];

            if(typeof syslogMessage !== 'string') {
                syslogMessage = JSON.stringify(syslogMessage);
            }

            console.log("Event key = " + eventKey + " is = " + syslogMessage);

            const me  = this;
            this._client.log(syslogMessage, options, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('EventSent to syslog')
                }
                me._client.close();
            });
        }
     }
};

// export module
module.exports = EpsSyslogHelper;

