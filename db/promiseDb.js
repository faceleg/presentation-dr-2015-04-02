'use strict';
var _ = require('lodash');
var Promise = require('bluebird');

var dataStore = {};

var result = {
  contains: function(key) {
    return new Promise(function(resolve) {
      resolve(_.has(dataStore, key));
    });
  },

  get: function(key) {
    return new Promise(function(resolve, reject) {
      result.contains(key).then(function(value) {
        if (value) {
          resolve(dataStore[key]);
        } else {
          reject(new Error('Key not found'));
        }
      });
    });
  },

  set: function(key, value) {
    return new Promise(function(resolve, reject) {
      result.contains(key).then(function(containsValue) {
        if (containsValue) {
          reject(new Error('Key already exists'));
        } else {
          dataStore[key] = value;
          resolve(value);
        }
      });
    });
  }
};

module.exports = result;

