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

The stanard API provides methods to create a message hub as well as message producers and consumers.  The message hub is configurable through any javascript
object, but typically from an external json file.

A typical implementation looks like this:

~~~
	var MessageHub = require('node-messaging-commons');
        
    var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
    hub.start();
~~~

This small bit of code gets the message backbone hub started.  With a hub in place, you are ready to add new channels for message producers and consumers.

## Producer / Publisher

Publishers may reside on the server or inside the browser.  Creating a publisher on the server looks like this:

~~~
	var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
        
    var producer = hub.createProducer( 'mywork-channel' );
    producer.on('open', function() {
    	producer.send( { "alert":"producer is now active..." });
    });
~~~

## Consumer / Subscriber

Subscribers may reside on the server or in the browser
~~~
	var hub = MessageHub.createInstance({ port:9099, hubName:'MyMessageHub' });
        
    var consumer = hub.createConsumer( 'mywork-channel' );
    consumer.on('message', function(msg)) {
    	// messages are wrapped in JSON with id, ts, and message object
    });
~~~

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
