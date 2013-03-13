var codes = {
  // special authorization code for test purpose only
  sbo2fs3gpHVQWjcE: {
    clientID: '999',
    redirectURI: 'http://localhost:5000/test/callback',
    userID: '2'
  }
};
exports.find = function (key, cb) {
  var code = codes[key];
  return cb(null, code);
};

exports.save = function (code, clientID, redirectURI, userID, cb) {
  codes[code] = {clientID: clientID, redirectURI: redirectURI, userID: userID};
  return cb(null);
};
