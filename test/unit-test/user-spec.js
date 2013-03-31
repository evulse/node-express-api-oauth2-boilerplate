/**
 *
 */
var
  vows = require('vows'),
  assert = require('assert');

var
  connection = require('./../helper/db'),
  usersModel = require('./../../src/app/models/users');

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
      var deleteRecord = "DELETE FROM `users` WHERE " +
        "`email` = 'muhammadghazali2480@gmail.com'";

      connection.query(deleteRecord, this.callback);
    },
    'after delete record': {
      topic: function (err, result) {
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
          email: 'muhammadghazali2480@gmail.com',
          password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
          confirm_password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
          first_name: 'Muhammad',
          last_name: 'Ghazali',
          full_name: 'Muhammad Ghazali'
        };
        usersModel.save(newUser, this.callback);
      },
      'we should have one unique row saved': function (err, result) {
        userID = result.id;
        assert.isNull(err);
        assert.isObject(result);
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
  'Given users is saved': {
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
  'Given users is saved': {
    'When find the users': {
      topic: function () {
        usersModel.findByEmail('muhammadghazali2480@gmail.com',
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
  .export(module);

/**
 * Scenario: Save the email verification token
 *
 * Given we sent the email verification link
 * verification table is empty
 * When save the email verification token
 * Then the verification_table should be have one row
 */
vows.describe('Scenario: Save the email verification token')
  .addBatch({
  'Set Up': {
    'Create table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE IF NOT EXISTS ' +
          '`verification_token` (' +
          '`token` varchar(40) NOT NULL,' +
          '`user_id` varchar(36) NOT NULL,' +
          'KEY `user_id` (`user_id`)' +
          ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

        connection.query(createTableStatement, this.callback);
      },
      'after create table': {
        topic: function (err, result) {
          var deleteRecord = "DELETE FROM `verification_token` WHERE " +
            "`user_id` = '" + userID + "';";

          connection.query(deleteRecord, this.callback);
        },
        'should delete record': function (err, result) {
          assert.isNull(err);
        }
      }
    }
  }
})
  .addBatch({
  'When save the email verification token': {
    topic: function () {
      usersModel.saveVerificationToken('muhammadghazali2480@gmail.com',
        '24cf8c5b6a11160634042644819284717cee1495', this.callback);
    },
    'the verification_table should be have one row': function (err, result) {
      assert.isNull(err);
      assert.isTrue(result);
    }
  }
})
  .addBatch({
  'Tear down': {
    topic: function () {
      var deleteRecord = "DELETE FROM `verification_token` WHERE " +
        "`user_id` = '" + userID + "';";
      connection.query(deleteRecord, this.callback);
    },
    'should delete the record': function (err, result) {
      assert.isNull(err);
      assert.isNotNull(result);
      assert.equal(result.affectedRows, 1);
    }
  }
})
  .export(module);