'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	User = new Schema({
		username: String,
		password: String,
		lastSearchTerms: String
	});

module.exports = mongoose.model('User', User);
