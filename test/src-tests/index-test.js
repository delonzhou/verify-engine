'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var semver = require('semver');

var verifyEngine = require('../../');

describe('verify-engine/index', function() {
  describe('#getNodeVersion', function() {
    it('should return a valid version', function() {
      var version = verifyEngine._getNodeVersion();

      assert.isNotNull(semver.valid(version));
    });
  });

  describe('#checkPackageJson', function() {
    var checkPackageJson;
    var nodeVersionStub;

    beforeEach(function() {
      checkPackageJson = verifyEngine.checkPackageJson;
      nodeVersionStub = sinon.stub();

      verifyEngine._getNodeVersion = nodeVersionStub;
    });

    it('should return error if engine not in json', function() {
      var result = checkPackageJson({});
      assert.strictEqual(result.errors.length, 1);

      assert.match(result.errors[0], /engine is not set/);
    });

    it('should return error if node version is not set', function() {
      var result = checkPackageJson({
        engine: {}
      });

      assert.strictEqual(result.errors.length, 1);

      assert.match(result.errors[0], /engine version is not/);
    });

    it('should return error if node version is not allowed', function() {
      nodeVersionStub.returns('0.10.0');
      var json = {
        engine: {
          node: '>=0.12.0'
        }
      };

      var result = checkPackageJson(json);
      assert.strictEqual(result.errors.length, 1);

      assert.match(result.errors[0], /node version is incompatible/);
    });

    it('should return error if node version is allowed', function() {
      nodeVersionStub.returns('1.0.0');
      var json = {
        engine: {
          node: '>=0.12.0'
        }
      };

      var result = checkPackageJson(json);
      assert.isTrue(result.isValid());
    });
  });
});
