#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    uuid = require('node-uuid'),
    channel = config.channels[ 0 ],
    MessageHub = require( __dirname + '/../index' ),
    casual = require('casual'),
    id = 'p' + casual.array_of_digits( 10 ).join(''),
    hub = MessageHub.createInstance( config ),
    publisher = hub.createProducer( channel, id );

var createModel = function() {
    var model = {
        token:uuid.v4(),
        created:new Date().toJSON(),
        count:publisher.getMessageCount()
    };

    return model;
};

setInterval(function() {
    var model = createModel();
    console.log('publish: ', model, ' to ', channel);

    // send the message model and use the app key as session for hmac
    publisher.publish( model, config.appkey );
}, 100);

publisher.onConnect(function() {
    // this should never fire because connect events are just for consumers
    console.log('!!!!! publisher is now connected !!!!!!');
});

process.nextTick(function() {
    console.log( 'send the hello message...');

    var model = createModel();
    model.appkey = config.appkey;
    publisher.publish( model, config.appkey );
});

