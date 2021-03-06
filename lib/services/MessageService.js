/**
 * @class MessageService
 * @classdesc Subscribe to a channel; distribute messages to listeners when they arrive
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/19/14
 */
const crypto = require('crypto'),
    dash = require( 'lodash' );

const MessageService = function(options) {
    'use strict';

    const service = this,
        log = options.log;

    let algorithm = options.algorithm,
        hmacEncoding = options.hmacEncoding || 'hex',
        client = options.client,
        channel = options.channel,
        ssid = options.ssid,
        subscribed = false,
        listeners = [],
        connectListeners = [],
        count = 0;

    const connectHandler = function() {
        log.info('message subscription to ', channel, ' accepted, tell listeners: ', connectListeners.length);

        connectListeners.forEach(function(listener) {
            listener( channel );
        });
    };

    const messageHandler = function(message) {
        if (log.getLevel() === 'debug') {
            log.debug('message: ',  JSON.stringify( message ));
        }

        count++;

        listeners.forEach(function(listener) {
            listener( message );
        });
    };

    /**
     * add a subscriber/listener to this message stream
     *
     * @param listener - function( message )
     */
    this.onMessage = function(listener) {
        if (!subscribed) {
            log.info('subscribe to channel: ', channel);
            client.subscribe( channel, messageHandler );
            client.then( connectHandler );

            subscribed = true;
        }

        log.info('add listener to channel: ', channel);
        listeners.push( listener );
    };

    /**
     * send the channel name when a subscription is accepted by the hub
     *
     * @param listener - the handler function
     */
    this.onConnect = function(listener) {
        log.info('add a connection listener...');
        connectListeners.push( listener );
    };

    /**
     * publish message (model) to the channel by wrapping in the standard wrapper
     *
     * @param model - data to publish
     * @param session - optional session key used for message digest
     */
    this.publish = function(model, session) {
        const msg = service.wrapMessage( model, session );

        count++;

        if (log.getLevel() === 'debug') {
            log.debug('publish message: ', msg);
        }

        client.publish( channel, msg );
    };

    this.close = function() {
        log.info('close the client connection, remove the listeners');

        connectListeners.splice( 0 );
        listeners.splice( 0 );

        client.unsubscribe();
        subscribed = false;
    };

    /**
     * @returns the total number of messages processed
     */
    this.getMessageCount = function() {
        return count;
    };

    /**
     * provides a standard message wrapper including timestamp (ts), version, uid and message.  override
     * this to provide alternate wrapper(s).
     *
     * @param model - the message model - can be a simple string or complex object
     * @param session - an optional session key used to generate message digest
     * @returns the wrapped message object
     */
    this.wrapMessage = function(model, session) {
        const obj = {
            ts:Date.now(),
            version:'1.0'
        };

        if (ssid) {
            obj.ssid = ssid;
        }

        obj.message = model;

        if (algorithm && session) {
            obj.hmac = service.calculateDigest( model, session );
        }

        return obj;
    };

    /**
     * stringify the value and use the key to generate an hmac digest
     *
     * @param value - message object or string
     * @param key - the session key
     * @returns the calculated hmac code in the specified hmacEncoding (defaults to hex)
     */
    this.calculateDigest = function(value, key) {
        const json = JSON.stringify( value ),
            hmac = crypto.createHmac( algorithm, dash.isString( key ) ? key : key.toString() );

        hmac.update( json );
        return hmac.digest( hmacEncoding );
    };

    /**
     * return the service's id if set on construction
     */
    this.getId = function() {
        return ssid;
    };

    // constructor validations
    if ( !log ) throw new Error( 'service must be constructed with a logger' );
    if ( !client ) throw new Error( 'service must be constructed with a socket client' );
    if ( !channel ) throw new Error( 'service must be constructed with a channel' );
};

/**
 * will create a message service and create a faye client from messageURL
 *
 * @param options - log, channel and optional messageURL including host, port, hub name
 */
MessageService.createInstance = function(options) {
    'use strict';

    const opts = dash.clone( options );

    if (!opts.client && opts.messageURL) {
        const faye = opts.faye || require('faye');
        opts.client = new faye.Client( opts.messageURL );
    }

    return new MessageService( opts );
};

module.exports = MessageService;
