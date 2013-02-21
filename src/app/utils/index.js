/**
 * Utilities
 */

/**
 * Resource generator
 *
 * @param {Object} response express response object
 * @param {Object} data resource data
 */
exports.generateResource = function (response, data) {

  var statusCode = data.statusCode;
  var resource = data.resource;
  var type = data.type;
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