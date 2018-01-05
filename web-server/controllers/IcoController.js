'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Coin = mongoose.model('Coin')
const Ico = mongoose.model('Ico')

exports.getIcos = function(req, res) {
  Ico.find({_id: {$gte: 0}},
    'date coin name url',
    function(err, docs) {
      if (err) res.send(err)
      res.json(docs)
  })
}

exports.createIco = function(req, res) {
  let ico = new Ico({
    date: new Date(req.sanitize(req.body.date)),
    coin: req.sanitize(req.body.coin),
    name: req.sanitize(req.body.name),
    url: req.sanitize(req.body.url)
  })
  ico.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}