/**
 * Access token test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var MySQL = require('./../../src/app/db/index').MySQL;
var db = new MySQL();
var accessTokenModel = require('./../../src/app/models/auth/accesstokens');

/**
 * Scenario: Save access token
 *
 * Given access_token table is empty
 * When we save the access token
 * Then we should have one row saved
 */
vows.describe('Scenario: Save access token')
  .addBatch({
  'Set Up': {
    topic: function () {
      var dropTable = 'DROP TABLE IF EXISTS `access_token`;';

      db.connection.query(dropTable, this.callback);
    },
    'after drop table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE IF NOT EXISTS `access_token` (' +
          '`client_id` varchar(36) NOT NULL,' +
          '`user_id` varchar(36) NOT NULL,' +
          '`token` varchar(256) NOT NULL,' +
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
  'Given access_token table is empty': {
    'When we save the access token': {
      topic: function () {
        accessTokenModel.save('0fpDaM01fd6LXl1uXiLHZYIpC3BLNJe9PoVadrB2Pt5HX8LHJUKSPGA1iE0zEcWR6r8Xs3wsSIn5U9wD8DIrZ2iqUYVzyyyg5OvO5B6oFDMJfIUCM2E0H2n4E5sC207ytKzYZ8yElVWNas5boNtu02hSL3kqDeoFDGWzZSUSmMfYlXa29uFeUyAtUY0aDHWgAMIWSnW10X7hxHlFYup9GhjTgAT8iRwXU8EaHYFqGtMG05Zu21OfEKRyF1X3zpw1',
          '912ac711-8b2e-44c6-a088-cb8cf5ab4916',
          'c67f0160-7aad-4aa5-8a88-92bbd6f02a4c', this.callback);
      },
      'we should have one row saved': function (err, result) {
        assert.isNull(err);
        assert.isTrue(result);
      }
    }
  }
})
  .export(module);

/**
 * Scenario: Find the access_token
 *
 * Given acess_token is saved
 * When find the access_token
 * Then should return the requested access_token record
 */
vows.describe('Scenario: Find the access_token')
  .addBatch({
  'Given acess_token is saved': {
    'When find the access_token': {
      topic: function () {
        accessTokenModel.find('0fpDaM01fd6LXl1uXiLHZYIpC3BLNJe9PoVadrB2Pt5HX8LHJUKSPGA1iE0zEcWR6r8Xs3wsSIn5U9wD8DIrZ2iqUYVzyyyg5OvO5B6oFDMJfIUCM2E0H2n4E5sC207ytKzYZ8yElVWNas5boNtu02hSL3kqDeoFDGWzZSUSmMfYlXa29uFeUyAtUY0aDHWgAMIWSnW10X7hxHlFYup9GhjTgAT8iRwXU8EaHYFqGtMG05Zu21OfEKRyF1X3zpw1',
          this.callback);
      },
      'should return the requested access_token record': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.isArray(result);
      }
    }
  }
})
  .addBatch({
  'Tear down': {
    topic: function () {
      var dropTable = 'DROP TABLE IF EXISTS `access_token`;';

      db.connection.query(dropTable, this.callback);
    },
    'should drop the table': function (err, result) {
      assert.isNull(err);
      assert.isNotNull(result);
    }
  }
})
  .export(module);