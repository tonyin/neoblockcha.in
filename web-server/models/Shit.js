'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var ShitSchema = new Schema({
  coin: {
    type: String,
    required: true
  },
  shit_date: {
    type: Date,
  },
  shit_price: {
    type: Number,
    required: true
  },
  neo_price: {
    type: Number
  }
})

ShitSchema.plugin(autoIncrement.plugin, 'Shit')
module.exports = mongoose.model('Shit', ShitSchema)
