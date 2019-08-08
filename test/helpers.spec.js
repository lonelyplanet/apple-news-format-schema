const { assert } = require('chai');
const { md5 } = require('./helpers');

describe('Helpers', () => {
  describe('md5', () => {
    it('returns a hash', () => {
      const knownHash = '351325a660b25474456af5c9a5606c4e';
      const lpHash = md5('lp');

      assert.isTrue( knownHash === lpHash );
    });
  });
});
