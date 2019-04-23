const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
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
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question