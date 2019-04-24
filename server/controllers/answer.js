const { Answer } = require('../models')
const { Question } = require('../models')

class ControllerAnswer {
  static create(req, res) {
    // console.log({
    //   headers: req.headers,
    //   body: req.body,
    //   params: req.params,
    //   dari: 'ControllerAnswer.Create'
    // })
    let input = req.body
    let newAnswer = {
      title: input.title,
      description: input.description,
      upvotes: 1,
      downvotes: 0,
      userId: req.authenticated.id,
      userName: req.authenticated.name,
      questionId: input.questionId
    }
    console.log(newAnswer)
    let question
    Question.findOne({_id: input.questionId})
      .then((data) => {
        question = data
        return Answer.create(newAnswer)
      })
      .then((answer) => {
        question.answers.push(answer._id)
        return question.save()
      })
      .then(save => {
        res.status(201).json(save)
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