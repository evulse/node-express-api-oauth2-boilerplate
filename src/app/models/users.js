var uuid = require('node-uuid');

var db = require('./../db/index').MySQL;

/**
 * Find user by user identifier
 *
 * @param {String} userID user identifier in UUID format
 * @param {Function} cb will return the user record if exists
 */
exports.find = function (userID, cb) {

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);

    connection.query("SELECT * FROM `users` WHERE id = '" + userID + "'",
      function (err, result) {
        connection.end();

        if (err) {
          cb(err);
        } else if (result) {
          for (var i = 0, len = result.length; i < len; i++) {
            var user = result[i];
            if (user.id === userID) {
              return cb(null, user);
            }
          }

          return cb(null, null);
        }
      });
  });
};

/**
 * Find user by user email address
 *
 * @param {String} email valid email address
 * @param {Function} cb will return the user record if exists
 */
exports.findByEmail = function (email, cb) {

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);

    connection.query("SELECT * FROM `users` WHERE email = '" + email + "'",
      function (err, result) {
        connection.end();

        if (err) {
          cb(err);
        } else if (result) {
          for (var i = 0, len = result.length; i < len; i++) {
            var user = result[i];
            if (user.email === email) {
              return cb(null, user);
            }
          }

          return cb(null, null);
        }
      });
  });
};

/**
 * Is the account is available for this email address
 *
 * @param {String} email valid email address
 * @param {Function} cb will return true if the account is available
 */
exports.isAvailable = function (email, cb) {

  if (email == null)
    cb(null, 'email_required');

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);

    connection.query("SELECT * FROM `users` WHERE email = '" + email + "'",
      function (err, result) {
        connection.end();

        if (err)
          cb(err);
        else if (!result.length)
          cb(null, true);
        else if (result.length >= 1 && (result[0].email === email))
          cb(null, false);
      });
  });
};

/**
 * Save new user
 *
 * @param {Object} data new user data
 * @param {Function} cb will return the new user data if succeed
 */
exports.save = function (data, cb) {

  // append the id and verified status
  data.id = uuid.v4();
  data.verified = 0;

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);
    
    connection.query('INSERT INTO `users` SET ?', data,
      function (err, result) {
        connection.end();

        if (err)
          cb(err);
        else if (result.affectedRows && result.affectedRows == 1)
          cb(null, data);
      });
  });
};