/**
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-20
 */

module.exports.readMessageHubConfig = function() {
    'use strict';
    var config = {};

    config.port = 29169;
    config.hubName = '/ExampleMessageHub';
    config.channels = [ 'heartbeat', 'user', 'bugs', 'blog', 'chat' ];

    config.daemon = true;

    // other security configurations...

    // disable this for now...
    config.readLoggerConfig = function() {
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

