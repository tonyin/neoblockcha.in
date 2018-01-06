'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Shit = mongoose.model('Shit')
const Coin = mongoose.model('Coin')

exports.getShits = function(req, res) {
  function getCoinPrice(coin, callback) {
    Coin.findOne({symbol: coin.coin},
      (err, doc) => {
        if (err) callback(0)
        if (doc) {
          callback(doc.price_usd)
        }
        else {
          callback(0)
        }
      }
    )
  }
  Shit.find({$and:[
      {_id: {$gte: 0}}
    ]},
    'coin shit_date shit_price neo_price',
    function(err, docs) {
      if (err) res.send(err)
      if (docs) {
        let docs2 = []
        let counter = 0
        docs.forEach((doc, idx, arr) => {
          let doc2 = JSON.parse(JSON.stringify(doc))
          getCoinPrice(doc2, (price_usd) => {
            doc2.price_usd = price_usd
            docs2.push(doc2)
            counter++
            if (counter === arr.length) {
              res.json(docs2)
            }
          })
        })
      }
  })
}

exports.createShit = function(req, res) {
  let shit = new Shit({
    coin: req.sanitize(req.body.coin),
    shit_price: req.sanitize(req.body.shit_price),
    shit_date: new Date(req.sanitize(req.body.shit_date)),
    neo_price: req.sanitize(req.body.neo_price)
  })
  shit.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}
