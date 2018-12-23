const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).end()
      }
      req.auth = authData
      next()
    })
  } else {
    res.status(403).end()
  }
}

module.exports = {
  verifyToken
}