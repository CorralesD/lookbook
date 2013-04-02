var https = require('https')
    , http = require('http')
    , deferred = require('deferred')
    , global = require('./global')
    ;

var buildOptions = function(pa, pt, m) {

    var path = pa || '/'
      , port = pt || 443 
      , method = m || 'GET'
      ;

    return {
        hostname: global.API_URL,
        port: port,
        path: global.API_PATH + path,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
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
exports.makeRequest = function(path, port, method) {
    var options = buildOptions(path, port, method)
      , protocol = options.port === 443 ? https : http
      , def = deferred()
      ;
        
    console.log(options);

    protocol.get(options, function(res) {

        if (res.statusCode !== 200) {
            def.reject(new Error('Received ' + res.statusCode + ' response'));
        }
        else {
            var output = '';
            res.setEncoding('utf8');

            res.on('data', function(chunk) {
                console.log(chunk);
                output += chunk;
            });

            res.on('end', function() {
                response = JSON.parse(output);
                console.log('Output', output);
                def.resolve(output);
            });
        }

    }).on('error', function(error) {
        console.log('On Error', error);
        def.reject(error);
    });

    return def.promise;
};
