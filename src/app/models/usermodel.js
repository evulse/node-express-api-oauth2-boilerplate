/*
 * User model
 */

// fake user database
var users = [
  {
    "id": 1,
    "email": "test@test.com",
    "first_name": "Test first name",
    "last_name": "Test Last name",
    "name": "Test full name",
    "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "verified": false
  },
  {
    "id": 2,
    "email": "mike@evulse.com",
    "first_name": "Mike",
    "last_name": "Angell",
    "name": "Mike Angell",
    "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "verified": true
  },
  {
    "id": 3,
    "email": "muhammadghazali@gmail.com",
    "first_name": "Muhammad",
    "last_name": "Ghazali",
    "name": "Muhammad Ghazali",
    "password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "confirm_password": "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
    "verified": false
  }
];

var User = function () {

};

/**
 * Check user availability using email
 *
 * @param {String} email valid email address
 * @param {Function} cb callback function
 */
User.prototype.isAvailable = function (email, cb) {

  if (email == null)
    cb(new Error('Email address is undefined or empty'));

  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === email) {
      cb(null, false);
    }
  }

  // return true
  cb(null, true);
};

/**
 * @param {Object} data new user data
 * @param {Function} cb callback function
 */
User.prototype.save = function (data, cb) {

  if (data == null)
    cb(new Error('User is undefined or empty'), null);

  data.id = users.length + 1;
  data.verified = false;

  users.push(data);

  cb(null, data);
};

exports.UserModel = User;

