/*
 * Save the authorization code unit test suite.
 */
var
  vows = require('vows'),
  assert = require('assert');

var db = require('./../../src/app/db');
var openedDb = new db.MySQL();

/**
 * Scenario: Save authorization code
 *
 * Given table is empty
 * When we save the authorization code
 * Then we should have one row
 */
vows.describe('Save authorization code')
  .addBatch({
  'Set Up': {
    topic: function (db) {
      var dropTable = 'DROP TABLE IF EXISTS authorization_codes;';

      openedDb.connection.query(dropTable, this.callback);
    },
    'after drop table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE `authorization_codes` (' +
          '`auth_code` varchar(25) NOT NULL,' +
          '`redirect_uri` varchar(500) NOT NULL,' +
          '`client_id` int(10) unsigned NOT NULL,' +
          '`user_id` int(10) unsigned NOT NULL,' +
          'UNIQUE KEY `auth_code` (`auth_code`)' +
          ') ENGINE=InnoDB DEFAULT CHARSET=latin1;';

        openedDb.connection.query(createTableStatement, this.callback);
      },
      'should create the table': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
      }
    }
  }
})
  .addBatch({
  '\nGiven table is empty': {
    '\nWhen we save the authorization code': {
      topic: function () {
        var authorizationCodesDB =
          require('./../../src/app/models/auth/authorizationcodes');

        authorizationCodesDB.save('sbo2fs3gpHVQWjcE', 999,
          'http://localhost:5000/test/callback', 2, this.callback);
      },
      'we should have one row': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.strictEqual(result.affectedRows, 1);
      }
    }
  }
})
  .addBatch({
  'Tear down': {
    'after instantiate the db': {
      topic: function () {
        var dropTable = 'DROP TABLE IF EXISTS authorization_codes;';

        openedDb.connection.query(dropTable, this.callback);
      },
      'should drop the table': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
      }
    }
  }
})
  .export(module);