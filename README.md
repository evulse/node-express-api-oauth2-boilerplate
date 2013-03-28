Express REST API Boilerplate
============================

## Getting Started

The actual REST API server source code is located under `src/app`. The REST API
server currently is deployed in Heroku http://evulse-express-api.herokuapp.com/

### Development

To run the app on local environment just follow this steps:

1. Import the MySQL dump to your local MySQL server, the MySQL dump is located
on `src/database/express-api-boilerplate-dev.sql`

2. Start the app by run server, go to directory `src/app/` and run
`foreman start`

## Documentations

REST API documentations is located on
https://evulse.atlassian.net/wiki/display/EOAB/REST+API+Documentation

## Continuous Integration

This project is setup through CircleCI. Build Status Images will be added soon.

## Test

Test is located under `test`. Currently, the test is only covering the REST API
end point test. To run the test follow this steps:

1. Setup the environment by run this command `export NODE_ENV=testing`.
Currently, the test runner is only run best in Ubuntu 12.10.

2. Start the MySQL database with database name `circle_test`, username `ubuntu`
and leave the password empty.

3. Run `npm test`