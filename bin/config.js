/**
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/19/14
 */


module.exports.readMessageHubConfig = function() {
    'use strict';
    var config = {};

    config.port = 29169;
    config.hubName = '/ExampleMessageHub';
    config.channels = [ 'user', 'bugs', 'blog', 'chat' ];

    // other security configurations...

    // disable this for now...
    config.xreadLoggerConfig = function() {
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

    return config;
};

