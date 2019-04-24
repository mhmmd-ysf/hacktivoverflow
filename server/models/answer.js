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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer