
/**
 * Module dependencies.
 */

var
  path = require('path'),
  express = require('express'),
  passport = require('passport'),
  mysql = require('mysql');

/**
 * Internal dependencies
 */
var db = require('./db/index').MySQL;

var app = module.exports = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  // be sure to use express.session() before passport.session() to ensure that
  // the login session is restored in the correct order.
  app.use(express.session({
    secret: '5ea05ea4d3b392e4ebc1854a74738f54dad4a003'})
    );
  // middleware is required to initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

app.configure('development', function () {
  app.use(express.errorHandler({dumpException: true, showStack: true}));
});

app.configure('testing', function () {
  app.use(express.errorHandler({dumpException: true, showStack: true}));
});

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H 'Accept: application/json'
// $ curl http://localhost:3000/notfound -H 'Accept: text/plain'

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

// Load Passport auth middlewares
require('./utils/authmiddlewares');

var
  sayRoute = require('./routes/say'),
  mainRoute = require('./routes/main'),
  userRoute = require('./routes/user'),
  oAuth2Route = require('./routes/oauth2');

app.get('/', function (request, response) {
  response.send('API BASE PATH');
});

// say api end points
// GET say
app.get('/say/:name.:format?', sayRoute.name);

// user api end points
app.post('/user/create', userRoute.create);

app.get('/login', mainRoute.loginForm);
app.post('/login', mainRoute.login);
app.get('/logout', mainRoute.logout);
app.get('/account', mainRoute.account);

app.get('/dialog/authorize', oAuth2Route.authorization);
app.post('/dialog/authorize/decision', oAuth2Route.decision);
app.post('/oauth/token', oAuth2Route.token);

// Special end points for test purpose only
app.get('/test/callback', function (req, res) {
  console.log('req.query', req.query);
  res.send(req.query);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Listening on port %d in %s mode', port, app.settings.env);
});