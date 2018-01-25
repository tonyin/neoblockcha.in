'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var EatSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  price: {
    type: Number,
    required: true
  },
  eat: {
    type: String
  },
  claim: {
    type: String
  },
  proof: {
    type: String
  }
})

EatSchema.plugin(autoIncrement.plugin, 'Eat')
module.exports = mongoose.model('Eat', EatSchema)
