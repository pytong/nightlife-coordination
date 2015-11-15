var yelp = require("node-yelp"),
    configAuth = require('../config/auth'),
    Business = require('../models/businesses'),
    client = yelp.createClient({
        oauth: {
            "consumer_key": configAuth.yelpAuth.consumerKey,
            "consumer_secret": configAuth.yelpAuth.consumerSecret,
            "token": configAuth.yelpAuth.token,
            "token_secret": configAuth.yelpAuth.tokenSecret
        },

        // Optional settings:
        httpClient: {
            maxSockets: 25  // ~> Default is 10
        }
    });

module.exports = {
    search: function(location, callback) {
        var businesses = [],
            business_ids = [],
            businessRsvpMap = {};

        client.search({
            term: "nightlife",
            location: location
        }).then(function (data) {

            data.businesses.forEach(function(business) {
                business_ids.push(business.id);

                businesses.push({
                    id: business.id,
                    name: business.name,
                    url: business.url,
                    description: business.snippet_text,
                    image_url: business.image_url
                });
            });

            Business.find({
                business_id: {$in: business_ids}
            }).
            select({ business_id: 1, usernames: 1 }).
            exec(function(err, rsvps) {
                rsvps.forEach(function(rsvp) {
                    businessRsvpMap[rsvp.business_id] = rsvp.usernames.length;
                });

                businesses.forEach(function(businessJson, index) {
                    if(typeof(businessRsvpMap[businessJson.id]) !== "undefined" && businessRsvpMap[businessJson.id] !== null) {
                        businesses[index].count = businessRsvpMap[businessJson.id];
                    } else {
                        businesses[index].count = 0;
                    }
                });
                console.log(businesses);
                callback(true, businesses);
            });

        }).catch(function (err) {
            if (err.type === yelp.errorTypes.areaTooLarge) {
                callback(false, "Area too large");
            } else if (err.type === yelp.errorTypes.unavailableForLocation) {
                callback(false, "No search results returned for location");
            }
        });
    }
}
