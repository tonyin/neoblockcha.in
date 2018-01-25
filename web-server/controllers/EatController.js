'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Eat = mongoose.model('Eat')
const Coin = mongoose.model('Coin')

exports.getEats = function(req, res) {
  Eat.find({$and:[
      {_id: {$gte: 0}}
    ]},
    'user date price eat claim proof',
    {sort: {date: -1}},
    function(err, docs) {
      if (err) res.send(err)
      if (docs) {
        res.json(docs)
      } else {
        res.sendStatus(404)
      }
  })
}

exports.createEat = function(req, res) {
  let eat = new Eat({
    user: req.sanitize(req.body.user),
    date: new Date(req.sanitize(req.body.date)),
    price: req.sanitize(req.body.price),
    eat: req.sanitize(req.body.eat)
  })
  eat.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}
