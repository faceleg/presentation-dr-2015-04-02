'use strict';
var _ = require('lodash');

var dataStore = {};
var result = {

  contains: function(key, callback) {
    callback(null, _.has(dataStore, key));
  },

  get: function(key, callback) {
    result.contains(key, function(error, keyPresent) {
      if (!keyPresent) {
        return callback(new Error('Key already exists!'));
      }
      callback(null, dataStore[key]);
    });
  },

  setw: function(key, value, callback) {
    dataStore[key] = value;
    callback(null, value);
  },

  set: function(key, value, callback) {
    result.contains(key, function(error, keyPresent) {
      if (keyPresent) {
        return callback(new Error('Key already exists!'));
      }
      result.setw(key, value, callback);
    });
  }
};

module.exports = result;

