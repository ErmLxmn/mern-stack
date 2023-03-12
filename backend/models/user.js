const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    role: {
      type: String,
      required: [true, 'Please choose a role'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
