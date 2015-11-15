'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Business = new Schema({
        business_id: String,
        usernames: Schema.Types.Mixed
    });

module.exports = mongoose.model('Business', Business);