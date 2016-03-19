/**
 * @class MessageSocketServiceTests
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
const should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    MessageSocketService = require('../../lib/services/MessageSocketService');

describe('MessageSocketService', function() {
    'use strict';

    const createOptions = function() {
        const opts = {};

        opts.version = '00.90.99';
        opts.port = 29169;
        opts.hubName = 'ExampleMessageHub';
        opts.channels = [ 'user', 'bugs', 'blog', 'chat' ];

        opts.log = MockLogger.createLogger('MessageSocketService');

        return opts;
    };

    describe('#instance', function() {
        const service = new MessageSocketService( createOptions()),
            methods = [
                'start',
                'serverPageCallback',
                'subscribeHandler',
                'unsubscribeHandler',
                'disconnectHandler',
                'createStatusMessage',
                'formatElapsedTime',
                'shutdown'
            ];

        it('should be an instance of MessageSocketService', function() {
            should.exist( service );

            service.should.be.instanceof( MessageSocketService );
        });

        it('should have all known methods', function() {
            dash.functions( service ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                service[ method ].should.be.a('function');
            });
        });
    });

    describe('createStatusMessage', function() {
        const options = createOptions(),
            service = new MessageSocketService( options );

        it('should create a standard status message', function() {
            const status = service.createStatusMessage();

            should.exist( status );

            status.version.should.equal( options.version );
        });
    });
});
