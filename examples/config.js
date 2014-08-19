/**
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/19/14
 */

var Config = function() {
    'use strict';

    var config = this;

    this.port = 29169;
    this.hubName = '/ExampleMessageHub';
    this.channels = [ 'user', 'bugs', 'blog', 'chat' ];

    // other security configurations...

    // create a rolling file logger...
    this.readLoggerConfig = function() {
        var opts = {
            logDirectory: './',
            fileNamePattern:[ 'messages-', config.port, '-<DATE>.log' ].join(''),
            dateFormat:'YYYY.MM.DD',
            level:'info'
        };

        return opts;
    };
};

module.exports.readMessageHubConfig = function() {
    var config = new Config();

    return config;
};

