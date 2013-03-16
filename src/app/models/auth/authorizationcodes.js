var MySQL = require('./../../db/index').MySQL;
var db = new MySQL();

exports.find = function (key, cb) {
  var code = codes[key];
  return cb(null, code);
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

  db.connect(function (err, connection) {
    connection.query('INSERT INTO authorization_codes SET ?',
      newAuthCode, function (err, result) {
      if (err)
        cb(err);
      else if (result.affectedRows && result.affectedRows == 1)
        cb(null, result);
    });
  });
};