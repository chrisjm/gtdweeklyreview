const passport = require('passport')
const Oauth2Strategy = require('passport-oauth2')
const request = require('request')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(new Oauth2Strategy({
  authorizationURL: 'https://todoist.com/oauth/authorize',
  tokenURL: 'https://todoist.com/oauth/access_token',
  clientID: process.env.PASSPORT_CLIENT_ID,
  clientSecret: process.env.PASSPORT_CLIENT_SECRET,
  callbackURL: '/auth/todoist/redirect',
  scope: 'data:read'
}, (accessToken, refreshToken, profile, done) => {
  // NB: A Todoist profile isn't returned, so we need to request one
  request(
    {
      url: 'https://todoist.com/api/v7/sync',
      qs: { token: accessToken, sync_token: '*', resource_types: '["user", "projects"]' }
    },
    function (error, response, body) {
      const todoistSyncData = JSON.parse(body)
      const todoistUser = todoistSyncData.user
      const todoistProjects = todoistSyncData.projects

      User.findOne({todoist_id: todoistUser.id}).then((currentUser) => {
        if (currentUser) {
          currentUser.set({
            todoist_id: todoistUser.id,
            email: todoistUser.email,
            full_name: todoistUser.full_name,
            avatar_big: todoistUser.avatar_big,
            avatar_medium: todoistUser.avatar_medium,
            avatar_s640: todoistUser.avatar_s640,
            tz_info: {
              timezone: todoistUser.tz_info.timezone,
              gmt_string: todoistUser.tz_info.gmt_string
            },
            projects: todoistProjects,
            karma: todoistUser.karma,
            access_token: accessToken
          })
          currentUser.save()
          done(error, currentUser)
        } else {
          new User({
            todoist_id: todoistUser.id,
            email: todoistUser.email,
            full_name: todoistUser.full_name,
            avatar_big: todoistUser.avatar_big,
            avatar_medium: todoistUser.avatar_medium,
            avatar_small: todoistUser.avatar_small,
            avatar_s640: todoistUser.avatar_s640,
            tz_info: {
              timezone: todoistUser.tz_info.timezone,
              gmt_string: todoistUser.tz_info.gmt_string
            },
            projects: todoistProjects,
            karma: todoistUser.karma,
            access_token: accessToken
          }).save().then((newUser) => {
            done(error, newUser)
          })
        }
      })
    }
  )
}))
