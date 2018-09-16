require('dotenv').config()

const Raven = require('raven')
Raven.config(process.env.RAVEN_DSN).install();

const express = require('express')
const request = require('request')
const _ = require('lodash')

// Routes
const authRoutes = require('./routes/auth-routes')

// Authentication and Session
const cookieSession = require('cookie-session')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')

// Database
const mongoose = require('mongoose')

// Date Helpers
const dateFormat = require('date-fns/format')
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now')
const subWeeks = require('date-fns/sub_weeks')

// View Helpers
const colors = require('./config/colors')

// Middleware
const authCheck = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

const app = express()

// NB: This request handler must be the first middleware on the app
app.use(Raven.requestHandler());

// View Engine
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB")
})

app.use(cookieSession({
  maxAge: 86400000, // 1 day in ms
  keys: [process.env.COOKIE_SESSION_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

// Auth routes
app.use('/auth', authRoutes)

// Home Page
app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

// Weekly Review Page
app.get('/weekly-review', authCheck, (req, res) => {
  const user = req.user
  let completedItems = []
  let groupedCompletedItems = []
  const sevenDaysAgo = subWeeks(new Date(), 1)

  // Get all completed activity events in the last seven days
  request(
    {
      url: 'https://todoist.com/api/v7/activity/get',
      qs: { token: user.access_token, event_type: 'completed', since: sevenDaysAgo, limit: 100 }
    },
    function (error, response, body) {
      if (response.statusCode === 200) {
        completedItems = JSON.parse(body)
        groupedCompletedItems = _.groupBy(completedItems, (event) => {
          return dateFormat(new Date(event.event_date), 'dddd, MMMM Do, YYYY')
        })
      }
      res.render(
        'weekly-review',
        {
          user: user,
          completedItems: completedItems,
          groupedCompletedItems: groupedCompletedItems,
          colors: colors,
          dateFormat: dateFormat,
          distanceInWordsToNow: distanceInWordsToNow
        }
      )
    }
  )
})

// Error Handler
// NB: Fallthrough error handlers after this one
app.use(Raven.errorHandler());

app.listen(3000, () => {
  console.log('Now listening on http://localhost:3000')
})
