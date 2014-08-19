/**
 * @class ApplicationFactory
 * @classdesc create the server; read the static page; start the message server
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var dash = require('lodash'),
    MessageSocketService = require('../services/MessageSocketService');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        logManager = options.logManager,
        messageSocketService = options.messageSocketService;

    if (!logManager) {
        // construct a logger
        (function() {
            var SimpleLogger = require('simple-node-logger');
            logManager = new SimpleLogger( options );

            // TODO parse options for more complex configurations
            logManager.createConsoleAppender();
        })();
    }

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

    this.createLogger = function(name, level) {
        return logManager.createLogger( name, level );
    };
};

module.exports = ApplicationFactory;
