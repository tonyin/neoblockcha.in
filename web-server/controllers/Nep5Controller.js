'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Nep5 = mongoose.model('Nep5')
const Coin = mongoose.model('Coin')

exports.getNep5s = function(req, res) {
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
  Nep5.find({_id: {$gte: 0}},
    'coin ico_date ico_price neo_price',
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
      } else {
        res.sendStatus(404)
      }
  })
}

exports.createNep5 = function(req, res) {
  let nep5 = new Nep5({
    coin: req.sanitize(req.body.coin),
    ico_date: new Date(req.sanitize(req.body.ico_date)),
    ico_price: req.sanitize(req.body.ico_price),
    neo_price: req.sanitize(req.body.neo_price)
  })
  nep5.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}
