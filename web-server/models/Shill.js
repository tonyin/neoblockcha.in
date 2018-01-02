'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var ShillSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  coin: {
    type: String,
    required: true
  },
  shill_date: {
    type: Date,
  },
  shill_price: {
    type: Number,
    required: true
  },
  neo_price: {
    type: Number
  }
})

ShillSchema.plugin(autoIncrement.plugin, 'Shill')
module.exports = mongoose.model('Shill', ShillSchema)
