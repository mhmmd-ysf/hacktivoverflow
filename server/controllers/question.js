const { Question } = require('../models')

class ControllerQuestion {
  static create(req, res) {
    let input = req.body
    let newQuestion = {
      title: input.title,
      description: input.description,
      upvotes: 1,
      downvotes: 0,
      userId: req.authenticated.id,
      userName: req.authenticated.name,
      answers: [],
    }
    Question.create(newQuestion)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => res.status(500).json({ error: err.message }))
  }
  static findAll(req, res) {
    Question.find()
      .populate(['userId', 'answers'])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({error: err.message}))
  }
  static findOne(req, res) {
    Question.findOne({_id: req.params.id})
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {res.status(500).json({error: err.message})})
  }
  static update(req, res) {
    Question.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(question => {
      res.status(200).json(question)
    })
    .catch(err => res.status(500).json({error: err.message}))
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
      .catch(err => {res.status(500).json({error: err.message})})
  }
  static vote(req, res) {
    console.log({
      params: req.params,
      token: req.headers.token,
      body: req.body,
      authenticated: req.authenticated,
      dari: 'ControllerQuestion.vote'
    })
    // const vote = (req.body.vote === 'up') ? 1 : -1
    Question.findOne({_id: req.params.questionId})
      .then(question => {
        if (req.body.vote === 'up') {
          question.upvotes++
        } else if (req.body.vote === 'down') {
          question.downvotes--
        }
        return question.save()
      })
      .then(save => {
        console.log(save)
        res.status(200).json(save)
      })
      .catch((err) => {
        res.status(500).json({error: err.message})
      })
  }
}

module.exports = ControllerQuestion