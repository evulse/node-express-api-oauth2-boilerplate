var MySQL = require('./../db/index').MySQL;
var db = new MySQL();

/**
 * Find client by record identifier.
 *
 * @param {String} clientID client identifier in UUID format
 * @param {Function} cb will return the result if the client exists
 */
exports.find = function (clientID, cb) {

  db.connection.query("SELECT * FROM `clients` " +
    "WHERE client_id = '" + clientID + "'",
    function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
    });
};

/**
 * Find client by client identifier
 *
 * @param {String} clientID client identifier in UUID format
 * @param {Function} cb callback function
 */
exports.findByClientId = function (clientID, cb) {

  db.connection.query("SELECT * FROM `clients` " +
    "WHERE client_id = '" + clientID + "'",
    function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
    });
};

exports.save = function (clientID, clientSecret, redirectURI, userID, cb) {

  var newClient = {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectURI,
    user_id: userID
  };

  db.connection.query('INSERT INTO `clients` SET ?',
    newClient, function (err, result) {
    if (err)
      cb(err);
    else
      cb(null, true);
  });
};