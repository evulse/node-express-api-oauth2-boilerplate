var db = require('./../../db/index').MySQL;

/**
 * Find the saved Authorization Code
 *
 * @param {String} key key string
 * @param {Function} cb will return the result if the code exists
 */
exports.find = function (key, cb) {

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);

    connection.query("SELECT * FROM `authorization_request` " +
      "WHERE auth_code = '" + key + "'", function (err, record) {

      connection.end();

      if (err) {
        cb(err);
      } else if (record[0]) {
        cb(null, {
          authCode: record[0].auth_code,
          redirectURI: record[0].redirect_uri,
          clientID: record[0].client_id,
          userID: record[0].user_id
        });
      }
    });
  });
};

/**
 * @param {String} authCode authorization code
 * @param {Number} clientID client identifier
 * @param {String} redirectURI redirect URI
 * @param {Number} userID user identifier
 * @param {Function} cb callback function
 */
exports.save = function (authCode, clientID, redirectURI, userID, cb) {

  var newAuthCode = {
    auth_code: authCode,
    client_id: clientID,
    redirect_uri: redirectURI,
    user_id: userID
  };

  db.pool.getConnection(function (err, connection) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      db.handleDisconnect(connection);
    
    connection.query('INSERT INTO `authorization_request` SET ?',
      newAuthCode, function (err, result) {
      connection.end();

      if (err)
        cb(err);
      else if (result.affectedRows && result.affectedRows == 1)
        cb(null, true);
    });
  });
};