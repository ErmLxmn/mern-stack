const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const protect = asyncHandler(async function (req, res, next) {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get token
      token = req.headers.authorization.split(' ')[1]

      //verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //get user
      let user = await User.findById(decoded.id).select('-password')

      req.user = user
      next()
    } catch (error) {
      res.json('Invalid token')
    }
  }
})

module.exports = { protect }
