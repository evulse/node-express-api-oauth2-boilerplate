/**
 * Authorization grant test suites
 */

var
  Browser = require("zombie"),
  assert = require('assert');

/**
 * Scenario: Authorization request should return authorization code
 *
 * Given the client request authorization from Resource Owner
 * And the client is already registered
 * When the client directs the resource owner to the authorization endpoint
 * And the Resource Owner authorize the client
 * Then authorization server return authorization code
 */
var constructedURI = 'http://localhost:5000/dialog/authorize?' +
  'response_type=code&' +
  'client_id=48c907b0-b8ac-4161-84c9-4fbf1030b5da&' +
  'scope=*&' +
  'redirect_uri=http://localhost:5000/callback';

// Load the page from localhost
browser = new Browser();
browser.visit(constructedURI, {debug: false}, function (e, browser) {

  // Fill email, password and submit form
  browser.
    fill('username', 'joe').
    fill('password', 'password').
    pressButton('Submit', function () {

    // Form submitted, new page loaded.
    browser.pressButton('Allow', function () {
      // GET /callback?code=8vWrf2pKwWJ4TjOC
      // should return 404
      console.log('browser.statusCode === 404', (browser.statusCode === 404));
      browser.close();
    });
  });
});