var MySQL = require('./../../db/index').MySQL;
var db = new MySQL();

/**
 * Find the saved Authorization Code
 *
 * @param {String} key key string
 * @param {Function} cb will return the result if the code exists
 */
exports.find = function (key, cb) {

  db.connection.query("SELECT * FROM `authorization_request` " +
    "WHERE auth_code = '" + key + "'", function (err, result) {
    if (err) {
      cb(err);
    } else if (result) {
      cb(null, result);
    }
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

  db.connection.query('INSERT INTO `authorization_request` SET ?',
    newAuthCode, function (err, result) {
    if (err)
      cb(err);
    else if (result.affectedRows && result.affectedRows == 1)
      cb(null, true);
  });
};