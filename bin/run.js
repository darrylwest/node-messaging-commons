#!/usr/bin/env node

var config = require( __dirname + '/../config.json' ),
    MessageHub = require( __dirname + '/../index'),
    hub = MessageHub.createInstance( config );

hub.start();

