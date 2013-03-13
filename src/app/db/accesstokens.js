var tokens = {
  // special access tokens for test purpose only
  '0fpDaM01fd6LXl1uXiLHZYIpC3BLNJe9PoVadrB2Pt5HX8LHJUKSPGA1iE0zEcWR6r8Xs3wsSIn5U9wD8DIrZ2iqUYVzyyyg5OvO5B6oFDMJfIUCM2E0H2n4E5sC207ytKzYZ8yElVWNas5boNtu02hSL3kqDeoFDGWzZSUSmMfYlXa29uFeUyAtUY0aDHWgAMIWSnW10X7hxHlFYup9GhjTgAT8iRwXU8EaHYFqGtMG05Zu21OfEKRyF1X3zpw1': {
    userID: '2',
    clientID: '999'
  }
};

exports.find = function (key, done) {
  var token = tokens[key];
  return done(null, token);
};

exports.save = function (token, userID, clientID, done) {
  tokens[token] = {userID: userID, clientID: clientID};
  console.log('tokens', tokens);
  return done(null);
};
