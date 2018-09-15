const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/todoist', passport.authenticate('oauth2'))

router.get('/todoist/redirect', passport.authenticate('oauth2'),
  (req, res) => {
    res.redirect('/weekly-review')
  }
)

module.exports = router
