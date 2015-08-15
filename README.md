# verify-engine

[![Build Status](https://travis-ci.org/wealthfront/verify-engine.svg)](https://travis-ci.org/wealthfront/verify-engine)
[![devDependency Status](https://david-dm.org/wealthfront/verify-engine.svg)](https://david-dm.org/wealthfront/verify-engine#info=devDependencies)
[![devDependency Status](https://david-dm.org/wealthfront/verify-engine/dev-status.svg)](https://david-dm.org/wealthfront/verify-engine#info=devDependencies)

Verify-engine is a command line utility to ensure that your package is used only on supported engines.

NPM verifies packages' engine requirements when they are installed. However, NPM doesn't verify this for top level packages.

## Installation

```sh
$ npm install verify-engine --save-dev
```

## Usage

Specify your engine requirements in package.json
```
"engine": {
  "node": ">=1.0.0"
}
```

```
$ verify-engine
node version is incompatible with engine set in package.json. Found 0.12.4, expected >=1.0.0
```
