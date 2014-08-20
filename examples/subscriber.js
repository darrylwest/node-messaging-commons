#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    hub = MessageHub.createInstance( config ),
    consumer = hub.createConsumer( channel );

consumer.addSubscriber(function(message) {
    console.log( message );
});

setInterval(function() {
    var obj = {
        name:'subscriber',
        text:'this is a test message from a subscriber...'
    };

    // consumer.publish( obj );
}, 3500 );

