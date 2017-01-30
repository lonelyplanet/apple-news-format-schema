const util = require('util');
const assert = require('chai').assert;
const Validator = require('jsonschema').Validator;
const schema = require('../docs/schema.json');
const loadSchema = require('./helpers').loadSchema;

describe('Valid JSON Schema document', function() {
  it( schema['$schema'], done => {
    loadSchema( schema['$schema'] ).then( metaSchema => {
      const v = new Validator();
      v.addSchema(metaSchema, metaSchema.id);
      const results = v.validate( schema, metaSchema );
      assert.isTrue( results.valid, util.inspect( results.errors, { showHidden: true, depth: null } ) );
      done();
    }, done );
  });
});
