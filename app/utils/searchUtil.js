var yelp = require("node-yelp"),
    configAuth = require('../config/auth'),
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
        var businesses = [];

        client.search({
            term: "nightlife",
            location: location
        }).then(function (data) {
            data.businesses.forEach(function(business) {
                businesses.push({
                    id: business.id,
                    name: business.name,
                    url: business.url,
                    description: business.snippet_text,
                    image_url: business.image_url
                });
            });
            callback(true, businesses);
        }).catch(function (err) {
            if (err.type === yelp.errorTypes.areaTooLarge) {
                callback(false, "Area too large");
            } else if (err.type === yelp.errorTypes.unavailableForLocation) {
                callback(false, "No search results returned for location");
            }
        });
    }
}
