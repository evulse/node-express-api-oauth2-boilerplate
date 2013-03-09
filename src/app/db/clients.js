var clients = [
  {
    id: '1',
    name: 'Pertamax Client',
    clientId: '48c907b0-b8ac-4161-84c9-4fbf1030b5da',
    clientSecret: '48c907b0-dc38-475c-a9c4-4a2e1030b5da'
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