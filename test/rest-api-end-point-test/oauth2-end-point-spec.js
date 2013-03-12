/**
 * Authorization grant test suites
 */

var
  Browser = require('zombie'),
  OAuth2 = require('oauth').OAuth2,
  vows = require('vows'),
  request = require('request'),
  assert = require('assert');

app = require('./../../src/app/app');

var constructedURI = 'http://sheltered-reef-5266.herokuapp.com/dialog/authorize?' +
  'response_type=code&' +
  'client_id=48c907b0-b8ac-4161-84c9-4fbf1030b5da&' +
  'scope=*&' +
  'redirect_uri=' + encodeURIComponent('http://sheltered-reef-5266.herokuapp.com/test/callback');

function fillTheLoginForm (uri, cb) {

  // Load the page from localhost
  browser = new Browser();
  browser.visit(uri, {debug: false}, function (e, browser) {

    if (e) throw new Error(e);

    // Fill email, password and submit form
    browser
      .fill('username', 'joe')
      .fill('password', 'password')
      .pressButton('Submit', function () {

      // Form submitted, new page loaded.
      browser.pressButton('Allow', function () {
        cb(null, browser.response.body);
      });
    });
  });
}

/**
 * Scenario: Authorization request should return authorization code
 *
 * Given the client request authorization from the resource owner
 * And the client is already registered
 * When the resource owner authorize the request
 * Then the authorization server should return authorization code
 */
vows.describe('Scenario: Authorization request should return authorization code')
  .addBatch({
  "\nGiven the client request authorization from the resource owner": {
    "\nAnd the client is already registered": {
      "\nWhen the resource owner authorize the request": {
        topic: function () {
          fillTheLoginForm(constructedURI, this.callback);
        },
        "after successful authorization request": {
          topic: function (body) {
            oauth2 = new OAuth2('48c907b0-b8ac-4161-84c9-4fbf1030b5da',
              '48c907b0-dc38-475c-a9c4-4a2e1030b5da', '',
              'http://sheltered-reef-5266.herokuapp.com/dialog/authorize',
              'http://sheltered-reef-5266.herokuapp.com/oauth/token');

            oauth2.getOAuthAccessToken(JSON.parse(body).code, {
              grant_type: 'authorization_code',
              redirect_uri: 'http://sheltered-reef-5266.herokuapp.com/test/callback'
            }, this.callback);
          },
          'the authorization server should return an OAuth token':
            function (err, accessToken, refreshToken, params) {
              assert.isNull(err);
              assert.isNotNull(accessToken);
              assert.isNotNull(params);
              assert.include(params, 'access_token');
              assert.include(params, 'token_type');
              assert.include(params.token_type, 'bearer');
            }
        }
      }
    }
  }
}).export(module);