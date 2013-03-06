/**
 * Utilities
 */

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
  // TODO verification link should be generated
  var verificationLink = 'http://sheltered-reef-5266.herokuapp.com/user/' +
    'verify/a94a8fe5ccb19ba61c4c08731391e987982fbbd3';

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
};