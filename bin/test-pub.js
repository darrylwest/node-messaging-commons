#!/usr/bin/env node

var host = 'localhost:29169',
    casual = require('casual'),
    faye = require('faye'),
    url = 'http://' + host + '/RainCityMessageHub',
    client = new faye.Client( url ),
    channel = '/logging',
    delay = 1000; // tested down to 10 ms running local publisher and remote clients

channel='/test-channel';

console.log( 'connect to ', url );

setInterval(function() {
    var msg = {
        ts:Date.now(),
        version: '1.0',
        message:{
            
        }
    };

    console.log('publish: ', msg, ' to ', channel);

    client.publish( channel, msg );
}, delay);


