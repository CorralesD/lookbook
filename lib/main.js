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
 exports.leader = function(time, onSuccess, onFail) {
    var tParam = getTimeParam(time);
    var request = utils.makeRequest('/leader/' + tParam, undefined, undefined, { 'Content-Type': 'text/html' });
    request.then(function(html) {

        var userIDs = [];
        var re = /http:\/\/lookbook.nu\/user\/([0-9]+)/g;
        var match = re.exec(html);
        while (match !== null) {
            userIDs.push(match[1]);
            match = re.exec(html);
        }

        console.log(userIDs);
    });

    return request;
 };
