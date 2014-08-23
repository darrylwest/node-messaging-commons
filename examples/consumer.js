#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    hub = MessageHub.createInstance( config ),
    consumer = hub.createConsumer( channel );

consumer.onConnect(function(chan) {
    console.log('connected to ', chann);
    consumer.send( { myid:'123456', say:'howdy!' } );
});

consumer.onMessage(function(message) {
    console.log( message );
});

