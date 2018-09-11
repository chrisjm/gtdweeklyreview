const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  // Handle with Passport.js
  res.send('logging out')
})

router.get('/oauth2', (req, res) => {
  // Handle with Passport.js
  res.send('logging in with OAuth2')
})

module.exports = router
