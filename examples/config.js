/**
 * @author: darryl.west@raincitysoftware.com
 * @created: 8/19/14
 */

module.exports.readMessageHubConfig = function() {
    'use strict';

    var config = {};

    config.port = 29169;
    config.hubName = '/MessageHub';
    config.channels = [ 'user', 'bugs', 'blog', 'chat' ];

    // other security configurations...

    // create a rolling file logger...
    config.readLoggerConfig = function() {
        var opts = {
            logDirectory: './',
            fileNamePattern:[ 'messages-', config.port, '-<DATE>.log' ].join(''),
            dateFormat:'YYYY.MM.DD',
            level:'info'
        };

        return opts;
    };

    return config;
};

