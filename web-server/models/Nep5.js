'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var Nep5Schema = new Schema({
  coin: {
    type: String,
    required: true
  },
  ico_date: {
    type: Date,
  },
  ico_price: {
    type: Number,
    required: true
  },
  neo_price: {
    type: Number
  }
})

Nep5Schema.plugin(autoIncrement.plugin, 'Nep5')
module.exports = mongoose.model('Nep5', Nep5Schema)
