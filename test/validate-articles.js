const path = require('path');
const util = require('util');
const { assert } = require('chai');
const glob = require('glob');
const Ajv = require('ajv');
const schema = require('../docs/schema.json');
const { loadSchema } = require('./helpers');
const validArticles = path.join( __dirname, 'fixtures', 'valid', '*.json' );
const invalidArticles = path.join( __dirname, 'fixtures', 'invalid', '*.json' );
const inspectOptions = { showHidden: true, depth: null };

describe('Apple News Format schema', () => {
  let validate = null;

  before( done => {
    const ajv = new Ajv({
      loadSchema,
      extendRefs: 'fail',
    });

    ajv.addMetaSchema( require('ajv/lib/refs/json-schema-draft-06.json') );

    ajv.compileAsync(schema).then( func => {
      validate = func;
      done();
    }).catch(
      console.error.bind(console)
    );
  });

  describe('Valid articles', () => {
    glob.sync(validArticles).forEach( article => {
      it( path.basename(article), () => {
        const valid = validate( require(article) );

        assert.isTrue( valid, util.inspect( validate.errors, inspectOptions ) );
      });
    });
  });

  describe('Invalid articles', () => {
    glob.sync(invalidArticles).forEach( article => {
      it( path.basename(article), () => {
        const valid = validate( require(article) );

        assert.isFalse( valid, `${path.basename(article)} is valid, but shouldn't be` );
        assert.isAtLeast( validate.errors.length, 1 );
      });
    });
  });
});
