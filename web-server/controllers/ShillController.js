'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Shill = mongoose.model('Shill')
const Coin = mongoose.model('Coin')

exports.getShills = function(req, res) {
  function getCoinPrice(coin, callback) {
    Coin.findOne({symbol: coin.coin},
      (err, doc) => {
        if (err) callback(0)
        callback(doc.price_usd)
      }
    )
  }
  Shill.find({$and:[
      {shill_date: {$gte: new Date(new Date().valueOf() - 7*24*60*60*1000)}}
    ]},
    'user coin shill_date shill_price',
    {sort: {shill_date: -1}},
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

exports.createShill = function(req, res) {
  let shill = new Shill({
    user: req.sanitize(req.body.user),
    coin: req.sanitize(req.body.coin),
    shill_price: req.sanitize(req.body.shill_price),
    shill_date: new Date(req.sanitize(req.body.shill_date))
  })
  shill.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}
