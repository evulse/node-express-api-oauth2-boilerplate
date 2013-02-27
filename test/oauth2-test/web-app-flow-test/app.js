
/**
 * Module dependencies.
 */

var express = require('express')
  , User = require('./users')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var app = express();

passport.use('provider', new OAuth2Strategy({
  authorizationURL: 'http://localhost:5000/dialog/authorize',
  tokenURL: 'http://localhost:5000/oauth/token',
  clientID: 'abc123',
  clientSecret: 'ssh-secret',
  callbackURL: 'http://localhost:3000/auth/provider/callback'
},
function (accessToken, refreshToken, profile, done) {
  User.save(accessToken, function (err, user) {
    console.log('err', err);
    if (err) {
      return done(err);
    }

    return done(null, user);
  });
}
));

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'keyboard cat'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

passport.serializeUser(function (user, done) {
  done(null, user.userID);
});

passport.deserializeUser(function (token, done) {
  done(null, {userID: 1, clientID: 1});
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', function (request, response) {
  response.render('index');
});

app.get('/home', function (request, response) {
  response.send('home');
});

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider', {scope: '*'}));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
// http://localhost:5000/dialog/authorize?
// redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fprovider%2Fcallback&
// client_id=abc123&
// response_type=code&
// scope=*&
// type=web_server
app.get('/auth/provider/callback',
  passport.authenticate('provider', {successRedirect: '/home',
  failureRedirect: '/login'}));

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
