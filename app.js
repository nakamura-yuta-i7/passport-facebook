var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// // view engine setup
void function viewEngineSetup() {
	// app.set('views', path.join(__dirname, 'views'));
	// app.set('view engine', 'jade');
	// HTML engine sample :
	
	var cons = require('consolidate');
	app.engine('html', cons.swig);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'html');
}();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
var passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	var users = testDb.users;
	users.findOrCreate({
		where: {
			passport_id: id,
		},
		defaults: {
			passport_id: id,
			passport_service: "facebook",
		}
	}).spread(function(user) {
		console.log("user", user);
		done(err, user.dataValues);
	}).catch(function(err) {
		console.log( "ERROR", err );
		done(err, null);
	});
});


var FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: "1684093021870190",
    clientSecret: "c2cf07be3ffe4ec31133a239983aca46",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    testDb.users.findOrCreate({ passport_id: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.use("/upsert", require("./routes/upsert"));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/', routes);
app.use('/users', users);


global.testDb = require("./models/testDb");



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
