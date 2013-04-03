/**
 * Module dependencies.
 */
var passport = require('passport');

var usersModel = require('./../models/users');
var utils = require('./../utils');

exports.info = [
  passport.authenticate('bearer', {session: false}),
  function (req, res) {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({
      user_id: req.user.id,
      name: req.user.name,
      scope: req.authInfo.scope
    });
  }
];

/**
 * Validate new user data
 * @param {Object} data new user data in JSON
 * @param {Function} cb callback function
 */
function validateNewUserData (data, cb) {

  if (data == null)
    cb(new Error('Data is undefined or empty'));

  if (data.hasOwnProperty('email') === false)
    cb(null, 'email_required');
  else if (data.hasOwnProperty('password') === false)
    cb(null, 'password_required');
  else if (data.hasOwnProperty('confirm_password') === false)
    cb(null, 'confirm_password_required');
  else if (data.password !== data.confirm_password) {
    cb(null, 'passwords_not_equal');
  }

  // check the email duplication
  usersModel.isAvailable(data.email,
    function (err, available) {
      if (err) {
        cb(err);
      } else if (err === null && available === false) {
        isValid = available;
        cb(null, isValid);
      } else if (err === null && available === true) {
        isValid = available;
        cb(null, isValid);
      }
    });
}

/**
 * Send email verification link
 *
 * @param {String}  params email params
 *                  params.to unverified email address
 *                  params.from set custom from email address
 *                  params.subject set custom email subject
 *                  params.text set custom email content
 * @param {Function} cb callback function
 */
exports.sendEmailVerification = function (params, cb) {

  var SendGrid = require('sendgrid').SendGrid;
  var sd = new SendGrid(process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD);

  if (params.to == null && params.to === '')
    cb(new Error('We need a valid email address to send email verification ' +
      'link'), null);

  var to = params.to;
  var subject = params.subject || 'Please verify the email address for ' +
    'your Express API Boilerplate Account';
  var from = params.from || 'boilerplate@evulse.com';

  // token is the email + milliseconds
  var unhashedToken = to + Date.now().toString();
  var crypto = require('crypto');
  var token = crypto.createHash('sha1').update(unhashedToken)
    .digest('hex');
  var verificationLink = 'http://sheltered-reef-5266.herokuapp.com/user/' +
    'verify/' + token;

  // save the token, than sent it afterward
  usersModel.saveVerificationToken(to, token, function (err, result) {
    if (err)
      cb(err);
    else if (result) {
      if (to) {
        sd.send({
          to: to,
          from: from,
          subject: subject,
          text: verificationLink
        }, function (success, message) {
          if (!success)
            cb(new Error(message), true);
          else if (success)
            cb(null, true);
        });
      }
    }
  });
};

/**
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
exports.create = function (req, res) {

  if (!req.is('application/json'))
    utils.output(res, 415,
      {"message": "New user data should be in JSON format."});

  var data = req.body;

  if (data)
    validateNewUserData(data, function (err, valid) {
      if (err) {
        utils.output(res, 500, {"message": err.toString()});
      } else if (valid === true) {
        // save new user data
        usersModel.save(data, function (err, userDoc) {
          if (err) {
            utils.output(res, 500, {"message": err.toString()});
          } else if ((typeof userDoc === 'object') && userDoc) {
            // send email verification link
            module.exports.sendEmailVerification({to: data.email},
            function (err, isSent) {
              if (err)
                utils.output(res, 500, {"message": err.toString()});
              else if (err === null && isSent === true)
                utils.output(res, 201, userDoc);
            });
          }
        });
      } else if (typeof valid === 'string') {
        utils.output(res, 400, {
          "message": "The request cannot be fulfilled due to bad syntax"});
      } else if (valid === false) {
        utils.output(res, 409, {"message": "User already exists"});
      }
    });
};