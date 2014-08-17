#!/usr/bin/env node

var host = 'localhost:29169',
    faye = require('faye'),
    url = 'http://' + host + '/RainCityMessageHub',
    client = new faye.Client( url ),
    channel = '/logging',
    sub;

channel='/test-channel';

console.log( 'connect to ', url );

sub = client.subscribe(channel, function(message) {
    console.log('message received: ', message);
});

sub.then(function() {
    console.log('subscription to ', channel, ' accepted.');
});

