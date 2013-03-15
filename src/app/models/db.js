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
      return {
        host: 'localhost',
        user: 'root',
        password: 'pazzword',
        database: 'express-api-boilerplate-dev'
      };
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
var DB = function (options) {

  options = arguments[0] || generateConfig();
  this.connection = mysql.createConnection(options);
};
/**
 * Connect to database
 *
 * @param {Function} cb callback function, will return the connection if
 *                      connected
 */
DB.prototype.connect = function (cb) {

  var self = this;
  self.connection.connect(function (err) {
    if (err)
      cb(err);
    else if (self.connection)
      cb(null, self.connection);
    else if (self.connection == null)
      cb(null, mysql.createConnection(generateConfig()));
  });
};

/**
 * Close connection
 *
 * @param {Function} cb callback function, will return true end successfully
 */
DB.prototype.end = function (cb) {

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

module.exports.DB = DB;