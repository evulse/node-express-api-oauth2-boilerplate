
/**
 * Module dependencies.
 */

var
  express = require('express'),
  XMLWriter = require('xml-writer');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function () {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.errorHandler());
  app.use(app.router);
});

app.configure('testing', function () {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.errorHandler());
  app.use(app.router);
});

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function (req, res, next) {
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
  res.send({error: 'Not found'});
    return;
  }
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.
// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', {error: err});
});

app.get('/', function (request, response) {
  response.send('API BASE PATH');
});

// say api end points
// GET say
app.get('/say/:name.:format?', function (request, response) {

  var resourceType = request.params.format;
  var name = request.params.name;

  if (!name)
    response.json(400, {"message": "Required parameters should not be empty"});

  if (resourceType === 'json' || !resourceType) {
    response.json(200, {"name": name});
  } else if (resourceType === 'xml') {
    var xmlWriter = new XMLWriter();
    xmlWriter.startDocument()
      .startElement('ShippableResponse')
      .writeElement('name', name)
      .endDocument();

    response.set('Content-Type', 'application/xml');
    response.send(200, xmlWriter.toString());
  } else {
    response.json(406, {"message": "Unacceptable request"});
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Listening on " + port);
});