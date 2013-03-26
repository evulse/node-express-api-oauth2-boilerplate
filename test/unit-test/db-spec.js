/**
 * Database connection unit test suite.
 */

var
  vows = require('vows'),
  assert = require('assert');

var db = require('./../../src/app/db/index').MySQL;

vows.describe('Scenario: Require the module')
  .addBatch({
  '\nGiven module loaded': {
    topic: db,
    'should contained a pool': function (topic) {
      assert.include(topic, 'pool');
    }
  }
});

vows.describe('Scenario: Get database connection')
  .addBatch({
  '\nGiven the object is instantiate': {
    topic: function () {
      db.pool.getConnection(this.callback);
    },
    'should return the connection': function (err, connection) {
      assert.isNull(err);
      assert.isNotNull(connection)
      assert.isTrue(connection._connectCalled);
    }
  }
})
  .export(module);