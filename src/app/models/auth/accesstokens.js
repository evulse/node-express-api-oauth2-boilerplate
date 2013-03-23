var MySQL = require('./../../db/index').MySQL;
var db = new MySQL();

/**
 * Find the saved Access Token
 *
 * @param {String} token the token string
 * @param {Function} cb will return the token records in Array format if found
 */
exports.find = function (key, cb) {

  db.connection.query("SELECT * FROM access_token WHERE token = '" + key + "'",
    function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
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

  db.connection.query('INSERT INTO access_token SET ?', newAccessToken,
    function (err, result) {
      if (err)
        cb(err);
      else if (result.affectedRows && result.affectedRows == 1)
        cb(null, true);
    });
};