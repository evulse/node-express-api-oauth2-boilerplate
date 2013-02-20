/**
 * Say end point test suite
 */

var
  vows = require('vows'),
  assert = require('assert'),
  request = require('request');

/**
 * Scenario: Retrieve JSON resource
 * Given there is API end point "/say/:name"
 * And the web service accept JSON and XML representation
 * When the web consumer request resources in JSON
 * Then the web service should return JSON resource representation
 */
vows
  .describe('Scenario: Retrieve JSON resource')
  .addBatch({
  '\nGiven there is API end point "/say/:name"': {
    '\nAnd the web service accept JSON and XML representation': {
      '\nWhen the web consumer request resources in JSON': {
        topic: function () {
          request({
            uri: 'http://localhost:5000/say/ghanoz.json',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }, this.callback);
        },
        "the web service should return JSON resource representation":
          function (error, response, body) {
            assert.isNull(error);
            assert.equal(response.statusCode, 200);
            assert.strictEqual(response.headers['content-type'] ===
              'application/json; charset=utf-8', true);
          }
      }
    }
  }
}).export(module);

/**
 * Scenario: Retrieve XML resource
 * Given there is API end point "/say/:name"
 * And the web service accept JSON and XML representation
 * When the web consumer request resources in XML
 * The the web service should return XML resource representation
 */
vows
  .describe('Scenario: Retrieve XML resource')
  .addBatch({
  '\nGiven there is API end point "/say/:name"': {
    '\nAnd the web service accept JSON and XML representation': {
      '\nWhen the web consumer request resources in XML': {
        topic: function () {
          request({
            uri: 'http://localhost:5000/say/ghanoz.xml',
            method: 'GET',
            headers: {
              'Content-Type': 'application/xml'
            }
          }, this.callback);
        },
        "the web service should return XML resource representation":
          function (error, response, body) {
            assert.isNull(error);
            assert.equal(response.statusCode, 200);
            // should return JSON response
            assert.strictEqual(response.headers['content-type'] ===
              'application/xml', true);
          }
      }
    }
  }
}).export(module);

/**
 * Scenario: Not specified the resource format
 *
 * Given there is API end point "/say/:name"
 * And the web service accept JSON and XML representation
 * When the web consumer request resources in unknown resource format
 * Then the web service should return HTTP 406 status code
 */
vows
  .describe('Scenario: Not specified the resource format')
  .addBatch({
  '\nGiven there is API end point "/say/:name"': {
    '\nAnd the web service accept JSON and XML representation': {
      '\nWhen the web consumer request resources in unknown resource format': {
        topic: function () {
          request({
            uri: 'http://localhost:5000/say/ghanoz.abc',
            method: 'GET'
          }, this.callback);
        },
        "the web service should return HTTP 406 status code":
          function (error, response, body) {
            assert.isNull(error);
            assert.equal(response.statusCode, 406);
            assert.strictEqual(response.headers['content-type'] ===
              'application/json; charset=utf-8', true);
          }
      }
    }
  }
}).export(module);

/**
 * Scenario: The request content format is not specified
 *
 * Given the web consumer is not specify the requested content format
 * When the web consumer request resources
 * Then the web service should return JSON resource representation
 */
vows
  .describe('Scenario: The request content format is not specified')
  .addBatch({
  "\nGiven the web consumer is not specify the requested content format": {
    "\nWhen the web consumer request resources": {
      topic: function () {
      request({
        uri: 'http://localhost:5000/say/ghanoz',
        method: 'GET'
      }, this.callback);
    },
    "Then the web service should return JSON resource representation":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 200);
      }
    }
  }
}).export(module);