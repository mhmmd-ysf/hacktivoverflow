const { User } = require('../models')
const { hash } = require('../helpers/bcryptjs')

class ControllerUser {
  static create(req, res) {
    let input = req.body
    let newUser = {
      name: input.name,
      email: input.email,
      password: hash(input.password)
    }
    User.create(newUser)
      .then(data => {
        res.status(201).json({ token })
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static findOne(req, res) {
    User.findOne({_id: req.params.id})
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static update(req, res) {
  //! WARNING!: masih pake bcryptjs di sini====================================
    if(req.body.password) {
      let newPass = hash(req.body.password)
      req.body.password = newPass
    }
    User.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }
  static delete(req, res) {
    User.findOneAndDelete({_id: req.params.id})
      .then(user => {
        const response = {
          message: 'Successfully deleted user.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: 'user tidak ada/ password salah' })
        } else {
          if (!compare(req.body.password, user.password)) {
            res.status(401).json({ message: 'user tidak ada/ password salah' })
          } else {
            let obj = {
              email,
              password
            }
            let access_token = tokenify(obj, process.env.JWT_SECRET)
            res.status(201).json({ access_token: access_token })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
}

module.exports = ControllerUser