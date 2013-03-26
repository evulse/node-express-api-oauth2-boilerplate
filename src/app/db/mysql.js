/*
 * Database connection.
 */

var mysql = require('mysql');

/**
 * Setup the config based on the current NODE_ENV
 */
function generateConfig () {

  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        host: 'localhost',
        user: '',
        password: '',
        database: 'express-api-boilerplate-production'
      };
      break;

    case 'development':
      if (process.env.CLEARDB_DATABASE_URL) {
        return process.env.CLEARDB_DATABASE_URL;
      } else {
        return {
          host: 'localhost',
          user: 'root',
          password: 'pazzword',
          database: 'express-api-boilerplate-dev'
        };
      }
      break;

    case 'testing':
      // testing configs
      // mysql are set up to use the ubuntu user, have a database called circle_test
      // available, and don't require any password.
      // https://circleci.com/docs/environment
      return {
        host: 'localhost',
        user: 'ubuntu',
        password: '',
        database: 'circle_test'
      };
      break;

    default:
      return {};
      break;
  }
}

/**
 * @param {Object} options connection options
 */
exports.pool = mysql.createPool(generateConfig());