/**
 * @class MessageHub
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/18/14
 */

var MessageHub = function(options) {
    'use strict';

    var hub = this,
        log = options.log,
        port = options.port,
        hubName = options.hubName,
        channels = options.channels;

    this.start = function() {
        log.info('start the message hub: ', hubName, ' on port: ', port);

        return hub;
    };

    this.shutdown = function() {
        log.info('shut the service down and exit...');
    };

    this.getPort = function() {
        return port;
    };

    this.getHubName = function() {
        return hubName;
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!port) throw new Error('server must be constructed with a port');
    if (!hubName) throw new Error('server must be constructed with a hub name');
};

/**
 * factory method to create a message hub instance from a simple config object.
 *
 * @param options
 */
MessageHub.createInstance = function(options) {
    'use strict';

    var hub,
        LogManager;

    if (!options) {
        throw new Error('message hub requires a port and hub name');
    }

    // construct a logger
    if (!options.log) {
        LogManager = require('simple-node-logger');
        if (typeof options.readLoggerConfig === 'function') {
            options.log = LogManager.createRollingFileLogger( options.readLoggerConfig() );
        } else {
            options.log = LogManager.createSimpleLogger();
        }
    }

    return new MessageHub( options );
};

module.exports = MessageHub;