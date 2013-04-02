var utils = require('./utils')
    , global = require('./global')
    , deferred = require('deferred')
    ;

/*
 * looks
 * Get a list of looks
 */
exports.looks = function(page, onSuccess, onFail) {
    var request = utils.makeRequest('/' + (page ? page.toString() : ''));
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};

/*
 * topLooks
 * Get a list of the current top looks
 */
exports.topLooks = function(page, onSuccess, onFail) {
    var request = utils.makeRequest('/top' + (page ? ('/' + page.toString()) : ''));
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};

/*
 * user
 * Retrieve information on a user
 */
exports.user = function(userID, onSuccess, onFail) {
    var request = utils.makeRequest('/user/' + userID.toString());
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};

/*
 * look
 * Retrieve a specific look by it's ID
 */
exports.look = function(lookID, onSuccess, onFail) {
    var request = utils.makeRequest('/look/' + lookID.toString());
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};

