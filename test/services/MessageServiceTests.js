/**
 * @class MessageService
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/20/14
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    MockMessageClient = require('../mocks/MockMessageClient'),
    MessageService = require('../../lib/services/MessageService');

describe('MessageService', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('MessageService');
        opts.client = new MockMessageClient();
        opts.channel = '/test-channel';
        opts.uid = 'my-unique-id';

        return opts;
    };

    describe('#instance', function() {
        var service = new MessageService( createOptions() ),
            methods = [
                'addSubscriber',
                'publish',
                'wrapMessage'
            ];

        it('should create an instance of MessageService', function() {
            should.exist( service );
            service.should.be.instanceof( MessageService );
        });

        it( 'should contain all known methods based on method count and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a('function');
            });
        });
    });

    describe('wrapMessage', function() {
        var opts = createOptions(),
            service = new MessageService( opts );

        it('should wrap a message object with a standard wrapper', function() {
            var model = 'this is a test message',
                obj = service.wrapMessage( model );

            should.exist( obj );
            obj.uid.should.equal( opts.uid );
            obj.ts.should.be.above( Date.now() - 20000 );
            obj.version.should.equal( '1.0' );
            obj.message.should.equal( model );
        });
    });
});
