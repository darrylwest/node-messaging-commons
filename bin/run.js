#!/usr/bin/env node

var MessageHub = require( __dirname + '/../index'),
    config = require( __dirname + '/config' ).readMessageHubConfig(),
    hub;
    
// don't run in background...
config.daemon = false;

hub = MessageHub.createInstance( config );
hub.start();



