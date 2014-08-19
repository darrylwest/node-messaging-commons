# Node Message Commons
- - -

[![Build Status](https://travis-ci.org/darrylwest/node-messaging-commons.svg?branch=master)](https://travis-ci.org/darrylwest/node-messaging-commons)

A websocket library of pub/sub support for secure web socket messaging.

## Introduction
Node messaging commons leverages the [faye](http://faye.jcoglan.com/) pub/sub module to provide a library of secure web socket messaging for known domains and channels.

## Installation

~~~
	npm install node-message-commons --save
~~~

## API

The messaging API provides methods to create a message service hub to run on a specified port with a designated name.  The api also provides methods to create server-side message producers and consumers.  There are also support libraries that can be used to create message producers and consumers in the browser.

The message hub is configurable through any javascript
object, but typically from an external json file.

A typical implementation looks like this:

~~~
	var MessageHub = require('node-messaging-commons');
        
    var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
    hub.start();
~~~

This small bit of code gets the message backbone hub started.  With a hub in place, you are ready to add producer and consumer channels and exchange messages.

## Producer / Publisher

Message publishers (producers) may run on the server-side to broadcast messages to listening subscribers (consumers).  Publishers many also run inside the browser.   

### Server-side Message Producer

Assuming the service hub already exists, creating a server-side publisher would look like this:

~~~
	var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
        
    var producer = hub.createProducer( 'mywork-channel' );
    producer.on('open', function() {
    	producer.send( { "alert":"producer is now active..." });
    });
~~~

### Message Producer in the Browser

- websockets port 80
- create the channel, wait for acknowledgement from hub
- send messages to subscribers (if any)

## Consumer / Subscriber

Similar to publishers, message subscribers may run either on the server or in the browser.  

### Server-Side Message Subscriber

~~~
	var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
        
    var consumer = hub.createConsumer( 'mywork-channel' );
    consumer.on('message', function(msg)) {
    	// messages are wrapped in JSON with id, ts, and message object
    });
~~~

### Message Subscriber in the Browser

- websockets port 80
- subscribe to a known channel
- handle incoming messages

## Configuration

A configuration object specifies the machine port, the hub name and other parameters that control the message system.  A minimal configuration would look like this:

~~~
	{
    	"port":23442,
        "hubName":"MyMessageHub"
    }
~~~

This defines a message hub listening on port 23442 with a name of MyMessageHub and accepting pub/sub messages on any defined channel channels.

A more robust solution would specify a logger and other parameters like a list of valid channel names.  It would look like this:

~~~
	var Config = function() {
    	var config = this;
        
        this.port = 23442;
        this.hubName = 'MyMessageHub';
        this.channels = [ 'user', 'order', 'logger' ]
        this.daemon = true;
        
        this.readLoggerConfig = function() {
        	// create the logger config
        };
    };
    
    module.exports = Config;
~~~

Then creating the hub would be done with:

~~~
	var Config = require('./Config')
~~~

See the *examples* folder for a fully implemented example.



## Tests

Unit tests include should/specs, jshint and validate-package.  Tests can be run from the command line with this:

~~~
	make test
    
    // or
    
    make watch
    
    // or 
    
    grunt mochaTest jshint validate-package
~~~


- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.05</em></small></p>
