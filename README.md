Express REST API Boilerplate
============================

## Getting Started

The actual REST API server source code is located under `src/app`. The REST API
server currently is deployed in Heroku http://sheltered-reef-5266.herokuapp.com/

## Documentations

REST API documentations is located under `doc/rest-api-doc/build/html`.
Open it with your favorite web browser.

## Test

Test is located under `test`. Currently, the test is only covering the REST API
end point test. To run the test follow this steps:

1. Run the REST API server using the testing configuration `NODE_ENV=testing node app.js`

2. Go to the test directory and run test suite `sudo npm install && npm test`