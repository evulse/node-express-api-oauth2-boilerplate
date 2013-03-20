/**
 * Database connection unit test suite.
 */

var
  vows = require('vows'),
  assert = require('assert');

var db = require('./../../src/app/db');

vows.describe('Scenario: Create object instance')
  .addBatch({
  '\Given the object is instantiate': {
    topic: function () {
      return new db.MySQL();
    },
    'the should be instantiated': function (topic) {
      assert.isNotNull(topic);
    }
  }
})
  .export(module);

vows.describe('Scenario: Connect to database')
  .addBatch({
  '\nGiven the object is instantiate': {
    topic: function () {
      return new db.MySQL();
    },
    'should return the connection': function (err, connection) {
      assert.isNull(err);
      assert.isTrue(connection.connection._connectCalled);
    }
  }
})
  .export(module);

vows.describe('Scenario: Close connection')
  .addBatch({
  '\nGiven the db connection is active': {
    topic: function () {
      return new db.MySQL();
    },
    'after the object is instantiated': {
      topic: function (db) {
        db.end(this.callback);
      },
      'should end the connection': function (err, result) {
        assert.isNull(err);
        assert.isTrue(result);
      }
    }
  }
})
  .export(module);