/*
 * User end point test suite
 */

var
  vows = require('vows'),
  assert = require('assert'),
  request = require('request');
  app = require('../../src/app/app');

/**
 * Scenario: Unverified user should receive email verification link
 * Given client POST new user data in JSON
 * And new user data contained 3 required fields (email, password, confirm_password)
 * And new user data accompanied by 3 optional fields (first_name, last_name, name)
 * When client POST request hit the API end point
 * Then the REST API should verify and validate the required fields
 * And the REST API should verify and validate the optional fields
 * And the REST API should save the new user data to DB with status "unverified"
 * And the REST API should send email verification link
 * And the REST API should return HTTP 201
 * And the REST API should contain JSON resource (email, first_name, last_name, name, verified)
 */
vows.describe('Scenario: Scenario: Unverified user should receive email verification link')
  .addBatch({
  "\nWhen client POST request hit the API end point": {
    topic: function () {
      request({
        uri: 'http://localhost:5000/user/create',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        json: {
          "email": "muhammadghazali2480@gmail.com",
          "first_name": "Muhammad",
          "last_name": "Ghazali",
          "name": "Muhammad Ghazali",
          "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
          "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
        },
        strictSSL: true
      }, this.callback);
    },
    "the REST API should return HTTP 201":
      function (error, response, body) {
        assert.isNull(error);
        assert.equal(response.statusCode, 201);
      },
    "the REST API should contain JSON resource (email, first_name, last_name, name, verified)":
      function (error, response, body) {
        assert.isNull(error);
        assert.include(body, 'email');
        assert.include(body, 'first_name');
        assert.include(body, 'last_name');
        assert.include(body, 'name');
        assert.include(body, 'verified');
        assert.isFalse(body.verified);
      }
  }
}).export(module);

/**
 * Scenario: Unspecified required parameter should response with HTTP 400
 *
 * Given client sent new user data without required values
 * When client POST request hit the API end point
 * Then the REST API should response with HTTP 400
 */
vows.describe('Scenario: Unspecified required parameter should response with HTTP 400')
  .addBatch({
  "\nGiven client sent new user data without required values": {
    "\nWhen client POST request hit the API end point": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/user/create',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          json: {
            "first_name": "Mike",
            "last_name": "Angell",
            "name": "Mike Angell"
          },
          strictSSL: true
        }, this.callback);
      },
      "the REST API should response with HTTP 400":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 400);
        }
    }
  }
})
//  .export(module);

/**
 * Scenario: Scenario: Duplicate email should response with HTTP 409
 *
 * Given client sent user data with an email field that already exists
 * When client POST request hit the API end point
 * Then the REST API should response with HTTP 409
 * And the returned response should contain JSON explaining the error
 */
vows.describe('Scenario: Duplicate email should response with HTTP 409')
  .addBatch({
  "\nGiven client sent user data with an email field that already exists": {
    "\nWhen client POST request hit the API end point": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/user/create',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          json: {
            "email": "duplicate@test.com",
            "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "first_name": "Mike",
            "last_name": "Angell",
            "name": "Mike Angell"
          },
          strictSSL: true
        }, this.callback);
      },
      "the REST API should response with HTTP 409":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 409);
        },
      "the returned response should contain JSON explaining the error":
        function (error, response, body) {
          assert.isNull(error);
          assert.include(body, 'message');
        }
    }
  }
})
//  .export(module);

/**
 * Scenario: password and password_confirm do not match response with HTTP 400
 *
 * Given client sent user data with the password and password_confirm not being identical
 * When client POST request hit the API end point
 * Then the REST API should response with HTTP 400
 * And the returned response should contain JSON explaining the error
 */
vows.describe('Scenario: password and password_confirm do not match response with HTTP 400')
  .addBatch({
  "\nGiven client sent user data with the password and password_confirm not being identical": {
    "\nWhen client POST request hit the API end point": {
      topic: function () {
        request({
          uri: 'http://localhost:5000/user/create',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          json: {
            "email": "duplicate@test.com",
            "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fe7",
            "first_name": "Mike",
            "last_name": "Angell",
            "name": "Mike Angell"
          },
          strictSSL: true
        }, this.callback);
      },
      "the REST API should response with HTTP 400":
        function (error, response, body) {
          assert.isNull(error);
          assert.equal(response.statusCode, 400);
        },
      "the returned response should contain JSON explaining the error":
        function (error, response, body) {
          assert.isNull(error);
          assert.include(body, 'message');
        }
    }
  }
})
//  .export(module);