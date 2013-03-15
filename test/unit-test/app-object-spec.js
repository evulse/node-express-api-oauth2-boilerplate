/*
 * Application object unit test suite.
 */

var
  vows = require('vows'),
  assert = require('assert');

/**
 * Scenario: Get MySQL db connection
 * Given is exposed the app object
 * When the method user wants to get the MySQL db connection
 * Then the method user should be able to get the MySQL db connection from
 * the app object
 */
vows.describe('Scenario: Get MySQL db connection')
  .addBatch({
  '\nGiven is exposed the app object': {
    '\nWhen the method user wants to get the MySQL db connection': {
      topic: function () {
        var app = require('./../../src/app/app').app;
        return app.get('mysqlDB');
      },
      'the method user should be able to get the MySQL db connection from the app object': function (topic) {
        console.log(topic);
        assert.isNotNull(topic);
      }
    }
  }
})
  .export(module);