/*
 * User model
 */

var UserModel = function () {
  var MySQL = require('./../db/index').MySQL;
  this.db = new MySQL();
};

/**
 * Check user availability using email
 *
 * @param {String} email valid email address
 * @param {Function} cb callback function
 */
UserModel.prototype.isAvailable = function (email, cb) {

  if (email == null)
    cb(null, 'email_required');

  var self = this;

  self.db.connection.query("SELECT * FROM users WHERE email = '" + email + "'",
    function (err, result) {
      if (err)
        cb(err);
      else if (!result.length)
        cb(null, true);
      else if (result.length >= 1 && (result[0].email === email))
        cb(null, false);
    });
};

/**
 * @param {Object} data new user data
 * @param {Function} cb callback function
 */
UserModel.prototype.save = function (data, cb) {

  if (data == null)
    cb(new Error('User is undefined or empty'), null);

  var self = this;

  var newUser = {
    id: 'a2bf9b0f-198f-4df5-a396-590a007785bd',
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    name: data.name,
    password: data.password,
    confirm_password: data.confirm_password,
    verified: 0
  };

  self.db.connection.query('INSERT INTO users SET ?', newUser,
    function (err, result) {
      if (err)
        cb(err);
      else if (result.affectedRows && result.affectedRows == 1)
        cb(null, newUser);
    });
};

exports.UserModel = UserModel;

