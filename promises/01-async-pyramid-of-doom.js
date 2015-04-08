var db = require('./db/callbackDb');

try {

  db.set('key1', 'value1', function (err) {
    if (err) throw err;  // Replicated for each callback

    db.set('key2', 'value2', function (err) {
      if (err) throw err;  // Replicated for each callback

      db.set('key3', 'value3', function (err) {
        if (err) throw err;  // Replicated for each callback

        db.get('key1', function (err, value) {
          if (err) throw err;

          console.log('key1 - ' + value);
        });
      });
    });
  });
} catch (err) {
  console.log(JSON.stringify(err));
}

// Example adapted from http://survivejs.com/common_problems/pyramid.html
