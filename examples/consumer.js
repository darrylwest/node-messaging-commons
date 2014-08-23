#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    hub = MessageHub.createInstance( config ),
    id = 'MsgConsumerThread',
    consumer = hub.createConsumer( channel, id );

consumer.onConnect(function(chan) {
    console.log('!!!! now connected to ', chan);
    consumer.publish( { myid:id, say:'howdy! from ' + id } );
});

consumer.onMessage(function(message) {
    console.log( '>>> message recieved: ', message );
});

