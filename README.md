# Node Message Commons
- - -

[![Build Status](https://travis-ci.org/darrylwest/node-messaging-commons.svg?branch=master)](https://travis-ci.org/darrylwest/node-messaging-commons)

A websocket library of pub/sub support for secure web socket messaging.

## Introduction
Node messaging commons leverages the [faye](http://faye.jcoglan.com/) pub/sub module to provide a library of secure web socket messaging for known domains and channels.

## API

The stanard API provides methods to create a message hub as well as message producers and consumers.  The message hub is configurable through any javascript
object, but typically from an external json file.

A typical implementation looks like this:

~~~
	var config = require('./config.json'),
    	MessageHub = require('node-messaging-commons');
        
    MessageHub.startService( config );
~~~

This small bit of code gets the message backbone hub started.  With a hub in place, you are ready to add new channels for message producers and consumers.

## Producer / Publisher

## Consumer / Subscriber

## Examples

## Tests

- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.05</em></small></p>
