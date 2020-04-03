const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'This email is already in use.'
      })
    }
    res.send({
      message: `Hello ${req.body.email}! Your user was registered!`
    })
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // console.log('user', user.toJSON())
      if (!user) {
        return res.status(403).send({
          error: 'The user does not match.'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      console.log('isPasswordValid:', isPasswordValid)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password does not match.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error occured while logging in.'
      })
    }
  }
}
