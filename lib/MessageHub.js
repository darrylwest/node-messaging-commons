/**
 * @class MessageHub
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/18/14
 */
var LogManager = require('simple-node-logger').createLogManager();

var MessageHub = function(options) {
    'use strict';

    var hub = this,
        log = options.log,
        config = options.config;

    this.start = function() {
        log.info('start the message service with config: ', config);

        return hub;
    };

    this.shutdown = function() {
        log.info('shut the service down and exit...');
    };


    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!config) throw new Error('server must be constructed with a config object');
};

MessageHub.startService = function(config) {
    var factory,
        opts = {},
        hub;


    opts.config = config;

    hub = new MessageHub( opts );

    return hub.start();
};

module.exports = MessageHub;