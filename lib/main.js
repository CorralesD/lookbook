var utils = require('./utils')
    , global = require('./global')
    , deferred = require('deferred')
    ;

var simpleRequest = function(page, path, onSuccess, onFail) {
    var request = utils.makeRequest(path + (page ? ('/' + page.toString()) : ''));
    utils.handleCallbacks(request, onSuccess, onFail);
    return request;
};

/*
 * looks
 * Get a list of looks
 */
exports.looks = function(page, onSuccess, onFail) {
    return simpleRequest(page, '', onSuccess, onFail);
};

/*
 * topLooks
 * Get a list of the current top looks
 */
exports.topLooks = function(page, onSuccess, onFail) {
    return simpleRequest(page, '/top', onSuccess, onFail);
};

/*
 * newLooks
 * Get a list of new looks
 */
exports.newLooks = function(page, onSuccess, onFail) {
    return simpleRequest(page, '/new', onSuccess, onFail);
};

/*
 * user
 * Retrieve information on a user
 * userID can either be the integer ID for the user or the user's username
 */
exports.user = function(userID, onSuccess, onFail) {
    var path = (typeof userID === 'number') ? '/user/' + userID.toString() : '/' + userID;
    var request = utils.makeRequest(path);
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

var getTimeParam = function(time) {
   var tParam = '';

    switch(time) {
        case 'week':
            tParam = 'this-week';
            break;
        case 'month':
            tParam = 'this-month';
            break;
        case 'year':
            tParam = 'this-year';
            break;
        case 'all':
            tParam = 'all-time';
            break;
        default:
            break;
    }

    return tParam;
};
// exposing for testing
exports.getTimeParam = getTimeParam;

/*
 * leader
 * Retrieve the leader boards
 * The options for time include today, week, month, year and all.
 * Defaults to today.
 * This function needs to be handled differently because lookbook does not
 * provide JSON in this case but HTML.  We're parsing the HTML for a list of userIDs
 * that are on the leader boards.
 */
exports.leaders = function(time, count, onSuccess, onFail) {
    var tParam = getTimeParam(time)
      , request = utils.makeRequest('/leader/' + tParam, undefined, undefined, { 'Content-Type': 'text/html' })
      , def = deferred()
      ;

    utils.handleCallbacks(def.promise, onSuccess, onFail);

    request.then(function(html) {

        var userIDs = []
          , re = /http:\/\/api.lookbook.nu\/user\/([0-9]+)/g
          , match = re.exec(html)
          ;

        while (match !== null) {
            userIDs.push(match[1]);
            match = re.exec(html);
        }

        def.resolve(count !== undefined ? userIDs.slice(0, count) : userIDs);

    }, function(error) {
        def.reject(error);
    });

    return def.promise;
};
