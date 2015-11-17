var Business = require('../models/businesses');

module.exports = {
    rsvp: function(business_id, username, callback) {
        Business.findOne({business_id: business_id}, function(err, business) {
            if(err) { return callback(false, "Failed to find business. Please try again later."); }

            if(typeof(business) !== "undefined" && business !== null) {
                if(business.usernames.indexOf(username) >= 0) {
                    business.usernames = business.usernames.filter(function(value) {
                       return value !== username;
                    });
                } else {
                    business.usernames.push(username);
                }
                business.markModified("usernames");
            } else {
                business = new Business();
                business.business_id = business_id;
                business.usernames = [username];
            }

            business.save(function(err) {
                if(err) { return callback(false, "Failed to RSVP. Please try again later."); }
                callback(true);
            });
        });
    },

    getRsvp: function(business_id, callback) {
        Business.findOne({business_id: business_id}, function(err, business) {
            if(err) { return callback(false, "Failed to get total RSVP. PLease try again later."); }

            if(typeof(business) !== "undefined" && business !== null && typeof(business.usernames) !== "undefined" && business.usernames !== null) {
                callback(true, business.usernames.length);
            } else {
                callback(true, 0);
            }
        });
    }

};