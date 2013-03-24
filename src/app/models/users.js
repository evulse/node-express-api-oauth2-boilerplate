var MySQL = require('./../db/index').MySQL;
var db = new MySQL();

exports.find = function (userID, cb) {

  db.connection.query("SELECT * FROM `users` " +
    "WHERE id = '" + userID + "'",
    function (err, result) {
      if (err) {
        cb(err);
      }
      else if (result) {
        for (var i = 0, len = result.length; i < len; i++) {
          var user = result[i];
          if (user.id === userID) {
            return cb(null, user);
          }
        }

        return cb(null, null);
      }
    });
};

exports.findByEmail = function (email, cb) {

  db.connection.query("SELECT * FROM `users` " +
    "WHERE id = '" + userID + "'",
    function (err, result) {
      if (err) {
        cb(err);
      }
      else if (result) {
        for (var i = 0, len = result.length; i < len; i++) {
          var user = result[i];
          if (user.username === email) {
            return cb(null, user);
          }
        }
        return cb(null, null);
      }
    });
};

exports.save = function (email, password, confirmPassword, firstName, lastName,
  fullName, verified) {

  var newUser = {
    email: email,
    password: password,
    confirm_password: confirmPassword,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    verified: verified
  };

  db.connection.query('INSERT INTO `users` SET ?', newUser,
    function (err, result) {
      if (err)
        cb(err);
      else
        cb(null, true);
    });
};