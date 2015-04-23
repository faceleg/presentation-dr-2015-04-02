var path = require('path'),
  Promise = require('bluebird');
describe('promise db', function() {

  var promiseDb = require('../../db/promiseDb.js');
  beforeEach(function() {
    // Ensure a fresh DB is loaded before each test
    delete require.cache[path.resolve(__dirname + '/../../db/promseDb.js')];
    promiseDb = require('../../db/promiseDb.js');
  });

  it('should return a promise for all methods', function() {
    expect(promiseDb.contains('anything')).toEqual(jasmine.any(Promise));
  });
});
