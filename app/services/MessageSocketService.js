/**
 * @class MessageSocketService
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var dash = require('lodash'),
    http = require('http'),
    faye = require('faye' );

var MessageSocketService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        port = options.port,
        messageHub = options.messageHub,
        subscribers = {},
        running = false,
        bayeux;

    // this works locally but will not work through the proxy
    this.serverPageCallback = function(request, response) {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end( JSON.stringify( service.createStatusMessage() ));
    };

    this.createStatusMessage = function() {
        log.info('create the status message with version, subscribers, etc');
        var status = {};

        status.version = options.version;
        status.subscribers = subscribers;

        return status;
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

            log.info('start the message server');

            var server = http.createServer( service.serverPageCallback );

            bayeux = new faye.NodeAdapter({ mount: messageHub, timeout:45 });
            bayeux.attach( server );

            log.info('listening on port: ', port, ', hub: ', messageHub);

            server.listen( port );

            bayeux.on( 'subscribe', service.subscribeHandler );
            bayeux.on( 'unsubscribe', service.unsubscribeHandler );
            bayeux.on( 'disconnect', service.disconnectHandler );

            running = true;
        }
    };

    this.shutdown = function() {
        log.info('shutdown the server after notifying clients');

        // TODO loop through the sockets an shut them down...
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!port) throw new Error('server must be constructed with a port');
    if (!messageHub) throw new Error('server must be constructed with a message hub');
};

module.exports = MessageSocketService;
