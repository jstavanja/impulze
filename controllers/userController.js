const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route POST /api/auth/register
// @desc CREATE a User
// @access public
const register = (req, res) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
  
    if (req.body.password !== req.body.passwordConf) {
      return res.status(400).json({success: false, error: 'Passwords do not match.'})
    }
  
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    })
  
    newUser.save()
      .then(user => res.status(200).end())
      .catch(err => res.status(500).json({success: false, error: err}))
  } else {
    return res.status(400).json({success: false, error: 'Insufficient data / missing fields.'})
  }
}

// @route POST /api/auth/login
// @desc LOGIN a User and return JWT token
// @access public
const login = (req, res) => {
  User.authenticate(req.body.email, req.body.password, (error, user) => {
    if (error || !user) {
      return res.status(401).json({success: false, error: 'Wrong email or password.'})
    } else {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          return res.status(500).end()
        }
        return res.json({token})
      })
    }
  })
}

// @route GET /api/auth/info
// @desc returns INFORMATION about the current logged in user (JWT token parse)
// @access public
const info = (req, res) => {
  // remove password from response
  if (req.auth) {
    res.json(req.auth.user)
  } else {
    res.status(403).end()
  }
}

module.exports = {
  register, login, info
}