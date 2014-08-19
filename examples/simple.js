#!/usr/bin/env node

var MessageHub = require('../lib/MessageHub'),
    hub = MessageHub.createInstance( { port:9099, hubName:'/MyHub' });

hub.start();

