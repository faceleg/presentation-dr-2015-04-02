var db = require('./db/callbackPromise');

try {
  await db.set('key1', 'value1');
  await db.set('key2', 'value2');
  await db.set('key3', 'value3');
  const value = await db.get('key1');
  console.log('key1 - ' + value);
} catch (error) {
  console.log('An exception was thrown in one of the above async functions');
  console.log(JSON.stringify(err));
};

// Example adapted from http://survivejs.com/common_problems/pyramid.html

// Can easily re-order execution as required or on a client's whim
// Error handling does not require copy-paste
// Very little indententation - in JS generally, indentation = bad 
//  "If you need more than 3 levels of indentation, you're screwed 
//  anyway, and should fix your program." -- Linus
