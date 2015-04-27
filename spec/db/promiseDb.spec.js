var path = require('path'),
  Promise = require('bluebird');

describe('promise db', function() {

  var promiseDb = require('../../db/promiseDb.js');
  beforeEach(function() {
    // Ensure a fresh DB is loaded before each test
    delete require.cache[path.resolve(__dirname + '/../../db/promiseDb.js')];
    promiseDb = require('../../db/promiseDb.js');
  });

  it('should return a promise for all methods', function() {
    expect(promiseDb.contains('anything')).toEqual(jasmine.any(Promise));
    expect(promiseDb.set('anything', 1)).toEqual(jasmine.any(Promise));
    var get = promiseDb.get('anything');
    expect(get).toEqual(jasmine.any(Promise));
    get.catch(function(error) {});
  });

  it('should reject set calls with proper error objects', function(done) {
    promiseDb.set('anything', 1).then(function() {
      promiseDb.set('anything', 1).catch(function(error) {
        expect(error).toEqual(jasmine.any(Error));
        done();
      });
    });
  });

  it('should reject get calls for missing keys with proper error objects', function(done) {
    promiseDb.get('anything').catch(function(error) {
      expect(error).toEqual(jasmine.any(Error));
      done();
    });
  });

  it('should resolve with the correct value for get calls', function(done) {
    promiseDb.set('anything', 1).then(function() {
      promiseDb.get('anything').then(function(value) {
        expect(value).toBe(1);
        done();
      });
    });
  })
});

