/**
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/20/14
 */
const dash = require('lodash');

const MockMessageClient = function() {
    'use strict';

    const client = this;

    let messageCallback;

    this.channel = null;

    this.subscribe = function(channel, callback) {
        client.channel = channel;
        console.log('subscribed to ', channel);
        messageCallback = callback;
    };

    this.then = function(callback) {
        if (callback) {
            dash.defer( callback, 'subscription accepted' );
        }
    };

    this.cancel = function() {
        client.channel = null;
    };

    this.publish = function(channel, message) {
        if (channel === client.channel && messageCallback) {
            dash.defer( messageCallback, message );
        }
    };
};

module.exports = MockMessageClient;
