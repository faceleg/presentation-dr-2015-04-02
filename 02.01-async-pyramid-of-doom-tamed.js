var db = require('./db/callbackPromise');

var handleSet1 = function () {
  return db.set('key2', 'value2');
};

var handleSet2 = function () {
  return db.set('key3', 'value3');
};

var handleSet3 = function () {
  return db.get('key1');
};

var handleGet1 = function (value) {
  console.log('key1 - ' + value);
};

var handleError = function(err) {
  console.log('An exception was thrown in one of the above promises');
  console.log(JSON.stringify(err));
};

db.set('key1', 'value1')
    .then(handleSet1)
    .then(handleSet2)
    .then(handleSet3)
    .then(handleGet1)
    .catch(handleError);

// Example adapted from http://survivejs.com/common_problems/pyramid.html

// splitted the then closures into their own functions, since they just work with no
// parameters, to be able to create "almost" a DSL on the executable code.
