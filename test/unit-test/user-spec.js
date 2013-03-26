/**
 *
 */
var
  vows = require('vows'),
  assert = require('assert'),
  mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ubuntu',
  password: '',
  database: 'circle_test'
});

connection.connect();

var usersModel = require('./../../src/app/models/users');
var userID;
/**
 * Scenario: Saving user credentials
 *
 * Given users table is empty
 * When we save the user credentials
 * Then we should have one unique row saved
 */
vows.describe('Scenario: Saving user credentials')
  .addBatch({
  'Set Up': {
    topic: function () {
      var deleteRecord = "DELETE FROM `users` WHERE `email` = 'budi@ca.ca'";

      connection.query(deleteRecord, this.callback);
    },
    'after drop table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE IF NOT EXISTS `users` (' +
          '`id` varchar(36) NOT NULL,' +
          '`email` varchar(254) NOT NULL,' +
          '`password` varchar(40) NOT NULL,' +
          '`confirm_password` varchar(40) NOT NULL,' +
          '`first_name` varchar(50) NOT NULL,' +
          '`last_name` varchar(50) NOT NULL,' +
          '`full_name` varchar(100) NOT NULL,' +
          '`verified` tinyint(1) NOT NULL,' +
          'PRIMARY KEY (`id`),' +
          'UNIQUE KEY `email` (`email`)' +
          ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

        connection.query(createTableStatement, this.callback);
      },
      'should create the table': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
      }
    }
  }
})
  .addBatch({
  'Given users table is empty': {
    'When we save the user credentials': {
      topic: function () {
        var newUser = {
          email: 'budi@ca.ca',
          password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
          confirm_password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
          first_name: 'Budi',
          last_name: 'Dharmawan',
          full_name: 'Budi Dharmawan'
        };
        usersModel.save(newUser, this.callback);
      },
      'we should have one unique row saved': function (err, result) {
        assert.isNull(err);
        assert.isObject(result);
        userID = result.id;
      }
    }
  }
})
  .export(module);

/**
 * Scenario: Find the users
 *
 * Given users is saved
 * When find the users
 * Then should return the requested users record
 */
vows.describe('Scenario: Find the users')
  .addBatch({
  'Given acess_token is saved': {
    'When find the users': {
      topic: function () {
        usersModel.find(userID,
          this.callback);
      },
      'should return the requested users record': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.isObject(result);
      }
    }
  }
})
  .addBatch({
  'Given acess_token is saved': {
    'When find the users': {
      topic: function () {
        usersModel.findByEmail('budi@ca.ca',
          this.callback);
      },
      'should return the requested users record': function (err, result) {
        assert.isNull(err);
        assert.isNotNull(result);
        assert.isObject(result);
      }
    }
  }
})
  .addBatch({
  'Tear down': {
    topic: function () {
      var deleteRecord = "DELETE FROM `users` WHERE `email` = 'budi@ca.ca'";
      connection.query(deleteRecord, this.callback);
    },
    'should drop the table': function (err, result) {
      assert.isNull(err);
      assert.isNotNull(result);
      connection.end();
    }
  }
})
  .export(module);