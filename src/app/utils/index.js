/**
 * Utilities
 */

/**
 * Resource generator
 *
 * @param {Object} response express response object
 * @param {Number} statusCode
 * @param {Object} resource resource in object format
 * @param {String} type resource content type [ json | xml ]
 */
exports.output = function (response, statusCode, resource, type) {

  var easyxml = require('easyxml');

  switch (type) {
    case 'xml':
      response.set('Content-Type', 'application/xml');
      response.send(statusCode, easyxml.render(resource));
      break;

    case undefined: // unspecified type will return json
    case 'json':
      response.json(statusCode, resource);
      break;

    default:
      response.json(406, {"message": "Unacceptable request"});
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