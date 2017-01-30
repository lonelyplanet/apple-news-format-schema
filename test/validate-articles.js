const process = require('process');
const path = require('path');
const util = require('util');
const assert = require('chai').assert;
const glob = require('glob');
const validate = require('jsonschema').validate;
const schema = require('../docs/schema.json');
const articles = path.join( process.cwd(), 'test', 'fixtures', '**', '*.json' );
const validateOptions = { nestedErrors: true };
const inspectOptions = { showHidden: true, depth: null };

describe('Apple News Format schema', function() {
  describe('validate article', () => {
    glob.sync(articles).forEach( article => {
      it( path.basename(article), () => {
        const results = validate( require(article), schema, validateOptions );
        assert.isTrue( results.valid, util.inspect( results.errors, inspectOptions ) );
      });
    });
  });
});
