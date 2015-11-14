'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	TwitterUser = new Schema({
		twitter: {
			id: String,
			name: String,
			username: String
		}
	});

module.exports = mongoose.model('TwitterUser', TwitterUser);
