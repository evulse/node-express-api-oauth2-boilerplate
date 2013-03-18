var clients = [
  // special client credentials for test purpose only
  {
    id: '999',
    name: 'Test',
    clientId: 'c67f0160-7aad-4aa5-8a88-92bbd6f02a4c',
    clientSecret: '8638be31-2f91-479d-924a-3742feb17443'
  }
];

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