const { Question } = require('../models')

class ControllerQuestion {
  static create(req, res) {
    console.log({
      headers: req.headers,
      body: req.body,
      params: req.params,
      auth: req.auth,
      authenticated: req.authenticated,
      dari: 'ControllerQuestion.Create'
    })
    let input = req.body
    let newQuestion = {
      title: input.title,
      description: input.description,
      upvotes: 1,
      downvotes: 0,
      userId: req.authenticated._id
    }
    Question.create(newQuestion)
      .then(data => {
        res.status(201).json({ token })
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    Question.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static findOne(req, res) {
    Question.findOne({_id: req.params.id})
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static update(req, res) {
    Question.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(question => {
      res.status(200).json(question)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }
  static delete(req, res) {
    Question.findOneAndDelete({_id: req.params.id})
      .then(question => {
        const response = {
          message: 'Successfully deleted question.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
}

module.exports = ControllerQuestion