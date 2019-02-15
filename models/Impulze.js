const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImpulzeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  period: {
    type: Number,
    min: 0,
    default: 10 * 60 * 1000 // 10 minutes in milliseconds
  },
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'author'
  }
})

module.exports = Impulze = mongoose.model('impulze', ImpulzeSchema)