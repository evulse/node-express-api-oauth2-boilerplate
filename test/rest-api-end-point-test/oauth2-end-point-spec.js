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
  'client_id=48c907b0-b8ac-4161-84c9-4fbf1030b5da&' +
  'scope=*&' +
  'redirect_uri=' + encodeURIComponent('http://localhost:5000/test/callback');

function fillTheLoginForm (uri, cb) {

  // Load the page from localhost
  browser = new Browser();
  browser.visit(uri, {debug: false}, function (e, browser) {

    if (e)
      throw new Error(e);

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
          fillTheLoginForm(constructedURI, this.callback);
        },
        "after successful authorization request": {
          topic: function (body) {
            oauth2 = new OAuth2('48c907b0-b8ac-4161-84c9-4fbf1030b5da',
              '48c907b0-dc38-475c-a9c4-4a2e1030b5da', '',
              'http://localhost:5000/dialog/authorize',
              'http://localhost:5000/oauth/token');

            oauth2.getOAuthAccessToken(JSON.parse(body).code, {
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