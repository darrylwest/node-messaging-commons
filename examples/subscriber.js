#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    hub = MessageHub.createInstance( config ),
    consumer = hub.createConsumer( channel );

consumer.onMessage(function(message) {
    console.log( message );
});

