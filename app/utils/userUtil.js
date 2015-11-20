var User = require('../models/users');

module.exports = {
    userExists: function(params, callback) {
        User.findOne(params, function(err, user) {
            if(err) { return callback({success: false}); }

            if(typeof(user) === "undefined" || user === null) {
                return callback({success: true, exists: false});
            }

            return callback({success: true, exists: true});
        });
    }

}