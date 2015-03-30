var db = require('./db/callbackDb');

db.set('key1', 'value1', function(err) {
    if(err) throw err;

    db.set('key2', 'value2', function(err) {
        if(err) throw err;

        db.set('key3', 'value3', function(err) {
            if(err) throw err;

            var str = '';
            db.get('key1', function(err, value) {
                if(err) throw err;

                str += value + ' - ';

                console.log(str);
            });
        });
    });
});

// Example from 
