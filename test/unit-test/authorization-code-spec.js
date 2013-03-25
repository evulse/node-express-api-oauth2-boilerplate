/*
 * Authorization code unit test suite.
 */
var
  vows = require('vows'),
  assert = require('assert');

var MySQL = require('./../../src/app/db/index').MySQL;
var db = new MySQL();
var authCodeModel = require('./../../src/app/models/auth/authorizationcodes');

/**
 * Test suite macros
 * @param {String} name table name
 */
function dropTable (name) {
  var dropTable = 'DROP TABLE IF EXISTS `' + name + '`;';

  db.connection.query(dropTable, this.callback);
}

/**
 * Scenario: Save authorization code
 *
 * Given table is empty
 * When we save the authorization code
 * Then we should have one row
 */
vows.describe('Scenario: Save authorization code')
  .addBatch({
  'Set Up': {
    topic: function () {
      var dropTable = 'DROP TABLE IF EXISTS `authorization_request`;';

      db.connection.query(dropTable, this.callback);
    },
    'after drop table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE IF NOT EXISTS ' +
          '`authorization_request` (' +
          '`auth_code` varchar(25) NOT NULL,' +
          '`redirect_uri` varchar(250) NOT NULL,' +
          '`client_id` varchar(36) NOT NULL,' +
          '`user_id` varchar(36) NOT NULL,' +
          'PRIMARY KEY (`auth_code`),' +
          'KEY `client_id` (`client_id`),' +
          'KEY `user_id` (`user_id`)' +
          ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

        db.connection.query(createTableStatement, this.callback);
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
        authCodeModel.save('sbo2fs3gpHVQWjcE',
          'c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
          'http://localhost:5000/test/callback',
          'a2bf9b0f-198f-4df5-a396-590a007785bd', this.callback);
      },
      'we should have one row': function (err, result) {
        assert.isNull(err);
        assert.isTrue(result);
      }
    }
  }
})
  .export(module);

/**
 * Scenario: Find authorization code
 *
 * Given authorization code is saved
 * When we find the authorization code
 * Then the authorization code should be saved
 */
vows.describe('Scenario: Find authorization code')
  .addBatch({
  '\nGiven authorization code is saved': {
    '\nWhen we find the authorization code': {
      topic: function () {
        authCodeModel.find('sbo2fs3gpHVQWjcE', this.callback);
      },
      'the authorization code should be saved': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.include(result, 'authCode');
      }
    }
  }
})
  .addBatch({
  'Tear down': {
    topic: function () {
      var dropTable = 'DROP TABLE IF EXISTS `authorization_request`;';

      db.connection.query(dropTable, this.callback);
    },
    'should drop the table': function (err, result) {
      assert.isNull(err);
      assert.isNotNull(result);
    }
  }
})
  .export(module);