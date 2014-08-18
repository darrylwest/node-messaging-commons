/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/18/14
 */
var MessageHub = function(options) {
    'use strict';

    var hub = this,
        log = options.log;


    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
};

module.exports = MessageHub;