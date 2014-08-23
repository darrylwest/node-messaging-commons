#!/usr/bin/env node

var config = require( __dirname + '/config' ).readMessageHubConfig(),
    hub = require( __dirname + '/../index').createInstance( config );

// service runner automatically starts...
// hub.start();

