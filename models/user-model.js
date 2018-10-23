const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  access_token: String,
  avatar_big: String,
  avatar_medium: String,
  email: String,
  full_name: String,
  projects: [
    {
      id: Number,
      name: String,
      color: Number,
    },
  ],
  todoist_id: Number,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
