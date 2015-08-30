#!/usr/bin/env node

'use strict';

var findup = require('findup-sync');
var verifyEngine = require('../');
var reporter = require('../lib/reporter');

var packageJsonPath = findup('package.json', {
  cwd: process.cwd()
});

if (packageJsonPath) {
  var pkgJson = require(packageJsonPath);

  var result = verifyEngine.checkPackageJson(pkgJson);

  if (!result.isValid()) {
    reporter.output(result);
    process.exit(1);
  }
}
