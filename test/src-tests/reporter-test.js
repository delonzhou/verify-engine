'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var Result = require('../../lib/result');
var reporter = require('../../lib/reporter');

describe('verify-engine/result', function() {
  var consoleLogStub;
  var result;

  beforeEach(function() {
    consoleLogStub = sinon.stub(console, 'log');

    result = new Result();
  });

  afterEach(function() {
    consoleLogStub.restore();
  });

  describe('#output', function() {
    it('should not print if no errors', function() {
      reporter.output(result);

      sinon.assert.notCalled(consoleLogStub);
    });

    it('should be called once with one error', function() {
      result.addError('error1');

      reporter.output(result);

      sinon.assert.calledOnce(consoleLogStub);
      sinon.assert.calledWith(consoleLogStub, sinon.match(/error1/));
    });

    it('should be called twice with two errors', function() {
      result.addError('error1').addError('error2');

      reporter.output(result);

      sinon.assert.calledTwice(consoleLogStub);

      var firstError = consoleLogStub.firstCall.args[0];
      var secondError = consoleLogStub.secondCall.args[0];

      assert.match(firstError, /error1/);
      assert.match(secondError, /error2/);
    });
  });
});
