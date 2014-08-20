/**
 * @class MessageHub
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/18/14
 */
var dash = require('lodash'),
    ApplicationFactory = require('./controllers/ApplicationFactory'),
    MessageSocketService = require('./services/MessageSocketService');

var MessageHub = function(options) {
    'use strict';

    var hub = this,
        log = options.log,
        port = options.port,
        hubName = options.hubName,
        channels = options.channels,
        serviceFactory = options.serviceFactory,
        messageSocketService;

    this.start = function() {

        if (!messageSocketService) {
            log.info('create and start the message hub: ', hubName, ' on port: ', port);
            messageSocketService = serviceFactory.createMessageSocketService();
            messageSocketService.start();
        }
    };

    this.shutdown = function() {
        if (messageSocketService) {
            log.info('create and start the message hub: ', hubName, ' on port: ', port);
            messageSocketService.shutdown();
        }
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
        factory,
        opts;

    if (!options) {
        throw new Error('message hub requires a port and hub name');
    }

    factory = new ApplicationFactory( options );

    opts = dash.clone( options );
    opts.log = factory.createLogger('MessageHub');
    opts.serviceFactory = factory;

    return new MessageHub( opts );
};

module.exports = MessageHub;