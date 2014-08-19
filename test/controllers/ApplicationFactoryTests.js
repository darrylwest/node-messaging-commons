/**
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    ApplicationFactory = require('../../lib/controllers/ApplicationFactory');

describe('ApplicationFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.logManager = MockLogger;

        return opts;
    };

    describe('#instance', function() {
        var factory = new ApplicationFactory( createOptions()),
            methods = [
                'createMessageSocketService',
                'initialize',
                'start'
            ];

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );
            factory.should.be.instanceof( ApplicationFactory );
        });

        it('should have all known methods by size', function() {
            dash.methods( factory ).length.should.equal( methods.length );

            methods.forEach(function(method) {
                factory[ method ].should.be.a('function');
            });
        });
    });
});

