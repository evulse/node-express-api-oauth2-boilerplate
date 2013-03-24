/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var
  vows = require('vows'),
  assert = require('assert');

var MySQL = require('./../../src/app/db/index').MySQL;
var db = new MySQL();
var clientsModel = require('./../../src/app/models/clients');

/**
 * Scenario: Saving client credentials
 *
 * Given clients table is empty
 * When we save the client credentials
 * Then we should have one unique row saved
 */
vows.describe('Scenario: Saving client credentials')
  .addBatch({
  'Set Up': {
    topic: function () {
      var dropTable = 'DROP TABLE IF EXISTS `clients`;';

      db.connection.query(dropTable, this.callback);
    },
    'after drop table': {
      topic: function () {
        var createTableStatement = 'CREATE TABLE IF NOT EXISTS `clients` (' +
          '`client_id` varchar(36) NOT NULL,' +
          '`client_secret` varchar(36) NOT NULL,' +
          '`redirect_uri` varchar(250) NOT NULL,' +
          '`user_id` varchar(36) NOT NULL,' +
          'PRIMARY KEY (`client_id`),' +
          'UNIQUE KEY `client_secret` (`client_secret`),' +
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
  'Given clients table is empty': {
    'When we save the client credentials': {
      topic: function () {
        clientsModel.save('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
          '8638be31-2f91-479d-924a-3742feb17443',
          'http://example.com/callback',
          '912ac711-8b2e-44c6-a088-cb8cf5ab4916', this.callback);
      },
      'we should have one unique row saved': function (err, result) {
        assert.isNull(err);
        assert.isTrue(result);
      }
    }
  }
})
  .export(module);
