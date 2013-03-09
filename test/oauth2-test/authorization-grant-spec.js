/**
 * Authorization grant test suites
 */

var
  Browser = require('zombie'),
  vows = require('vows'),
  request = require('request'),
  assert = require('assert');

var constructedURI = 'http://localhost:5000/dialog/authorize?' +
  'response_type=code&' +
  'client_id=48c907b0-b8ac-4161-84c9-4fbf1030b5da&' +
  'scope=*&' +
  'redirect_uri=' + encodeURIComponent('http://localhost:5000/test/callback');

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
        'the authorization server should return authorization code':
          function (err, body) {
            assert.isNull(err);
            assert.include(body, 'code');
          }
      }
    }
  }
}).export(module);

function fillTheLoginForm (uri, cb) {

  // Load the page from localhost
  browser = new Browser();
  browser.visit(uri, {debug: false}, function (e, browser) {

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