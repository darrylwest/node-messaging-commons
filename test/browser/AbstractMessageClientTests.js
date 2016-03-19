/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/31/14
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    AbstractMessageClient = require('../../browser/AbstractMessageClient');

describe('AbstractMessageClient', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('AbstractMessageClient');
        opts.hub = {};
        opts.ssid = 'test-server';

        return opts;
    };

    describe('#instance', function() {
        var client = new AbstractMessageClient( createOptions()),
            methods = [
                'subscribe',
                'createHub',
                'publish',
                'wrapMessage'
            ];

        it('should create an instance of AbstractMessageClient', function() {
            should.exist( client );
            client.should.be.instanceof( AbstractMessageClient );
        });

        it( 'should contain all known methods based on method count and type', function() {
            dash.functions( client ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                client[ method ].should.be.a('function');
            });
        });
    });
});
