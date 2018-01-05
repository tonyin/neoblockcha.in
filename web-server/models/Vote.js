'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var VoteSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  coin: {
    type: String,
    required: true
  },
  upvote: {
    type: Boolean,
    required: true
  },
  cookie: {
    type: String,
    required: true
  }
})

VoteSchema.plugin(autoIncrement.plugin, 'Vote')
module.exports = mongoose.model('Vote', VoteSchema)
