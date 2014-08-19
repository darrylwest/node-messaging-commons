#!/usr/bin/env node

var config = require( __dirname + '/config' ).readMessageHubConfig(),
    MessageHub = require('../lib/MessageHub'),
    hub = MessageHub.createInstance( config );

hub.start();

