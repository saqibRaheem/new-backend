const mongoose = require('mongoose')

const clauseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  ancestors: [{ type: mongoose.Schema.Types.String, ref: 'Clause' }],
  parent: [{ type: mongoose.Schema.Types.String, ref: 'Clause' }],
  children: [{ type: mongoose.Schema.Types.String, ref: 'Clause' }],
  hasQuestion: Boolean,
  question: [
    {
      question: String,
      answer: String
    }
  ]
})

module.exports = mongoose.model('Clause', clauseSchema)
