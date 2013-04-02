var lookbook = require('../lib/main'),
    assert = require('assert');

describe('looks', function() {

    it('looks with callback', function(done) {

        lookbook.looks(undefined, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

    it('looks with promise', function(done) {

        lookbook.looks().then(function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });
    
     it('looks with pagination', function(done) {

        lookbook.looks(2, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

});

describe('topLooks', function() {

    it('topLooks with callback', function(done) {

        lookbook.topLooks(undefined, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

    it('topLooks with promise', function(done) {

        lookbook.topLooks().then(function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });
    
     it('topLooks with pagination', function(done) {

        lookbook.topLooks(2, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

});

describe('user', function() {

    it('user with callback', function(done) {

        lookbook.user(789388, function(user) {
            assert.ok(user && user.user.username === 'jennifergrace');
            done();
        });

    });

    it('user with promise', function(done) {

        lookbook.user(789388).then(function(user) {
            assert.ok(user && user.user.username === 'jennifergrace');
            done();
        });

    });

    it('invalid user with callback', function(done) {

        lookbook.user(5555555555555555555, undefined, function(error) {
            assert(error !== undefined);
            done();
        });

    });

    it('invalid user with promise', function(done) {

        lookbook.user(5555555555555555555).then(undefined, function(error) {
            assert(error !== undefined);
            done();
        });

    });

});

describe('look', function() {

    it('look with callback', function(done) {

        lookbook.look(4736547, function(look) {
            assert.ok(look && look.look.title === 'NINJA STYLE');
            done();
        });

    });

    it('look with promise', function(done) {

        lookbook.look(4736547).then(function(look) {
            assert.ok(look && look.look.title === 'NINJA STYLE');
            done();
        });

    });

    // In both of these cases lookbook returns a status code of 200
    // but a 500 page, so we actually get HTML back and fail at parsing it
    it('invalid look with callback', function(done) {

        lookbook.look(555555555555, undefined, function(error) {
            assert(error !== undefined);
            done();
        });

    });

    it('invalid look with promise', function(done) {

        lookbook.look(555555555555).then(undefined, function(error) {
            assert(error !== undefined);
            done();
        });

    });

});
