var utils = require('./utils')
    , global = require('./global')
    , deferred = require('deferred')
    ;

/*
 * getLooks
 * Get a list of looks
 */
exports.getLooks = function(page, onSuccess, onFail) {
    var request = utils.makeRequest('/' + (page ? page.toString() : ''));
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};
