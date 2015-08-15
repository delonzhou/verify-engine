'use strict';

var chalk = require('chalk');

var Reporter = {
  output: function(result) {
    var error = chalk.red;

    if (!result.isValid()) {
      result.errors.forEach(function(errorMessage) {
        console.log(error(errorMessage)); // eslint-disable-line no-console
      });
    }
  }
};

module.exports = Reporter;
