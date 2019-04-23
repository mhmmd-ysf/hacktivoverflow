const { verify } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  try {
    const decode = verify(req.headers.token)
    User.findOne({
        email: decode.email
      })
      .then((found) => {
        if (found) {
          req.authenticated = decode
          next()
        } else {
          res.status(401).json({
            error: 'Email tidak ada.'
          })
        }
      })
      .catch(err => {
        res.status(401).json({
          error: 'Authentication ERROR.'
        })
      })
  } catch (err) {
    res.status(401).json({
      error: 'Token Invalid.'
    })
  }
}