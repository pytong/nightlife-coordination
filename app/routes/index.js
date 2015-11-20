'use strict';

var path = process.cwd(),
	searchUtil = require("../utils/searchUtil"),
	rsvpUtil = require("../utils/rsvpUtil"),
	userUtil = require("../utils/userUtil");


module.exports = function (app, passport) {

	app.route('/api/rsvp')
		.post(function(req, res) {
			var business_id = req.query.business_id,
				username;

			if(req.isAuthenticated()) {
				username = req.user.username ? req.user.username : req.user.twitter.username;
				rsvpUtil.rsvp(business_id, username, function(success, message) {
					res.json({success: success, message: message});
				});
			} else {
				res.json({success: false, message: "You are not authenticated."});
			}
		})
		.get(function(req, res) {
			var business_id = req.query.business_id;

			rsvpUtil.getRsvp(business_id, function(success, result) {
				if(success === true) {
					res.json({success: true, count: result});
				} else {
					res.json({success: false, message: result});
				}
			});
		});

	app.get('/api/search', function(req, res) {
		var location = req.query.location;

		if(req.isAuthenticated()) {
			req.user.lastSearchTerms = location;
			req.user.save();
		}

		searchUtil.search(location, function(success, result) {
			res.json({success: success, result: result})
		});
	});

	app.get('/api/users/profile', function(req, res) {
			if(req.isAuthenticated()) {
				res.json({success: true, profile: req.user});
			} else {
				res.json({success: false});
			}
		});

	app.get('/api/users/email_exists', function(req, res) {
		var username = req.query.username;
		userUtil.userExists({username: username}, function(result) {
			var success = result.success,
				exists = result.exists;

			if(success === true && exists === false) {
				res.json({exists: false});
			} else {
				res.json({exists: true});
			}
		});
	})

	app.get('/api/users/login_status', function(req, res) {
		var status = req.isAuthenticated();
		res.json({status: status});
	});

	app.get('/api/users/signin', passport.authenticate('local-signin'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/signup-submit', passport.authenticate('local-signup'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/logout', function (req, res) {
		req.logout();
		res.json({success: true});
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/#/signin' }),
		function(req, res) {
			res.redirect('/#/account');
		});

	app.get("*", function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
