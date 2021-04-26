var fs = require('fs'),
    path = require('path'),
    config = require(path.join(__dirname, '../../config.json'));

var reader = function() {};

reader.prototype.getConfig = function() {
  return config;
};

module.exports = new reader();
