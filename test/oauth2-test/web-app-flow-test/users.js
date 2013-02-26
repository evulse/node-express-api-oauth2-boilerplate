var users = {};

exports.find = function(key, done) {
  console.log('key', key);
  var token = users[key];
  return done(null, token);
};

exports.save = function(token, done) {
  console.log('token', token);
  users[token] = { userID: 1, clientID: 1 };
  console.log(users[token]);
  return done(null, users[token]);
};
