'use strict';

var semver = require('semver');
var Result = require('./result');

function getNodeVersion() {
  return process.version;
}

var VerifyEngine = {
  checkPackageJson: function(json) {
    var result = new Result();

    if (!json.engine) {
      return result.addError('engine is not set in the package.json');
    }

    if (!json.engine.node) {
      return result.addError('node engine version is not specified in the package.json');
    }

    var currentNodeVersion = getNodeVersion();
    var requiredNodeVersion = json.engine.node;

    if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
      var message = 'node version is incompatible with engine set in package.json. Found ' +
      semver.valid(currentNodeVersion) + ', expected ' + requiredNodeVersion;

      return result.addError(message);
    }

    return result;
  }
};

module.exports = VerifyEngine;

if (process.env.NODE_ENV === 'test') {
  Object.defineProperty(VerifyEngine, '_getNodeVersion', {
    get: function() {
      return getNodeVersion;
    },

    set: function(newFunc) {
      getNodeVersion = newFunc; // eslint-disable-line no-func-assign
    }
  });
}
