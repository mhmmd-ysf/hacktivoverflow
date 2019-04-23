const { Answer } = require('../models')

class ControllerAnswer {
  static create(req, res) {
    console.log({
      headers: req.headers,
      body: req.body,
      params: req.params,
      dari: 'ControllerAnswer.Create'
    })
    let input = req.body
    let newAnswer = {
      title: input.title,
      description: input.description,

    }
    Answer.create(newAnswer)
      .then(data => {
        res.status(201).json({ token })
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    Answer.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static findOne(req, res) {
    Answer.findOne({_id: req.params.id})
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static update(req, res) {
    Answer.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(answer => {
      res.status(200).json(answer)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }
  static delete(req, res) {
    Answer.findOneAndDelete({_id: req.params.id})
      .then(answer => {
        const response = {
          message: 'Successfully deleted answer.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
}

module.exports = ControllerAnswer