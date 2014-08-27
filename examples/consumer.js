#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    hub = MessageHub.createInstance( config ),
    casual = require('casual'),
    id = 'c' + casual.array_of_digits( 10 ).join(''),
    consumer = hub.createConsumer( channel, id ),
    messageCount = 0;

consumer.onConnect(function(chan) {
    console.log('!!!! now connected to ', chan);
    consumer.publish( { myid:id, say:'howdy! from ' + id } );
});

consumer.onMessage(function(message) {
    console.log( '>>> message recieved: ', message );
    if (messageCount++ > 2) {
        consumer.close();
        console.log('\n\nconnection closed, hit ctrl-c to quit...\n');
    }
});

