/**
 * Module dependencies.
 */
var passport = require('passport');

var UserModel = require('./../models').UserModel;
var utils = require('./../utils');

exports.info = [
  passport.authenticate('bearer', {session: false}),
  function (req, res) {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({user_id: req.user.id, name: req.user.name, scope: req.authInfo.scope});
  }
];

/**
 * Validate new user data
 * @param {Object} data new user data in JSON
 * @param {Function} cb callback function
 */
function validateNewUserData (data, cb) {

  var isValid = false;

  if (data == null)
    cb(new Error('Data is undefined or empty'));

  // check if the required fields exist
  isValid = (data.hasOwnProperty('email') &&
    data.hasOwnProperty('password') &&
    data.hasOwnProperty('confirm_password'));

  // check if the optional fields exists
  isValid = ((data.hasOwnProperty('first_name') ||
    data.hasOwnProperty('last_name')) ||
    data.hasOwnProperty('name') || true);

  // check if the passwords equal
  var isValid = (data.password === data.confirm_password);

  // check the email duplication
  UserModel.isAvailable(data.email,
    function (err, result) {
      if (err) {
        cb(err, null);
      } else if (err === null && result === false) {
        isValid = result;
        cb(err, isValid);
      } else if (err === null && result === true) {
        isValid = result;
        cb(err, isValid);
      }
    });
}

/**
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
exports.create = function (req, res) {

  if (!req.is('application/json'))
    utils.output(res, 415, {"message": "New user data should be in JSON format."});

  var data = req.body;

  validateNewUserData(data, function (err, result) {
    if (err) {
      utils.output(res, 500, {"message": err.toString()});
    } else if (result === true) {
      // save new user data
      UserModel.save(data, function (err, userDoc) {
        if (err) {
          utils.output(res, 500, {"message": err.toString()});
        } else if ((typeof userDoc === 'object') && userDoc) {
          // send email verification link
          utils.sendEmailVerification(data.email, function (err, isSent) {
            if (err)
              utils.output(res, 500, {"message": err.toString()});
            else if (err === null && isSent === true)
              utils.output(res, 201, userDoc);
          });
        }
      });
    }
  });
};