'use strict';
var _ = require('lodash');
var Promise = require('bluebird');

var dataStore = {};

var result = {
  contains: function (key) {
    return new Promise(function(resolve) {
      resolve(_.has(dataStore, key));
    });
  },

  get: function (key) {
    return new Promise(function(resolve, reject) {
      if (!result.contains(key))
        return reject({error: 'Key not found!'});
      return resolve(dataStore[key]);
    });

  },

  setw: function (key, value) {
    dataStore[key] = value;
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
