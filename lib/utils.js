var https = require('https')
    , http = require('http')
    , deferred = require('deferred')
    , global = require('./global')
    ;

var buildOptions = function(pa, pt, m, h) {

    var path = pa || '/'
      , port = pt || 80 
      , method = m || 'GET'
      , headers = h || { 'Content-Type': 'application/json' }
      ;

    return {
        hostname: global.API_URL,
        port: port,
        path: global.API_PATH + path,
        method: method,
        headers: headers
    };
};
/*
 *
 * var options = {
 *  hostname: 'www.google.com',
 *  port: 80,
 *  path: '/upload',
 *  method: 'GET'
 *  headers: {
 *      'Content-Type': 'application/json'
 *  }
 * };
 */
exports.makeRequest = function(path, port, method, headers) {
    var options = buildOptions(path, port, method, headers)
      , protocol = options.port === 443 ? https : http
      , def = deferred()
      ;

    console.log('Making ' + options.method + ' request to ' + options.hostname + options.path);
        
    protocol.get(options, function(res) {

        if (res.statusCode !== 200) {
            def.reject(new Error('Received ' + res.statusCode + ' response'));
        }
        else {
            var output = '';
            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                output += chunk;
            });

            res.on('end', function() {
                // Determine which type of content we're getting back
                var contentType = options.headers['Content-Type'];

                // If we're retrieving JSON then parse the JSON string
                if (contentType === 'application/json') {
                    var response;

                    try {
                        response = JSON.parse(output);
                    }
                    catch(error) {
                        def.reject(error);
                    };

                    if (response) def.resolve(response);
                }
                // If we're retrieving HTML then just return the HTML string
                else if (contentType === 'text/html') {
                    def.resolve(output);
                }
                // We don't know what we're getting so throw an error
                else {
                    def.reject(new Error('No Content Type found'));
                }
            });
        }

    }).on('error', function(error) {
        console.log('On Error', error);
        def.reject(error);
    });

    return def.promise;
};

exports.handleCallbacks = function(def, onSuccess, onFail) {
    def.then(function(parameters) {
        if (typeof onSuccess === 'function') onSuccess(parameters);
    }, function(error) {
        if (typeof onFail === 'function') onFail(error);
    });
};
