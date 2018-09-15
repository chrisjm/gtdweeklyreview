const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  todoist_id: Number,
  email: String,
  full_name: String,
  karma: Number,
  access_token: String,
  avatar_s640: String,
  avatar_big: String,
  avatar_medium: String,
  projects: [
    {
      id: Number,
      name: String,
      color: Number
    }
  ],
  tz_info: {
    timezone: String,
    gmt_string: String
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User
