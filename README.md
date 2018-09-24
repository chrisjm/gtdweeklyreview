# Todoist Weekly Review

This app provides a way to connect with a Todoist account and output the completed items in the last 7 days grouped by day. The main purpose was to assist with Weekly Reviews, ala the Getting Things Done productivity methodology.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node.js
* MongoDB Database
  - Stores your Todoist ID, name, email, avatar, premium status, and some project info
* [Todoist App](https://developer.todoist.com/appconsole.html)
  - "OAuth redirect URL" => e.g. `http://localhost:3000/auth/todoist/redirect`

### Installing

Install dependencies

```
npm install
```

Create local `.env` file and enter in necessary info:

```bash
# .env
COOKIE_SESSION_KEY='some-unique-key' # i.e., a salt or nonce to help secure the session ID and use between sites
MONGODB_URI='mongodb://username:password@server:port/database'
PASSPORT_CLIENT_ID='todoist-client-id' # See Todoist App Managment Console
PASSPORT_CLIENT_SECRET='todoist-client-secret' # See Todoist App Managment Console
RAVEN_DSN='https://xxxxx@sentry.io/xxxxxx' # Debug info via sentry.io
```

Run the server

```
npm start
```

Browse to the local server `http://localhost:3000`


## Running the tests

To be added...

## Deployment

### Now.sh

Install the [now CLI](https://zeit.co/now)

```
npm install -g now
```

Creating a local `now.json` file.

```json
// now.json
{
  "env": {
    "COOKIE_SESSION_KEY": "some-unique-key",
    "MONGODB_URI": "mongodb://username:password@server:port/database",
    "PASSPORT_CLIENT_ID": "todoist-client-id",
    "PASSPORT_CLIENT_SECRET": "todoist-client-secret",
    "RAVEN_DSN": "https://xxxxx@sentry.io/xxxxxx"
  }
}
```

And deploy

```
now
```

## Built With

* [cookie-session](https://github.com/expressjs/cookie-session) - Cookie-based session middleware
* [Express.js](https://expressjs.com/) - Backend framework
* [date-fns](https://date-fns.org/) - Date manipulation
* [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
* [ejs](http://ejs.co/) - View template engine
* [lodash](https://lodash.com/) - Utility library
* [Mongoose](https://mongoosejs.com/) - MongoDB ORM
* [Passport.js](http://www.passportjs.org/) + [OAuth2 strategy](https://github.com/jaredhanson/passport-oauth2) - Authentication
* [request](https://github.com/request/request) - HTTP request client
* [Sentry](https://sentry.io/) - Error event tracking

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/chrisjm/gtdweeklyreview/tags).

## Authors

* **Chris J Mears** - *Initial work* - [chrisjm](https://github.com/chrisjm)

See also the list of [contributors](https://github.com/chrisjm/gtdweeklyreview/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to [David Allen and Getting Things Done](https://gettingthingsdone.com/). It's helped my productivity since 2005.
* And of course a big thank you to [Todoist](https://www.todoist.com/) for a great app.
