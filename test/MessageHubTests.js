/**
 * @class MessageHubTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/18/14
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    Config = require('../lib/controllers/Config'),
    MessageHub = require('../lib/MessageHub');

describe('MessageHub', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('MessageHub');
        opts.config = {
            "port":23442,
            "hubName":"CustomHub",
            "channels":[ "logger", "chat", "bug-alert" ]
        };

        return opts;
    };

    describe('#instance', function() {
        var hub = new MessageHub( createOptions()),
            methods = [
                'start',
                'shutdown'
            ];

        it('should create an instance of MessageHub', function() {
            should.exist( hub );
            hub.should.be.instanceof( MessageHub );
        });

        it('should have all known methods by size', function() {
            dash.methods( hub ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                hub[ method ].should.be.a('function');
            });
        });
    });
});

