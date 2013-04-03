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
      return process.env.CLEARDB_DATABASE_URL;
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

module.exports.getConnection = function () {

  // Test connection health before returning it to caller.
  if ((module.exports.connection) && (module.exports.connection._socket)
    && (module.exports.connection._socket.readable)
    && (module.exports.connection._socket.writable)) {
    return module.exports.connection;
  }

  console.log(((module.exports.connection) ?
    'UNHEALTHY SQL CONNECTION; RE' : '') + 'CONNECTING TO SQL.');

  var connection = mysql.createConnection(generateConfig());

  connection.connect(function (err) {
  });

  connection.on('close', function (err) {
    console.log('SQL CONNECTION CLOSED.');
  });

  connection.on('error', function (err) {
    connection.connect(function (err) {
    });
  });

  module.exports.connection = connection;
  return module.exports.connection;
};