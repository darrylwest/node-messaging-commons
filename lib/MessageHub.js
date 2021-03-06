/**
 * @class MessageHub - primary entry point for server side implementations
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/18/14
 */
const dash = require('lodash'),
    ApplicationFactory = require('./controllers/ApplicationFactory'),
    MessageSocketService = require('./services/MessageSocketService' ),
    Logger = require('simple-node-logger');

const MessageHub = function(options) {
    'use strict';

    const hub = this,
        log = options.log,
        port = options.port,
        hubName = options.hubName,
        serviceFactory = options.serviceFactory,
        daemon = options.daemon;

    let serviceRunner = options.serviceRunner,
        messageSocketService;

    /**
     * start and return the message socket service (hub)
     *
     * @returns an instance of the message socket service (hub)
     */
    this.start = function() {
        if (!messageSocketService) {
            log.info('create and start the message hub: ', hubName, ' on port: ', port);
            messageSocketService = serviceFactory.createMessageSocketService();
            messageSocketService.start();
        }

        return messageSocketService;
    };

    /**
     * shutdown the message socket service (hub)
     */
    this.shutdown = function() {
        if (messageSocketService) {
            log.info('create and start the message hub: ', hubName, ' on port: ', port);
            messageSocketService.shutdown();
        }
    };

    this.createProducer = function(channel, id) {
        log.info('create and return a message producer for channel: ', channel);

        const producer = serviceFactory.createMessageService( channel, id );

        return producer;
    };

    this.createConsumer = function(channel, id) {
        log.info('create and return a message consumer for channel: ', channel);

        const consumer = serviceFactory.createMessageService( channel, id );

        return consumer;
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
    if (!serviceFactory) throw new Error('server must be constructed with an application service factory');

    const runInstance = function() {
        let childKey = '--run-child-service',
            args = dash.toArray( process.argv ),
            runner,
            child,
            command;

        args.shift();

        if (args[ 1 ] === childKey) {
            console.log('start the hub...');
            hub.start();
        } else {
            command = args.shift();
            args.unshift( childKey );

            runner = serviceRunner.createDaemonRunner();
            child = runner.start( command, args );

            log.info('running child pid: ', child.pid);

            setTimeout(function() {
                process.kill( process.pid );
            }, 100);
        }

        return child;
    };

    if (daemon && daemon === true) {
        if (!serviceRunner) {
            log.info('load the service runner...');
            serviceRunner = require('background-service-runner');
        }

        runInstance();
    }
};

/**
 * factory method to create a message hub instance from a simple config object.
 *
 * @param options
 */
MessageHub.createInstance = function(options) {
    'use strict';

    if (!options) {
        throw new Error('message hub requires a port and hub name');
    }

    if (typeof options.readLoggerConfig === 'function') {
        options.logManager = new Logger( options.readLoggerConfig() );
        options.logManager.createRollingFileAppender( options.readLoggerConfig() );
    }

    const factory = new ApplicationFactory( options );

    let opts = dash.clone( options );
    opts.log = factory.createLogger('MessageHub');
    opts.serviceFactory = factory;

    return new MessageHub( opts );
};

module.exports = MessageHub;
