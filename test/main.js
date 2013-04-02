var lookbook = require('../lib/main'),
    assert = require('assert');

describe('getLooks', function() {

    it('getLooks with callback', function(done) {

        lookbook.getLooks(undefined, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

    it('getLooks with promise', function(done) {

        lookbook.getLooks().then(function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });
    
     it('getLooks with pagination', function(done) {

        lookbook.getLooks(2, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });


});
