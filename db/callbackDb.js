'use strict'
var _ = require('lodash');

var db = {};

var result = {
  contains: function (key) {
    return _.has(db, key);
  },

  get: function (key, callback) {
    if (!result.contains(key))
      callback({error: 'Key not found!'});
    callback(null, db[key]);
  },

  setw: function (key, value, callback) {
    db[key] = value;
    callback(null, value);
  },

  set: function (key, value, callback) {
    if (result.contains(key))
      callback({error: 'Key already exists!'});
    result.setw(key, value, callback);
  }
};
module.exports = result;