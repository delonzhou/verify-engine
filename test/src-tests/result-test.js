'use strict';

var assert = require('chai').assert;
var Result = require('../../lib/result');

describe('verify-engine/result', function() {
  var result;

  beforeEach(function() {
    result = new Result();
  });

  describe('#addError', function() {
    it('should add an error to errors', function() {
      assert.strictEqual(result.errors.length, 0);
      result.addError('my error');
      assert.strictEqual(result.errors.length, 1);
      assert.strictEqual(result.errors[0], 'my error');
    });

    it('should allow adding two errors', function() {
      assert.strictEqual(result.errors.length, 0);
      result.addError('my error 1');
      result.addError('my error 2');
      assert.strictEqual(result.errors.length, 2);
      assert.strictEqual(result.errors[0], 'my error 1');
      assert.strictEqual(result.errors[1], 'my error 2');
    });

    it('should return itself', function() {
      assert.strictEqual(result.addError('foo'), result);
    });
  });

  describe('#isValid', function() {
    it('should start valid', function() {
      assert.isTrue(result.isValid());
    });

    it('should be invalid after adding an error', function() {
      result.addError('foo');
      assert.isFalse(result.isValid());
    });
  });
});
