var db = require('./../db/index').MySQL;
var connection = db.getConnection();

/**
 * Find client by client identifier
 *
 * @param {String} clientID client identifier in UUID format
 * @param {Function} cb callback function
 */
exports.findByClientId = function (clientID, cb) {

  connection.query("SELECT * FROM `clients` " +
    "WHERE client_id = '" + clientID + "'",
    function (err, result) {
      if (err) {
        cb(err);
      } else if (result[0]) {
        cb(null, {
          clientID: result[0].client_id,
          clientSecret: result[0].client_secret,
          redirectURI: result[0].redirect_uri,
          userID: result[0].user_id
        });
      }
    });

};

exports.save = function (clientID, clientSecret, redirectURI, userID, cb) {

  var newClient = {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectURI,
    user_id: userID
  };

  connection.query('INSERT INTO `clients` SET ?',
    newClient, function (err, result) {
    if (err)
      cb(err);
    else if (result.affectedRows && result.affectedRows == 1)
      cb(null, true);
  });
};