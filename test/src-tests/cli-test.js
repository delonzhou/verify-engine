'use strict';

var childProcess = require('child_process');
var path = require('path');
var assert = require('chai').assert;

describe('module/cli', function() {
  var cliPath = path.resolve(__dirname, '../../bin/cli.js');
  var fixturesRoot = path.resolve(__dirname, '../js/fixtures');

  it('should have an exit code of 1 and print error on invalid package', function(done) {
    var packageRoot = path.join(fixturesRoot, 'invalid-engine');

    var child = childProcess.spawn(process.execPath, [cliPath], {
      cwd: packageRoot
    });

    child.on('exit', function(code) {
      var output = child.stdout.read().toString();
      assert.include(output, 'node version is incompatible with engine set in package.json.');
      assert.strictEqual(1, code);
      done();
    });
  });

  it('should have an exit code of 0 and be silent on valid package', function(done) {
    var packageRoot = path.join(fixturesRoot, 'valid-engine');

    var child = childProcess.spawn(process.execPath, [cliPath], {
      cwd: packageRoot
    });

    child.on('exit', function(code) {
      var output = child.stdout.read();
      assert.isNull(output);
      assert.strictEqual(0, code);
      done();
    });
  });
});
