var Business = require('../models/businesses');

module.exports = {
    rsvp: function(business_id, username, callback) {
        Business.findOne({business_id: business_id}, function(err, business) {
            if(err) { return callback(false); }

            if(business.usernames.indexOf(username) >= 0) {
                business.usernames = business.usernames.filter(function(value) {
                   return value !== username;
                });
            } else {
                business.usernames.push(username);
            }

            business.markModified("usernames");
            business.save(function(err) {
                if(err) { return callback(false); }
                callback(true);
            });
        });
    }

};