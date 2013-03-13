var users = [
  {id: '1', username: 'bob', password: 'secret', name: 'Bob Smith'},
  // special resource owner credentials for test purpose only
  {id: '2', username: 'joe', password: 'password', name: 'Joe Davis'}
];

exports.find = function (id, cb) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.id === id) {
      return cb(null, user);
    }
  }
  return cb(null, null);
};

exports.findByUsername = function (username, cb) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return cb(null, user);
    }
  }
  return cb(null, null);
};
