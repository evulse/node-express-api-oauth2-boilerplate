/**
 * Utilities
 */

/**
 * Resource generator. Will return a JSON resource if the content-type is not
 * specified.
 *
 * @param {Object} res express response object
 * @param {Number} code http status code
 * @param {Object} resource resource in object format
 * @param {String} type resource content type [ json | xml ]
 */
exports.output = function (res, code, resource, type) {

  var easyxml = require('easyxml');

  switch (type) {
    case 'xml':
      res.set('Content-Type', 'application/xml');
      res.send(code, easyxml.render(resource));
      break;

    case undefined: // unspecified type will return json
    case 'json':
      res.json(code, resource);
      break;

    default:
      res.json(406, {"message": "Unacceptable request"});
  }
};

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = function (len) {

  var
    buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Retrun a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt (min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Send email verification link
 *
 * @param {String} email unverified email address
 * @param {Function} cb callback function
 */
exports.sendEmailVerification = function (email, cb) {

  var SendGrid = require('sendgrid').SendGrid;
  var sd = new SendGrid(process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD);

  if (email == null && email === '')
    cb(new Error('We need a valid email address to send email verification link'), null);

  if (email) {
    // send the email using Sendgrid
    sd.send({
      to: 'mike@evulse.com',
      from: 'boilerplate@evulse.com',
      subject: 'Hello world!',
      text: 'Sending email with SendGrid'
    }, function (success, message) {
      if (!success)
        cb(new Error(message), true);
      else if (success)
        cb(null, true);
    });
  }
};