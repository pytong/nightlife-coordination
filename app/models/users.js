'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	User = new Schema({
		username: String,
		password: String
	});

module.exports = mongoose.model('User', User);
