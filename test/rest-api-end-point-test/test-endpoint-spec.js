/**
 * Test end point test suite
 */

var
  vows = require('vows'),
  assert = require('assert'),
  request = require('request');
    app = require('../../src/app/app');

/**
 * Scenario: POST New Record with Bad Data
 *
 * Given the request body contained invalid parameters
 * Then the web service should return HTTP code 400
 */
vows
  .describe('Scenario: POST New Record with Bad Data')
  .addBatch({
  '\nGiven the request body contained invalid parameters': {
    topic: function () {
      request({
        uri: 'http://localhost:5000/test.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
          "test": {
            "name": ""
          }
        }
      }, this.callback);
    },
    "the web service should return HTTP code 400":
      function (error, response, body) {
        var expectedResponse = {
          "error": "invalid_parameters",
          "error_description": "Parameter missing or invalid",
          "error_uri": "http://api.carted.com/test#validation",
          "errors": {
            "name": [
              "can't be blank"
            ],
            "price": [
              "must be greater than zero"
            ]
          }
        };
        assert.isNull(error);
        assert.equal(response.statusCode, 400);
        assert.include(body, 'error');
        assert.include(body, 'error_description');
        assert.include(body, 'error_uri');
        assert.include(body, 'errors');
      }
  }
}).export(module);

/**
 * Scenario: POST New Record with Good Data
 *
 * Given the request body contained new record with Good Data
 * Then the web service should return HTTP code 201
 */
vows.describe('Scenario: Given the request body contained new record with Good Data')
  .addBatch({
  "\nGiven the request body contained invalid parameters": {
    topic: function () {
      request({
        uri: 'http://localhost:5000/test.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
          "test": {
            "name": "Hello",
            "price": 50
          }
        }
      }, this.callback);
    },
    "the web service should return HTTP code 201":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 201);
        assert.include(body, 'test');
      }
  }
}).export(module);

/**
 * Scenario: GET Single Record
 *
 * Given the single record is available
 * Then the web service should return HTTP code 200
 */
vows.describe('Scenario: GET Single Record')
  .addBatch({
  "\nGiven the single record is avaiable": {
    topic: function () {
      request({
        uri: 'http://localhost:5000/test/1.json',
        method: 'GET'
      }, this.callback);
    },
    "the web service should return HTTP code 200":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 200);
        assert.include(body, 'name');
        assert.include(body, 'price');
      }
  }
}).export(module);

/**
 * Scenario: GET Multiple Records
 *
 * Given the multiple records is available
 * Then the web service should return HTTP code 200
 */
vows.describe('Scenario: GET Multiple Records')
  .addBatch({
  "\nGiven the multiple records is available": {
    topic: function () {
      request({
        uri: 'http://localhost:5000/test.json',
        method: 'GET'
      }, this.callback);
    },
    "the web service should return HTTP code 200":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 200);
        assert.isTrue(body.length >= 1);
      }
  }
}).export(module);

/**
 * Scenario: GET Non-Existant Record
 *
 * Given the requested record is not exists
 * Then the web service should return HTTP code 404
 */
vows.describe('Scenario: GET Non-Existant Record')
  .addBatch({
  "\nGiven the requested record is not exists": {
    topic: function () {
      request({
        uri: 'http://localhost:5000/test/3.json',
        method: 'GET'
      }, this.callback);
    },
    "the web service should return HTTP code 404":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 404);
      }
  }
}).export(module);

/**
 * Scenario: PUT Single Record
 *
 * Given the request body contained a valid updated data
 * When client PUT the single record
 * Then the web service should return HTTP code 200
 */
vows.describe('Scenario: PUT Single Record')
  .addBatch({
  "\nGiven the request body contained a valid updated data": {
    "\nWhen client PUT the single record": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/test/1.json',
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          json: {
            "id": 1,
            "price": 60.00
          }
        }, this.callback);
      },
      "the web service should return HTTP code 200":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 200);
        }
    }
  }
}).export(module);

/**
 * Scenario: PUT Multiple Records
 *
 * Given the request body contained a valid updated data
 * When client PUT the multiple records
 * Then the web service should return HTTP code 200
 */
vows.describe('Scenario: PUT Single Record')
  .addBatch({
  "\nGiven the request body contained a valid updated data": {
    "\nWhen client PUT the single record": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/test.json',
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          json: [
            {
              "id": 1,
              "price": 70.00
            },
            {
              "id": 2,
              "name": "Hello 22"
            }
          ]
        }, this.callback);
      },
      "the web service should return HTTP code 200":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 200);
        }
    }
  }
}).export(module);


/**
 * Scenario: DELETE Record
 *
 * Given the record is exists
 * When client DELETE Record
 * Then the web service should return HTTP code 204
 */
vows.describe('Scenario: PUT Single Record')
  .addBatch({
  "\nGiven the record is exists": {
    "\nWhen client DELETE Record": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/test/2.json',
          method: 'DELETE'
        }, this.callback);
      },
      "the web service should return HTTP code 204":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 204);
        }
    }
  }
}).export(module);