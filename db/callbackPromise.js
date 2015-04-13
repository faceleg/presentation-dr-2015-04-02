'use strict'
var _ = require('lodash');
var Promise = require('bluebird');

var db = {};

var result = {
  contains: function (key) {
    return _.has(db, key);
  },

  get: function (key) {
    return new Promise(function(resolve, reject) {
      if (!result.contains(key))
        return reject({error: 'Key not found!'});
      return resolve(db[key]);
    });

  },

  setw: function (key, value) {
    db[key] = value;
  },

  set: function (key, value) {
    return new Promise(function(resolve, reject) {
      if (result.contains(key))
        return reject({error: 'Key already exists!'});
      result.setw(key, value);
      return resolve(value);
    });

  }
};
module.exports = result;