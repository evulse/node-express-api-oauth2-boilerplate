/**
 * Say route handlers
 */

var easyxml = require('easyxml');

exports.name = function (request, response) {

  var resourceType = request.params.format;
  var name = request.params.name;

  if (!name)
    response.json(400, {"message": "Required parameters should not be empty"});

  if (resourceType === 'json' || !resourceType) {
    response.json(200, {"name": name});
  } else if (resourceType === 'xml') {
    response.set('Content-Type', 'application/xml');
    response.send(200, easyxml.render({"name": name}));
  } else {
    response.json(406, {"message": "Unacceptable request"});
  }
};