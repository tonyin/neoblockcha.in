'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Coin = mongoose.model('Coin')
const https = require('https')

exports.getCoin = function(req, res) {
  Coin.findOne({symbol: req.params.coin.toUpperCase()},
    (err, doc) => {
      if (err) res.send(err)
      res.json(doc)
    }
  )
}

exports.updateCoins = function() {
  function updateCoin(coin) {
    Coin.findOneAndUpdate(
      {symbol: coin.symbol},
      {
        price_usd: coin.price_usd,
        price_btc: coin.price_btc,
        market_cap_usd: coin.market_cap_usd,
        last_updated: new Date(coin.last_updated*1000)
      },
      {upsert: true, new: true},
      (err, doc) => {
        if (err) console.log(err)
      }
    )
  }
  const options = {
    hostname: 'api.coinmarketcap.com',
    path: '/v1/ticker/?limit=200',
    method: 'GET'
  }
  console.log("[" + new Date() + "] Calling api.coinmarketcap.com...")
  let cmc_raw = ''
  const req = https.get(options, (res) => {
    console.log('statusCode: ', res.statusCode)
    res.on('data', (doc) => {
      cmc_raw += doc
    })
    res.on('end', () => {
      try {
        const cmc = JSON.parse(cmc_raw)
        cmc.forEach(coin => {
          updateCoin(coin)
        })
      } catch(err) {
        console.error(err.message)
      }
    })
  })
  req.on('error', (err) => {
    console.error(err)
  })
}
