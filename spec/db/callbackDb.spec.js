var path = require('path');

describe('callback db', function() {
  var callbackDb = null;
  beforeEach(function() {
    // Ensure a fresh DB is loaded before each test
    delete require.cache[path.resolve(__dirname + '/../../db/callbackDb.js')];
    callbackDb = require('../../db/callbackDb');
  });

  it('should allow setting values for new keys', function(done) {
    callbackDb.set('number', 1, function(error, value) {
      expect(error).toBe(null);
      expect(value).toBe(1);
      done();
    });
  });

  it('should call the callback with a proper error object on error', function(done) {
    callbackDb.get('nothing', function(error, value) {
      expect(error).toEqual(jasmine.any(Error), 'error object should be type Error');
      done();
    });
  });

  it('should not allow setting values for existing keys', function(done) {
    callbackDb.set('number', 1, function(error, value) {
      expect(error).toBe(null);
      expect(value).toBe(1);
      callbackDb.set('number', 2, function(error, value) {
        expect(error).toEqual(jasmine.any(Error));
        done();
      });
    });
  });

  it('should call the callback with false for contains calls when nothing exists for the key', function(done) {
    callbackDb.contains('anything', function(error, value) {
      expect(error).toBe(null);
      expect(value).toBe(false);
      done();
    });
  });

  it('should call the callback with true for contains calls when something exists for the key', function(done) {
    callbackDb.set('anything', 123, function(error, value) {
      callbackDb.contains('anything', function(error, value) {
        expect(error).toBe(null);
        expect(value).toBe(true);
        done();
      });
    });
  });

  it('should call the callback with the correct value if present', function(done) {
    callbackDb.set('anything', 123, function(error, value) {
      callbackDb.get('anything', function(error, value) {
        expect(error).toBe(null);
        expect(value).toBe(123);
        done();
      });
    });
  });
});

