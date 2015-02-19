// message commons exposes methods to create the message hub, create producer and subscriber

module.exports = require('./lib/MessageHub');

module.exports.services = {
    MessageService:require('./lib/services/MessageService'),
    MessageSocketService:require('./lib/services/MessageSocketService')
};

module.exports.browser = {
    AbstractMessageClient:require('./browser/AbstractMessageClient')
};

module.exports.mocks = {
    MockMessageClient:require('./test/mocks/MockMessageClient')
};

