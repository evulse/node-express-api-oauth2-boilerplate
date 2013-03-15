/**
 * Database connection unit test suite.
 */

var
  vows = require('vows'),
  assert = require('assert');

vows.describe('Scenario: Create object instance')
  .addBatch({
  '\Given the object is instantiate': {
    topic: function () {
      var DB = require('./../../src/app/models/db').DB;
      db = new DB();
      return db;
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
      var DB = require('./../../src/app/models/db').DB;
      db = new DB();
      return db;
    },
    'after the object is instantiated': {
      topic: function (db) {
        db.connect(this.callback);
      },
      'should return the connection': function (err, connection) {
        assert.isNull(err);
        assert.isTrue(connection._connectCalled);
      }
    }
  }
})
  .export(module);

vows.describe('Scenario: Close connection')
  .addBatch({
  '\nGiven the db connection is active': {
    topic: function () {
      process.env.NODE_ENV = 'development';

      var DB = require('./../../src/app/models/db').DB;
      db = new DB();
      return db;
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