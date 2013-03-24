/**
 * Say route handlers
 */

var
  passport = require('passport'),
  easyxml = require('easyxml'),
  utils = require('./../utils');

exports.name = [
  passport.authenticate('bearer', {session: false}),
  function (request, response) {
    var resourceType = request.params.format;
    var name = request.params.name;

    if (!name)
      utils.output(response, 400, {
        "message": "Required parameters should not be empty"}, resourceType);

    utils.output(response, 200, {name: name}, resourceType);
  }];