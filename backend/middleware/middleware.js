const jwt = require('jsonwebtoken')
const {
  superSecret
} = require('../config/config')
const {
  User
} = require('../models/user_model')

let authenticate = (req, res, next) => {
  let token = req.header("x-auth")
  let decoded;
  try {
    decoded = jwt.verify(token, superSecret)
    User.findOne({
      _id: decoded._id,
      "tokens.access": "auth",
      "tokens.token": token
    }).then((user) => {
      if (user) {
        req.user = user
        req.token = token
        next()
      } else {
        res.status(401).json("You are not authorized")
      }
    })
  } catch (e) {
    res.json(e)
  }
}

module.exports = {
  authenticate
}