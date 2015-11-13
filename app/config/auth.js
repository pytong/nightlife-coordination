'use strict';

module.exports = {
	'twitterAuth': {
		'consumerKey': process.env.TWITTER_KEY,
		'consumerSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
    'yelpAuth': {
        'consumerKey': process.env.YELP_CONSUMER_KEY,
        'consumerSecret': process.env.YELP_CONSUMER_SECRET,
        'token': process.env.YELP_TOKEN,
        'tokenSecret': process.env.YELP_TOKEN_SECRET
    }
};
