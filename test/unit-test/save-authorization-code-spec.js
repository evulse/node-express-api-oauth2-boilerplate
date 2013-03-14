/*
 * Save the authorization code unit test suite.
 */
var
  vows = require('vows'),
  assert = require('assert');

/**
 * Scenario: Save authorization code
 *
 * Given table is empty
 * When we save the authorization code
 * Then we should have one row
 */
vows.describe('Save authorization code')
  .addBatch({
  "\nGiven table is empty": {
    "\nWhen we save the authorization code": {
      topic: function () {
        var authorizationCodesDB =
          require('./../../src/app/db/authorizationcodes');

        authorizationCodesDB.save('sbo2fs3gpHVQWjcE', 999,
          'http://localhost:5000/test/callback', 2, this.callback);
      },
      "we should have one row": function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.strictEqual(result.affectedRows, 1);
      }
    }
  }
})
  .export(module);