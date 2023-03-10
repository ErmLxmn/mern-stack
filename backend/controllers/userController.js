const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getCurrentUser = asyncHandler(async function (req, res) {
  res.json({ currentUser: { username: req.user.username, id: req.user.id } })
})

const loginUser = asyncHandler(async function (req, res) {
  const isExist = await User.exists({ username: req.body.username })

  if (!isExist) {
    return res.json({ message: 'username does not exist' })
  }

  const user = await User.findOne({ username: req.body.username })

  res.json(
    user && (await bcrypt.compare(req.body.password, user.password))
      ? {
          username: user.username,
          id: user._id,
          message: 'Success',
          token: generateToken({ id: user._id, username: user.username }),
        }
      : { message: 'Invalid credentials' }
  )
})

const registerUser = asyncHandler(async function (req, res) {
  const isExist = await User.exists({ username: req.body.username })

  if (isExist) {
    return res.json({ message: 'username already exist' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = await User.create({
    username: req.body.username,
    password: hashPassword,
  })

  res.json(
    user
      ? {
          username: user.username,
          id: user._id,
          message: 'Success',
          token: generateToken({ id: user._id, username: user.username }),
        }
      : { message: 'Failed' }
  )
})

//Generate token
function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '90d' })
}

module.exports = {
  registerUser,
  getCurrentUser,
  loginUser,
}
