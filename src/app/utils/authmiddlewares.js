/**
 * Authentication middlewares
 */
var
  crypto = require('crypto'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  BasicStrategy = require('passport-http').BasicStrategy,
  ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy;

/**
 * Internal modules
 */
var models = require('./../models/index');

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a email and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy(
  function (email, password, cb) {
    password = crypto.createHash('sha1').update(password).digest('hex');

    models.users.findByEmail(email, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  models.users.find(id, function (err, user) {
    cb(err, user);
  });
});


/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
  function (email, password, cb) {
    models.clients.findByClientId(email, function (err, client) {
      if (err) {
        return cb(err);
      }
      if (!client) {
        return cb(null, false);
      }
      if (client.clientSecret != password) {
        return cb(null, false);
      }
      return cb(null, client);
    });
  }
));

passport.use(new ClientPasswordStrategy(
  function (clientId, clientSecret, cb) {
    models.clients.findByClientId(clientId, function (err, client) {
      if (err) {
        return cb(err);
      }
      if (!client) {
        return cb(null, false);
      }
      if (client.clientSecret != clientSecret) {
        return cb(null, false);
      }
      return cb(null, client);
    });
  }
));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
  function (accessToken, cb) {
    models.accessTokens.find(accessToken, function (err, token) {
      if (err) {
        return cb(err);
      }
      if (!token) {
        return cb(null, false);
      }

      models.users.find(token.userID, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        // to keep this example simple, restricted scopes are not implemented,
        // and this is just for illustrative purposes
        var info = {scope: '*'};
        cb(null, user, info);
      });
    });
  }
));