#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    id = 'my-unique-id',
    hub = MessageHub.createInstance( config ),
    publisher = hub.createProducer( channel, id );

setInterval(function() {
    var obj = {
        publisherMessage:'hi',
        created:new Date().toJSON(),
        count:publisher.getMessageCount()
    };

    console.log('publish: ', obj, ' to ', channel);

    publisher.publish( obj );
}, 1000);


