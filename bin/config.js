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

    // disable this for now...
    this.xreadLoggerConfig = function() {
        var opts = {
            logDirectory: process.env.HOME + '/logs',
            fileNamePattern:[ 'messages-', config.port, '-<DATE>.log' ].join(''),
            dateFormat:'YYYY.MM.DD',
            level:'info',
            loggerConfigFile: __dirname + '/logger-config.json',
            refresh:120 * 1000 // re-read the config json file each 120 seconds
        };

        return opts;
    };
};

module.exports.readMessageHubConfig = function() {
    var config = new Config();

    return config;
};

