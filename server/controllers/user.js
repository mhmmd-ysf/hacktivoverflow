const { User } = require('../models')
const { hash } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')
const { mailOpt, transporter } = require('../helpers/nodemailer')
const kue = require('kue')
const queue = kue.createQueue()

queue.process('email', function(val, done) {
  transporter.sendMail(mailOpt, function(error, info) {
    if(error) throw error
    else done()
  })
})

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
        // mailOpt.to = input.email // buat ngirim email
        res.status(201).json({ data })
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
              id: user._id,
              email: user.email,
              name: user.name,
            }
            let access_token = sign(obj)
            res.status(201).json({
              access_token: access_token,
              id: user._id,
              email: user.email,
              name: user.name,
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
}

module.exports = ControllerUser