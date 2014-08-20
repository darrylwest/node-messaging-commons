#!/usr/bin/env node

var config = require( __dirname + '/config' ).readMessageHubConfig(),
    MessageHub = require('../lib/MessageHub'),
    hub;
    
config.daemon = false;
config.env = 'development';

hub = MessageHub.createInstance( config );

hub.start();

// add a heartbeat publisher and send once a second
/*
setInterval(function() {
    console.log('heartbeat');
}, 1000);
*/

