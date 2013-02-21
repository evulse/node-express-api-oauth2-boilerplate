/**
 * Say route handlers
 */

var easyxml = require('easyxml');
var utils = require('./../utils');

exports.name = function (request, response) {

  var resourceType = request.params.format;
  var name = request.params.name;

  if (!name)
    utils.generateResource(response, 400,
      {"message": "Required parameters should not be empty"}, resourceType);

  utils.generateResource(response, 200, {name: name}, resourceType);
};