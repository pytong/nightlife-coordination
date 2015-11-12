'use strict';

var TwitterStrategy = require('passport-twitter').Strategy,
	LocalStrategy = require('passport-local').Strategy,
    TwitterUser = require('../models/twitterUsers'),
    bcrypt = require('bcryptjs'),
    User = require('../models/users'),
    configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		TwitterUser.findById(id, function (err, user) {
			if (err) { return done(err); }

			if(user) {
				done(err, user);
			} else {
				User.findById(id, function(err, user) {
					if(err) { return done(err); }
					done(err, user);
				});
			}
		});
	});

	passport.use('twitter', new TwitterStrategy({
			consumerKey: configAuth.twitterAuth.consumerKey,
			consumerSecret: configAuth.twitterAuth.consumerSecret,
			callbackURL: configAuth.twitterAuth.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			TwitterUser.findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) { return done(err); }

				if (user) {
					return done(null, user);
				} else {
					var newUser = new TwitterUser();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.name = profile.displayName;

					newUser.save(function (err) {
						if (err) { return done(err); }

						return done(null, newUser);
					});
				}
			});
		}
	));
	
	passport.use('local-signup', new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done) {
			var newUser = new User();

			newUser.username = username;
			newUser.password = bcrypt.hashSync(password, 8);

			newUser.save(function (err) {
				if (err) { return done(err); }

				return done(null, newUser);
			});
		}
	));

    passport.use('local-signin', new LocalStrategy(
	    function(username, password, done) {
	        User.findOne({ username: username }, function(err, user) {
		        if (err) { return done(err); }

		        if (!user) {
		            return done(null, false, { message: 'Unknown user ' + username });
		        }

		        if (bcrypt.compareSync(password, user.password) === false) {
		            return done(null, false, { message: 'Invalid password' });
		        }
		        return done(null, user);
		    });
	    }
	));
};
