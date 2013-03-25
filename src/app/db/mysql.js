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
      console.log('process.env.CLEARDB_DATABASE_URL', process.env.CLEARDB_DATABASE_URL);
      if (process.env.CLEARDB_DATABASE_URL) {
        return 'mysql://b9243bb6197285:1272e486@us-cdbr-east-03.cleardb.com/' +
          'heroku_a631bf5313a65cb?reconnect=true';
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
var MySQL = function (options) {

  options = arguments[0] || generateConfig();
  var connection = mysql.createConnection(options);
  connection.connect(function (err) {
    if (err)
      console.log('err', err);
  });

  this.connection = connection;
};

/**
 * Close connection
 *
 * @param {Function} cb callback function, will return true end successfully
 */
MySQL.prototype.end = function (cb) {

  var self = this;

  if (self.connection) {
    self.connection.end(function (err) {
      if (err)
        cb(null);
      else
        cb(null, true);
    });
  } else {
    // connection already closed
    cb(null, false);
  }
};

module.exports.MySQL = MySQL;