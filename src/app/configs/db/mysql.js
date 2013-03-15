/**
 * MySQL database connection configurations.
 */

// production configs
exports.production = {
  host: 'localhost',
  user: '',
  password: '',
  database: 'express-api-boilerplate-production'
};

// development configs
exports.development = {
  host: 'localhost',
  user: 'root',
  password: 'pazzword',
  database: 'express-api-boilerplate-dev'
};

// testing configs
// mysql are set up to use the ubuntu user, have a database called circle_test
// available, and don't require any password.
// https://circleci.com/docs/environment
exports.testing = {
  host: 'localhost',
  user: 'ubuntu',
  password: '',
  database: 'circle_test'
};