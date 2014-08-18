/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/18/14
 */
var MessageHub = function(options) {
    'use strict';

    var hub = this,
        log = options.log,
        config = options.config;

    this.start = function() {
        log.info('start the message service with config: ', config);
    };

    this.shutdown = function() {

    };


    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!config) throw new Error('server must be constructed with a config object');
};

module.exports = MessageHub;