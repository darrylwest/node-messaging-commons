/**
 * @class MessageServiceTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 2014-05-29
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    Config = require('../../app/controllers/Config'),
    MessageSocketService = require('../../app/services/MessageSocketService');

describe('MessageSocketService', function() {
    'use strict';

    var createOptions = function() {
        var opts = new Config.test();

        opts.log = MockLogger.createLogger('MessageSocketService');

        return opts;
    };

    describe('#instance', function() {
        var service = new MessageSocketService( createOptions()),
            methods = [
                'start',
                'serverPageCallback',
                'subscribeHandler',
                'unsubscribeHandler',
                'disconnectHandler',
                'createStatusMessage',
                'shutdown'
            ];

        it('should be an instance of MessageSocketService', function() {
            should.exist( service );

            service.should.be.instanceof( MessageSocketService );
        });

        it('should have all known methods', function() {
            dash.methods( service ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                service[ method ].should.be.a('function');
            });
        });
    });

    describe('createStatusMessage', function() {
        var options = createOptions(),
            service = new MessageSocketService( options );

        it('should create a standard status message', function() {
            var status = service.createStatusMessage();

            should.exist( status );

            status.version.should.equal( options.version );
        });
    });
});