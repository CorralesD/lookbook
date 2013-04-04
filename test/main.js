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

describe('newLooks', function() {

    it('newLooks with callback', function(done) {

        lookbook.newLooks(undefined, function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });

    it('newLooks with promise', function(done) {

        lookbook.newLooks().then(function(looks) {
            assert.ok(looks && looks['looks'].length > 0);
            done();
        });

    });
    
     it('newLooks with pagination', function(done) {

        lookbook.newLooks(2, function(looks) {
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
        lookbook.user(555555555555, undefined, function(error) {
            assert(error !== undefined);
            done();
        });
    });

    it('invalid user with promise', function(done) {
        lookbook.user(555555555555).then(undefined, function(error) {
            assert(error !== undefined);
            done();
        });
    });

    it('user with username and promise', function(done) {
        lookbook.user('marianodivaio').then(function(user) {
            assert.ok(user && user.user.username === 'marianodivaio');
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

describe('leader', function() {

    it('today', function() {
        assert.equal(lookbook.getTimeParam(), '');
    });
    it('week', function() {
        assert.equal(lookbook.getTimeParam('week'), 'this-week');
    });
    it('month', function() {
        assert.equal(lookbook.getTimeParam('month'), 'this-month');
    });
    it('year', function() {
        assert.equal(lookbook.getTimeParam('year'), 'this-year');
    });
    it('all', function() {
        assert.equal(lookbook.getTimeParam('all'), 'all-time');
    });
    
    it('find top 10 today leaders with promise', function(done) {
        lookbook.leaders('today', 10).then(function(users) {
            assert.ok(users && users.length === 10);
            done();
        });
    });

    it('find week leaders with promise', function(done) {
        lookbook.leaders('week').then(function(users) {
            assert.ok(users && users.length === 50);
            done();
        });
    });
    
    it('find top 5 month leaders with callback', function(done) {
        lookbook.leaders('month', 5, function(users) {
            assert.ok(users && users.length === 5);
            done();
        });
    });

    it('find year leaders with callback', function(done) {
        lookbook.leaders('year', undefined, function(users) {
            assert.ok(users && users.length === 50);
            done();
        });
    });

    it('find top 25 all time leaders with callback', function(done) {
        lookbook.leaders('all', 25, function(users) {
            assert.ok(users && users.length === 25);
            done();
        });
    });

});
