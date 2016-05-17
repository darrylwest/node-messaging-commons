# Node Message Commons
- - -

A websocket library of pub/sub support for secure web socket messaging.

[![NPM version](https://badge.fury.io/js/node-messaging-commons.svg)](http://badge.fury.io/js/node-messaging-commons) [![Build Status](https://travis-ci.org/darrylwest/node-messaging-commons.svg?branch=master)](https://travis-ci.org/darrylwest/node-messaging-commons) [![Dependency Status](https://david-dm.org/darrylwest/node-messaging-commons.svg)](https://david-dm.org/darrylwest/node-messaging-commons)

## Introduction
Node messaging commons leverages the [faye](http://faye.jcoglan.com/) pub/sub module to provide a library of secure web socket messaging for known domains and channels.

## Installation

~~~
npm install node-messaging-commons --save
~~~

## API

The messaging API provides methods to create a message service hub to run on a specified port with a designated hub name.  The API provides methods to create server-side message producers and consumers.  There are also support libraries that can be used to create message producers and consumers in the browser.

The message hub is configurable through any javascript object, but may come from an external JSON file.

A minimal implementation looks like this:

~~~
const MessageHub = require('node-messaging-commons');

const hub = MessageHub.createInstance({ port:9099, hubName:'/MyMessageHub' });
hub.start();
~~~

This small bit of code gets the message hub started.  With a hub in place, you are ready to add producer and consumer channels and exchange messages.

## Producer / Publisher

Message producers may run on the server-side to broadcast messages to listening subscribers (consumers).  Publishers many also run inside the browser.  All published messages are sent as JSON strings, routed through the central message hub.

### Server-side Message Producer

Assuming the service hub already exists, creating a server-side publisher would look like this:

~~~
const hub = MessageHub.createInstance({ port:9099, hubName:'/MyMessageHub' });

const producer = hub.createProducer( '/mywork-channel' ),
message = { "alert":"producer is now active..." };

producer.publish( message );
~~~

Producer messages are wrapped in JSON with a timestamp, version and the message object.  The wrapper may be customized by overriding the producer's wrapMessage method.  Current message consumers connected to the /MyMessageHub and listening on channel '/mywork-channel' would receive an initial message that looks like this:

~~~
{
	ts: 1408628582074,
    version: "1.0",
    message:{
    	"alert":"producer is now active..."
    }
}
~~~

### Message Producer in the Browser

- websockets port 80/443
- create the channel, wait for acknowledgement from hub
- send messages to consumers (if any)

_\* demo available soon..._

## Consumer / Subscriber

Similar to publishers, message consumers may run either on the server or in the browser.  On the server, they listen through the hub's local port.  In the browser they are routed through port 80 (or 443 for ssl).

### Server-Side Message Consumer / Subscriber

~~~
iconst hub = MessageHub.createInstance({ port:9099, hubName:'/MyMessageHub' });

const consumer = hub.createConsumer( 'mywork-channel' );
    
consumer.onConnect(function(chan) {
	console.log( 'now accepting messages from ', chan);
});
    
consumer.onMessage(function(msg) {
	// producer messages are wrapped in JSON with id, ts, hmac, and message object
});
~~~

### Message Subscriber in the Browser

- websockets port 80/443
- subscribe to a known channel
- handle incoming messages

_\* demo available soon..._

## Security

The standard wrapper calculates and includes a message digest when the message provider is created with a digest algorithm and the send method includes a session key.  The session key needs to be common to the producer and consumer through a back channel to enable messages to be verified when received.  Here is a typical configuration and use:

~~~
const config = {
	port:9099,
    hubName:'/SessionHub',
    algorithm:'sha256'
};

const hub = MessageHub.createInstance( config ),
	provider = hub.createProvider( '/gameboy' ),
    session = '<my-session-key>';

provider.publish( 'this is a message', session );
~~~

The wrapped message for this configuration looks similar to this:

~~~
{
	ts: 1408628111390,
	version: '1.0',
	message: 'this is a test message',
	hmac: 'b87c0e7777907d438f3c0b3c00c2a8263ce995684193427933d160b94b751831'
}
~~~

## Configuration

A configuration object specifies the machine port, the hub name and other parameters that control the message system.  A minimal configuration would look like this:

~~~
{
	"port":23442,
    "hubName":"/MyMessageHub"
}
~~~

This defines a message hub listening on port 23442 with a name of MyMessageHub and accepting pub/sub messages on any defined channel channels.

A more robust solution would specify a logger, run as a daemon, and specify other parameters like a list of valid channel names.  It would possibly look like this:

~~~
const Config = function() {
	const config = this;

    this.port = 23442;
    this.hubName = '/MyMessageHub';
    this.channels = [ '/user', '/order', '/logger' ]
    this.daemon = true;

    this.readLoggerConfig = function() {
    	// create the logger config
    };
};

module.exports.readMessageHubConfig = function() {
	const config = new Config();

	return config;
};
~~~

Then creating the hub would be done with:

~~~
const Config = require('./Config')
~~~

See the *examples* and *bin* folders for a fully implemented examples and start/stop/run scripts.

## Message Hub Status

The local machine may access the message hub server to query for status through an HTTP request.  The request looks like this:

~~~
curl http://localhost:<port>/
~~~

And a response (without any subscribers) looks something like this:

~~~
{
	"version": "00.91.11",
	"hubName": "/ExampleMessageHub",
	"subscribers": {}
}
~~~

This can only be executed on the serving machine.

## Shutdown

The http service also supports a shutdown command using a post:

~~~
curl -X POST http://localhost:<port>/shutdown
~~~

This can only be executed on the serving machine.


## Examples

### Server Examples
- simple.js : creates a minimal hub, message producer and subscriber
- producer.js : creates a message producer to send messages to /test-channel
- consumer.js : recieves messages from a publisher on /test-channel
- config.js : an example of a typical configuration

### Browser Examples

There is an index file with a test message page.

## The bin folder

These scripts are typical start/stop/status and config scripts used as templates for production installations.

- bin/start.js - read the config file and start the message service
- bin/status.js - return the current message service status
- bin/stop.js - stop the message service
- bin/run.js - run in the foreground

## Tests

### Unit Tests
Unit tests include should/specs, jshint and validate-package.  Tests can be run from the command line with this:

~~~
make test

// or

make watch
~~~

### Mocks

There is a single mock called MockMessageClient.  You access it like this:

~~~
const MockMessageClient = require('node-messaging-commons').mocks.MockMessageClient;
    
const mock = new MockMessageClient();
    
~~~

- - -
###### Copyright © 2014-2016, rain city software | Version 0.91.11
