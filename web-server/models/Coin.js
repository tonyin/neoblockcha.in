'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var CoinSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  price_usd: {
    type: Number,
    required: true
  },
  price_btc: {
    type: Number,
    required: true
  },
  market_cap_usd: {
    type: Number
  },
  last_updated: {
    type: Date,
    required: true
  }
})

CoinSchema.plugin(autoIncrement.plugin, 'Coin')
module.exports = mongoose.model('Coin', CoinSchema)
