'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var IcoSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  coin: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  url: {
    type: String
  }
})

IcoSchema.plugin(autoIncrement.plugin, 'Ico')
module.exports = mongoose.model('Ico', IcoSchema)
