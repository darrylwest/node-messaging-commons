#!/usr/bin/env node

var config = require( __dirname + '/config' ).readMessageHubConfig(),
    MessageHub = require('../lib/MessageHub'),
    hub;
    
config.daemon = false;
config.env = 'development';

hub = MessageHub.createInstance( config );

hub.start();

var provider = hub.createProducer( '/heartbeat' ),
    i = 0;;

// add a heartbeat publisher and send once a second
setInterval(function() {
    var obj = {
        created:new Date().toJSON(),
        iteration:i++
    };

    provider.publish( obj );
}, 1000);

