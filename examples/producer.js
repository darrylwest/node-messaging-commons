#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    id = 'my-unique-id',
    hub = MessageHub.createInstance( config ),
    publisher = hub.createProducer( channel, id );

setInterval(function() {
    var model = {
        created:new Date().toJSON(),
        count:publisher.getMessageCount()
    };

    console.log('publish: ', model, ' to ', channel);

    // send the message model and use the app key as session for hmac
    publisher.publish( model, config.appkey );
}, 15000);

publisher.onConnect(function() {
    // this should never fire because connect events are just for consumers
    console.log('!!!!! publisher is now connected !!!!!!');
});

process.nextTick(function() {
    console.log( 'send the hello message...');
    publisher.publish( 'PRODUCER channel now active', config.appkey );
});

