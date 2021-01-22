const { User } = require('../models')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
// Login Route - Creates a session
let loginFailedCounter = 0
router.post('/users/login', (req, res) => {
  let lowCaseUName = req.body.username.toLowerCase()
  User.authenticate()(lowCaseUName, req.body.password, (err, user) => {
    if (err) res.json(err)
    if (!user && loginFailedCounter < 3) {
      loginFailedCounter++
      res.json({
        name: 'LoginFailedError',
        message: 'Login failed, please try again.',
        isLoggedIn: false,
      })
    }
    if (!user && loginFailedCounter >= 3) {
      loginFailedCounter++
      res.json({
        name: 'MultipleFailedError',
        message: 'Login failed, please reset your password.',
        isLoggedIn: false,
      })
    }
    if (user) {
      loginFailedCounter = 0
      res.json({
        isLoggedIn: !!user,
        user: user,
        token: jwt.sign({ id: user._id }, process.env.SECRET),
      })
    }
  })
})
// Registration Route
router.post('/users/register', async (req, res) => {
  let lowCaseUName = req.body.username.toLowerCase()
  try {
    await User.register(
      new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: lowCaseUName,
      }),
      req.body.password,
    )
  } catch (err) {
    res.json(err)
    return
  }
  res.sendStatus(200)
})
module.exports = router
