/**
 * @class MessageSocketService
 * @classdesc the primary server-side socket handler
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
const dash = require('lodash'),
    http = require('http'),
    moment = require('moment');

const MessageSocketService = function(options) {
    'use strict';

    const service = this,
        log = options.log,
        version = options.version || require('../../package.json').version,
        subscribers = {},
        faye = options.faye || require('faye'),
        epoch = new Date();

    let port = options.port,
        hubName = options.hubName,
        running = false,
        server = options.server,
        bayeux;

    // this works locally but will not work through the proxy
    this.serverPageCallback = function(request, response) {
        const status = service.createStatusMessage();

        if (request.url === '/shutdown' && request.method === 'POST') {
            log.info('shut down the message service');
            status.message = 'shutdown started...';

            process.nextTick( service.shutdown );
        }

        log.info('request: ', request.url);
        log.info('status: ', status);

        response.writeHead(200, { 'Content-Type':'application/json' } );
        response.end( JSON.stringify( status, true, 2 ) + '\n\r' );
    };

    this.createStatusMessage = function() {
        log.debug('create the status message with version, subscribers, etc');
        const status = {};

        status.version = version;
        status.epoch = epoch.toJSON();
        status.uptime = service.formatElapsedTime( epoch, new Date() );
        status.hubName = hubName;
        status.subscribers = subscribers;
        status.subscriberCount = dash.size( subscribers );
        status.pid = process.pid;

        return status;
    };

    this.formatElapsedTime = function(start, end) {
        const d = moment.duration( end - start );

        const pad = function(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return n;
            }
        };

        log.info('format the duration between start ', start, ' and end ', end, ' = ', d);

        return d.days() + ' days+' + [ pad(d.hours()), pad(d.minutes()), pad(d.seconds()) ].join(':') ;
    };

    this.subscribeHandler = function(id, channel) {
        log.info('new subscriber: ', id, ', channel: ', channel);

        subscribers[ id ] = {
            channel:channel,
            subscriptionDate:new Date().toJSON()
        };

        log.info('subscribers: ', JSON.stringify( subscribers ));
    };

    this.unsubscribeHandler = function(id, channel) {
        log.info('un-subscribed id: ', id, ', channel: ', channel);
        delete subscribers[ id ];
    };

    this.disconnectHandler = function(id) {
        log.info('client disconnect, id: ', id);
    };

    this.start = function() {
        if (running) {
            log.error('server is already running...');
        } else {

            log.info('start the message server, version: ', version);

            if (!server) {
                log.info('create the http server');
                server = http.createServer( service.serverPageCallback );
            }

            bayeux = new faye.NodeAdapter({ mount: hubName, timeout:45 });
            bayeux.attach( server );

            log.info('listening on port: ', port, ', hub name: ', hubName);

            server.listen( port );

            bayeux.on( 'subscribe', service.subscribeHandler );
            bayeux.on( 'unsubscribe', service.unsubscribeHandler );
            bayeux.on( 'disconnect', service.disconnectHandler );

            running = true;
        }
    };

    this.shutdown = function() {
        log.info('shutdown the server after notifying clients');

        if (server) {
            log.info('close the http connection');
            server.close(function() {
                log.info('http connection closed...');
                server = null;
            });
        }

        if (bayeux) {
            process.nextTick(function() {
                log.info('close bayeux');
                bayeux.close();
                log.info('bayeux closed...');
            });
        }

        setTimeout(function() {
            const pid = process.pid;

            log.info('kill the main thread: ', pid);

            process.kill( process.pid );
        }, 500);
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!port) throw new Error('server must be constructed with a port');
    if (!hubName) throw new Error('server must be constructed with a message hub name');
};

module.exports = MessageSocketService;
