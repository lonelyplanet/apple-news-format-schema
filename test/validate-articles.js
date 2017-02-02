const process = require('process');
const path = require('path');
const util = require('util');
const assert = require('chai').assert;
const glob = require('glob');
const validate = require('jsonschema').validate;
const schema = require('../docs/schema.json');
const validArticles = path.join( process.cwd(), 'test', 'fixtures', 'valid', '*.json' );
const invalidArticles = path.join( process.cwd(), 'test', 'fixtures', 'invalid', '*.json' );
const validateOptions = { nestedErrors: true };
const inspectOptions = { showHidden: true, depth: null };

describe('Apple News Format schema', () => {
  describe('Valid articles', () => {
    glob.sync(validArticles).forEach( article => {
      it( path.basename(article), () => {
        const results = validate( require(article), schema, validateOptions );
        assert.isTrue( results.valid, util.inspect( results.errors, inspectOptions ) );
      });
    });
  });

  describe('Invalid articles', () => {
    glob.sync(invalidArticles).forEach( article => {
      it( path.basename(article), () => {
        const results = validate( require(article), schema, validateOptions );
        assert.isFalse( results.valid, `${path.basename(article)} is valid, but shouldn't be` );
        assert.isAtLeast( results.errors.length, 1 );
      });
    });
  });
});
