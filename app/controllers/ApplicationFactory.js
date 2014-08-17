/**
 * @class ApplicationFactory
 * @classdesc create the server; read the static page; start the message server
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var dash = require('lodash'),
    Config = require('./Config'),
    MessageSocketService = require('../services/MessageSocketService');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        logManager = options.logManager,
        messageSocketService = options.messageSocketService;

    if (!log) {
        log = logManager.createLogger('ApplicationFactory');
    }

    this.createMessageSocketService = function() {
        if (!messageSocketService) {
            log.info('create the message socket service');

            var opts = dash.clone( options );

            log.info('port: ', opts.port);

            opts.log = logManager.createLogger('MessageSocketService');

            messageSocketService = new MessageSocketService( opts );
        }

        return messageSocketService;
    };

    /**
     * create and start the message server
     */
    this.initialize = function() {
        log.info('initialize the server, version: ', options.version);
        factory.createMessageSocketService();
    };

    this.start = function() {
        log.info('start the message service...');

        var service = factory.createMessageSocketService();
        service.start();
    };

    if (!log) {
        log = logManager.createLogger('ApplicationFactory');
    }
};

ApplicationFactory.createInstance = function() {
    'use strict';
    // TODO create bootstrap to configure logger and env

    var applicationFactory,
        env = 'development',
        config = Config[ env ]();

    config.logManager = require('simple-node-logger').createLogger();

    applicationFactory = new ApplicationFactory( config );
    applicationFactory.initialize();

    return applicationFactory;
};

module.exports = ApplicationFactory;
