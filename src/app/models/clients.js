var MySQL = require('./../db/index').MySQL;
var db = new MySQL();

/**
 * Find client by record identifier.
 *
 * @param {String} id record identifier
 * @param {Function} cb callback function
 *
 */
exports.find = function (id, cb) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return cb(null, client);
    }
  }
  return cb(null, null);
};

/**
 * Find client by client identifier
 *
 * @param {String} clientId client identifier in UUID format
 * @param {Function} cb callback function
 */
exports.findByClientId = function (clientId, cb) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.clientId === clientId) {
      return cb(null, client);
    }
  }
  return cb(null, null);
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