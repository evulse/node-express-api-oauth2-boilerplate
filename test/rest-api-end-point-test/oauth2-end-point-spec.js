/**
 * Authorization grant test suites
 */

var
  Browser = require('zombie'),
  OAuth2 = require('oauth').OAuth2,
  vows = require('vows'),
  request = require('request'),
  assert = require('assert'),
  app = require('./../../src/app/app');

var constructedURI = 'http://localhost:5000/dialog/authorize?' +
  'response_type=code&' +
  'client_id=c67f0160-7aad-4aa5-8a88-92bbd6f02a4c&' +
  'scope=*&' +
  'redirect_uri=' + encodeURIComponent('http://localhost:5000/test/callback');

/**
 * Scenario: Able to access protected resource
 *
 * Given the client request authorization is successful
 * And the access token request authorization is successful
 * When the client access protected resource
 * Then the resource owner should return the actual resource
 */
vows.describe('Scenario: Able to access protected resource')
  .addBatch({
  "\nGiven the client request authorization is successful": {
    "\nAnd the access token request authorization is successful": {
      "\nWhen the client access protected resource": {
        topic: function () {
          return {
            // we assume the the client already get the authorization code
            code: 'sbo2fs3gpHVQWjcE'
          };
        },
        "after successful authorization request": {
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
          "after get access token": {
            topic: function (accessToken, refreshToken, result) {
              oauth2.get('http://localhost:5000/say/ghanoz.json',
                accessToken, this.callback);
            },
            "the resource owner should return the actual resource":
              function (err, result, response) {
                assert.isNull(err);
                assert.include(result, 'name');
              }
          }
        }
      }
    }
  }
}).export(module);