/**
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var should = require('chai').should(),
    Config = require('../../app/controllers/Config');

describe( 'Config', function() {
    'use strict';

    describe('#instance', function() {


        it('should create an instance of Config', function() {
            should.exist( Config );
            var config = new Config({ env:'test' });

            should.exist( config );
            config.should.be.instanceof( Config );
        });

        it('should have known properties', function() {
            var config = Config.development(),
                propertyList = [
                    'version',
                    'environment',
                    'port'
                ];

            propertyList.forEach(function(prop) {
                config.hasOwnProperty( prop ).should.equal( true );
            });
        });

        it('should create an instance from static constructor', function() {
            var env = 'development',
                config = Config[ env ]();

            should.exist( config );
            // console.log( config );
            config.environment.should.equal( env );
            config.port.should.equal( 29169 );

            console.log( config.logfile );
        });
    });
});
