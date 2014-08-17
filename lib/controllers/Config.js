/**
 * @class Config
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-08-17
 */
var VERSION = '00.90.05'; // TODO pull from package.json

var Config = function(options) {
    'use strict';

    var config = this;

    this.version = VERSION;

    // TODO read from external config.json

    this.environment = options.env;
    this.messageHub = '/RainCityMessageHub';
    this.port = 29169;
};

Config.development = function() {
    'use strict';

    var opts = {};
    opts.env = 'development';

    var config = new Config( opts );

    return config;
};

Config.test = function() {
    'use strict';

    var opts = {};
    opts.env = 'test';

    return new Config( opts );
};

Config.production = function() {
    'use strict';

    var opts = {};
    opts.env = 'production';

    return new Config( opts );
};

module.exports = Config;
