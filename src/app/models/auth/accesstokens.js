var db = require('./../../db/index').MySQL;

/**
 * Find the saved Access Token
 *
 * @param {String} token the token string
 * @param {Function} cb will return the token records in Array format if found
 */
exports.find = function (key, cb) {

  db.pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM access_token WHERE token = '" + key + "'",
      function (err, result) {
        if (err) {
          cb(err);
        } else if (result[0]) {
          connection.end();
          cb(null, {
            clientID: result[0].client_id,
            userID: result[0].user_id,
            token: result[0].token
          });
        }
      });
  });
};

/**
 * Save the access token
 *
 * @param {String} token the token string
 * @param {String} userID user identifier in UUID
 * @param {String} clientID client identifier in UUID
 * @param {Function} cb will return true if saved
 */
exports.save = function (token, userID, clientID, cb) {

  var newAccessToken = {
    client_id: clientID,
    user_id: userID,
    token: token
  };

  db.pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO access_token SET ?', newAccessToken,
      function (err, result) {
        if (err) {
          cb(err);
        } else if (result.affectedRows && result.affectedRows == 1) {
          connection.end();
          cb(null, true);
        }
      });
  });
};