/**
 * Say route handlers
 */

var easyxml = require('easyxml');
var utils = require('./../utils');

exports.name = function (request, response) {

  var resourceType = request.params.format;
  var name = request.params.name;

  if (!name)
    response.json(400, {"message": "Required parameters should not be empty"});

  utils.generateResource(response, {
    statusCode: 200,
    resource: {
      name: name
    },
    type: resourceType
  });
};