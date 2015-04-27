var db = require('./db/promiseDb');
var _ = require('lodash');

var handleSet = _.curry(function (keyToSet, valueToSet, value) {
  return db.set(keyToSet, valueToSet);
});

var handleSetWithGet = _.curry(function(keyToGet, value) {
  return db.get(keyToGet);
});

var handleGet = _.curry(function (key, value) {
  console.log(key + value);
});

var handleError = function(err) {
  console.log('An exception was thrown in one of the above promises');
  console.log(JSON.stringify(err));
};

db.set('key1', 'value1')
    .then(handleSet('key2', 'value2'))
    .then(handleSet('key3', 'value3'))
    .then(handleSetWithGet('key1'))
    .then(handleGet('key1'))
    .catch(handleError);

// Example adapted from http://survivejs.com/common_problems/pyramid.html

// added currying to the solution, to be able to reuse simple generic functions on the then
