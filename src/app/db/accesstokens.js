var tokens = {};

exports.find = function(key, done) {
  console.log('key', key);
  var token = tokens[key];
  return done(null, token);
};

exports.save = function(token, userID, clientID, done) {
  console.log('token, userID, clientID, done', token, userID, clientID, done);
  tokens[token] = { userID: userID, clientID: clientID };
  return done(null);
};
