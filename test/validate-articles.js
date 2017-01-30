const process = require('process');
const path = require('path');
const util = require('util');
const assert = require('chai').assert;
const glob = require('glob');
const validate = require('jsonschema').validate;
const schema = require('../docs/schema.json');
const articles = path.join( process.cwd(), 'test', 'fixtures', '**', '*.json' );
const validateOptions = { nestedErrors: false };

describe('Apple News Format schema', function() {
  describe('validate article', () => {
    glob.sync(articles).forEach( article => {
      it( path.basename(article), () => {
        let results = validate( require(article), schema, validateOptions );

        if ( results.errors.length ) {
          console.log( util.inspect( results.errors, { showHidden: true, depth: null } ) );
        }

        assert.isTrue( results.valid );
        assert.equal( 0, results.errors.length );
      });
    });
  });
});
