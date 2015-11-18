# Voting App

## Overview

This application allows you to create your own customized polls and share them with other people.

Features:

1. As an unauthenticated user, I can view all bars in my area.

2. As an authenticated user, I can add myself to a bar to indicate I am going there tonight.

3. As an authenticated user, I can remove myself from a bar if I no longer want to go there.

4. As an unauthenticated user, when I login I should not have to search again.

# Quick Start Guide

### Prerequisites

You must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup


### Setup Twitter Authentication

Pleas register the application with Twitter (https://apps.twitter.com) and get API keys / secrets.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
TWITTER_KEY=your-twitter-key-here
TWITTER_SECRET=your-twitter-secret-here
YELP_CONSUMER_KEY=your-yelp-consumer-key
YELP_CONSUMER_SECRET=your-yelp-consumer-secret
YELP_TOKEN=your-yelp-token
YELP_TOKEN_SECRET=your-yelp-token-secret
MONGO_URI=mongodb://localhost:27017/voting
APP_URL=https://voting-pytong.c9.io/
PORT=8080
```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!


## License

MIT License. [Click here for more information.](LICENSE.md)
