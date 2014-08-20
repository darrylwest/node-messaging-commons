/**
 * @class MessageService
 * @classdesc Subscribe to a channel; distribute messages to listeners when they arrive
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/19/14
 */
var MessageService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        client = options.client,
        channel = options.channel,
        uid = options.uid,
        subscribed = false,
        listeners = [],
        count = 0;

    /**
     * add a subscriber/listener to this message stream
     *
     * @param listener - function( message )
     */
    this.addSubscriber = function(listener) {
        if (!subscribed) {
            log.info('subscribe to channel: ', channel);
            client.subscribe( channel, messageHandler );

            client.then(function() {
                log.info( 'subscription to ', channel, ' accepted...' );
            });

            subscribed = true;
        }

        log.info('add listener to channel: ', channel);
        listeners.push( listener );
    };

    var messageHandler = function(message) {
        log.debug('message: ',  message );

        listeners.forEach(function(listener) {
            listener( message );
        });
    };

    /**
     * publish message (model) to the channel by wrapping in the standard wrapper
     *
     * @param model - data to publish
     */
    this.publish = function(model) {
        var msg = service.wrapMessage( model );

        count++;

        log.debug('publish message: ', msg);

        client.publish( channel, msg );
    };

    this.getMessageCount = function() {
        return count;
    };

    /**
     * provides a standard message wrapper including timestamp (ts), version, uid and message.  override
     * this to provide alternate wrapper(s).
     *
     * @param model - the message model - can be a simple string or complex object
     * @returns the wrapped message object
     */
    this.wrapMessage = function(model) {
        var obj = {
            ts:Date.now(),
            version:'1.0'
        };

        if (uid) {
            obj.uid = uid;
        }

        obj.message = model;

        return obj;
    };

    // constructor validations
    if ( !log ) throw new Error( 'service must be constructed with a logger' );
    if ( !client ) throw new Error( 'service must be constructed with a socket client' );
    if ( !channel ) throw new Error( 'service must be constructed with a channel' );
};

module.exports = MessageService;
