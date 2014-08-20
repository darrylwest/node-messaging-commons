#!/usr/bin/env node

var host = 'localhost:29169',
    faye = require('faye'),
    url = 'http://' + host + '/ExampleMessageHub',
    client = new faye.Client( url ),
    sub, 
    channel='/heartbeat';

console.log( 'connect to ', url );

sub = client.subscribe(channel, function(message) {
    console.log('message received from: ', channel, ': ', message);
});

sub.then(function() {
    console.log('subscription to ', channel, ' accepted.');
});

