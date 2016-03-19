/**
 * @class MessageHubTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/18/14
 */
const should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    MessageHub = require('../lib/MessageHub'),
    ApplicationFactory = require('../lib/controllers/ApplicationFactory');

describe('MessageHub', function() {
    'use strict';

    const createOptions = function() {
        const opts = {};

        opts.log = MockLogger.createLogger('MessageHub');
        opts.port = 23442;
        opts.hubName = 'CustomHub';

        // "channels":[ "logger", "chat", "bug-alert" ]

        opts.serviceFactory = new ApplicationFactory( opts );

        return opts;
    };

    describe('#instance', function() {
        const opts = createOptions(),
            hub = new MessageHub( opts ),
            methods = [
                'start',
                'shutdown',
                'createProducer',
                'createConsumer',
                'getPort',
                'getHubName'
            ];

        it('should create an instance of MessageHub', function() {
            should.exist( hub );
            hub.should.be.instanceof( MessageHub );

            hub.getPort().should.equal( opts.port );
            hub.getHubName().should.equal( opts.hubName );
        });

        it('should have all known methods by size', function() {
            dash.functions( hub ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                hub[ method ].should.be.a('function');
            });
        });
    });

    describe('createInstance', function() {
        it('should create an instance of message hub with a simple logger', function() {
            const opts = {
                    port:4321,
                    hubName:'testHub'
                },
                hub = MessageHub.createInstance( opts );

            should.exist( hub );
            hub.should.be.instanceof( MessageHub );

            hub.getPort().should.equal( opts.port );
            hub.getHubName().should.equal( opts.hubName );
        });
    });

    describe('createProducer', function() {
        const hub = new MessageHub( createOptions() );

        it('should create a message producer for a given channel', function() {
            const producer = hub.createProducer( 'mychannel' );

            should.exist( producer );
        });
    });

    describe('createConsumer', function() {
        const hub = new MessageHub( createOptions() );

        it('should create a message consumer for a channel', function() {
            const consumer = hub.createConsumer( 'mychannel' );

            should.exist( consumer );
        });
    });
});

