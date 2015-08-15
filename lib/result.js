'use strict';

function Result() {
  this.errors = [];
}

Result.prototype = {
  isValid: function() {
    return Boolean(!this.errors.length);
  },

  addError: function(message) {
    this.errors.push(message);

    return this;
  }
};

module.exports = Result;
