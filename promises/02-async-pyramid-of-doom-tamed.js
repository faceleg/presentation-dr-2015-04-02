var db = require('./db/promisesDb');

db.set('key1', 'value1').then(function(key) {
    return db.set('key2', 'value2');
}).then(function() {
    return db.set('key3', 'value3');
}).then(function() {
    return db.get('key1');
}).then(function(value) {
    var str += value + ' - ';
    console.log(str);
}).catch(SomeDBException, function(err) {
    console.log('There was a SomeDBException');
}).error(function(erro) {
    console.log('There was a standard error');
});

// Example from http://survivejs.com/common_problems/pyramid.html
