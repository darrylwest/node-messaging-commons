/**
 * @class AbstractMessageClient
 * @classdesc browser side base class to enable subscribe, publish, wrap, etc; may also be used as a
 * remote message client that runs on a remote host that communicates through the main hub.
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/31/14
 */
var AbstractMessageClient = function(options) {
    'use strict';

    var client = this,
        log = options.log,
        socketHost = options.socketHost,
        hubName = options.hubName,
        hub;

    /**
     * open the public/private channels to begin exchanges
     */
    this.subscribe = function(channelName, handler, callback) {
        client.createHub();

        if (typeof handler !== 'function') {
            throw new Error('must subscribe with a handler, using default...');
        }

        log.info('open the access channel: ', channelName);

        hub.subscribe( channelName, handler ).then(function() {
            log.info('channel ', channelName, ' now alive...');

            if (callback) {
                callback( channelName );
            }
        });
    };

    /**
     * wrap the request message and publish to the specified channel
     *
     * @param channel - the channel name
     * @param id - the ssid
     * @param request - the message body
     */
    this.publish = function(channel, ssid, request) {
        var message = client.wrapMessage(ssid, request);

        if (log.isDebug()) {
            log.debug('publish to ', channel, ', message: ', JSON.stringify( message ));
        }

        hub.publish( channel, message );
    };

    /**
     * create the message hub from socket host
     *
     * @returns the message hub
     */
    this.createHub = function() {
        if (!hub) {
            hub = new Faye.Client( socketHost + hubName, { timeout:45 });
        }

        return hub;
    };

    /**
     * create the standard wrapper.  NOTE does not include hmac digest
     *
     * @param request a request object
     * @returns the wrapped message request
     */
    this.wrapMessage = function(model, session) {
        var message = {
            ts:Date.now(),
            message:model
        };

        if (session) {
            message.ssid = session;
        }

        return message;
    };

    // constructor validations
    if (!log) throw new Error('access client must be constructed with a log');
};

AbstractMessageClient.extend = function(child, options) {
    'use strict';

    var parent = new AbstractMessageClient( options );

    [ 'subscribe', 'publish', 'createHub', 'wrapMessage' ].forEach(function(method) {
        child[ method ] = parent[ method ];
    });

    return parent;
};

if (typeof module === 'object') {
    module.exports = AbstractMessageClient;
}