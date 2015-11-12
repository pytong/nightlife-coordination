'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwitterUser = new Schema({
	twitter: {
		id: String,
		name: String,
		username: String
	}
});

module.exports = mongoose.model('TwitterUser', TwitterUser);
