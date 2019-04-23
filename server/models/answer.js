const mongoose = require('mongoose')

let answerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvotes: Number,
  downvotes: Number,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer