Express REST API Boilerplate
============================

## Getting Started

The actual REST API server source code is located under `src/app`. The REST API
server currently is deployed in Heroku http://evulse-express-api.herokuapp.com/

## Documentations

REST API documentations is located on
https://evulse.atlassian.net/wiki/display/EOAB/REST+API+Documentation

## Continuous Integration

This project is setup through CircleCI. Build Status Images will be added soon.

## Test

Test is located under `test`. Currently, the test is only covering the REST API
end point test. To run the test follow this steps:

1. Run the REST API server using the testing configuration `NODE_ENV=testing
   node app.js`

2. Go to the test directory and run test suite `sudo npm install && npm test`