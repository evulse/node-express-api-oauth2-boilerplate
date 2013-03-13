/**
 * Say end point test suite
 */

var
  OAuth2 = require('oauth').OAuth2,
  vows = require('vows'),
  assert = require('assert'),
  request = require('request'),
  app = require('./../../src/app/app');
/**
 * Scenario: Retrieve JSON resource
 * Given there is API end point '/say/:name'
 * And the web service accept JSON representation
 * When the web consumer request resources in JSON
 * Then the web service should return JSON resource representation
 */
vows
  .describe('Scenario: Retrieve JSON resource')
  .addBatch({
  '\nGiven there is API end point "/say/:name"': {
    '\And the web service accept JSON representation': {
      '\nWhen the web consumer request resources in JSON': {
        topic: function () {
          return {
            // we assume the the client already get the authorization code
            code: 'sbo2fs3gpHVQWjcE'
          };
        },
        'after successful authorization request': {
          topic: function (body) {
            oauth2 = new OAuth2('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
              '8638be31-2f91-479d-924a-3742feb17443', '',
              'http://localhost:5000/dialog/authorize',
              'http://localhost:5000/oauth/token');
            oauth2.getOAuthAccessToken(body.code, {
              grant_type: 'authorization_code',
              redirect_uri: 'http://localhost:5000/test/callback'
            }, this.callback);
          },
          'after get access token': {
            topic: function (accessToken, refreshToken, result) {
              oauth2.get('http://localhost:5000/say/ghanoz.json',
                accessToken, this.callback);
            },
            'the web service should return JSON resource representation':
              function (err, result, response) {
                assert.isNull(err);
                assert.equal(response.statusCode, 200);
                assert.strictEqual(response.headers['content-type'] ===
                  'application/json; charset=utf-8', true);
                assert.include(result, 'name');
              }
          }
        }
      }
    }
  }
}).export(module);
/**
 * Scenario: Retrieve XML resource
 * Given there is API end point '/say/:name'
 * And the web service accept XML representation
 * When the web consumer request resources in XML
 * Then the web service should return XML resource representation
 */
vows
  .describe('Scenario: Retrieve XML resource')
  .addBatch({
  '\nGiven there is API end point "/say/:name"': {
    '\nAnd the web service accept XML representation': {
      '\nWhen the web consumer request resources in XML': {
        topic: function () {
          return {
            // we assume the the client already get the authorization code
            code: 'sbo2fs3gpHVQWjcE'
          };
        },
        'after successful authorization request': {
          topic: function (body) {
            oauth2 = new OAuth2('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
              '8638be31-2f91-479d-924a-3742feb17443', '',
              'http://localhost:5000/dialog/authorize',
              'http://localhost:5000/oauth/token');
            oauth2.getOAuthAccessToken(body.code, {
              grant_type: 'authorization_code',
              redirect_uri: 'http://localhost:5000/test/callback'
            }, this.callback);
          },
          'after get access token': {
            topic: function (accessToken, refreshToken, result) {
              oauth2.get('http://localhost:5000/say/ghanoz.xml',
                accessToken, this.callback);
            },
            'the web service should return XML resource representation':
              function (err, result, response) {
                assert.isNull(err);
                assert.equal(response.statusCode, 200);
                assert.strictEqual(response.headers['content-type'] ===
                  'application/xml', true);
              }
          }
        }
      }
    }
  }
}).export(module);
/**
 * Scenario: Not specified the resource format
 *
 * Given there is API end point '/say/:name'
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
          return {
            // we assume the the client already get the authorization code
            code: 'sbo2fs3gpHVQWjcE'
          };
        },
        'after successful authorization request': {
          topic: function (body) {
            oauth2 = new OAuth2('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
              '8638be31-2f91-479d-924a-3742feb17443', '',
              'http://localhost:5000/dialog/authorize',
              'http://localhost:5000/oauth/token');
            oauth2.getOAuthAccessToken(body.code, {
              grant_type: 'authorization_code',
              redirect_uri: 'http://localhost:5000/test/callback'
            }, this.callback);
          },
          'after get access token': {
            topic: function (accessToken, refreshToken, result) {
              oauth2.get('http://localhost:5000/say/ghanoz.abc',
                accessToken, this.callback);
            },
            'the web service should return HTTP 406 status code':
              function (err, result, response) {
                assert.isNotNull(err);
                assert.equal(err.statusCode, 406);
                assert.isUndefined(result);
                assert.isUndefined(response);
              }
          }
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
  '\nGiven the web consumer is not specify the requested content format': {
    '\nWhen the web consumer request resources': {
      topic: function () {
        return {
          // we assume the the client already get the authorization code
          code: 'sbo2fs3gpHVQWjcE'
        };
      },
      'after successful authorization request': {
        topic: function (body) {
          oauth2 = new OAuth2('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
            '8638be31-2f91-479d-924a-3742feb17443', '',
            'http://localhost:5000/dialog/authorize',
            'http://localhost:5000/oauth/token');
          oauth2.getOAuthAccessToken(body.code, {
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:5000/test/callback'
          }, this.callback);
        },
        'after get access token': {
          topic: function (accessToken, refreshToken, result) {
            oauth2.get('http://localhost:5000/say/ghanoz',
              accessToken, this.callback);
          },
          'the web service should return JSON resource representation':
            function (err, result, response) {
              assert.isNull(err);
              assert.equal(response.statusCode, 200);
              assert.strictEqual(response.headers['content-type'] ===
                'application/json; charset=utf-8', true);
              assert.include(result, 'name');
            }
        }
      }
    }
  }
}).export(module);