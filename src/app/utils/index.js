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
exports.generateResource = function (response, statusCode, resource, type) {

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