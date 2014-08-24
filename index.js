// message commons exposes methods to create the message hub, create producer and subscriber

module.exports = require('./lib/MessageHub');

module.exports = {
    mocks: {
        MockMessageClient:require('./test/mocks/MockMessageClient')
    }
};

