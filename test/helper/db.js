/**
 * Database connection helper
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'ubuntu',
  password: '',
  database: 'circle_test'
});

connection.connect();

connection.on('error', function (err) {
  console.log(err);
});

module.exports = connection;