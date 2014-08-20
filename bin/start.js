#!/usr/bin/env node

var config = require( __dirname + '/config' ).readMessageHubConfig(),
    hub = require( __dirname + '/../index').createInstance( config );

hub.start();

