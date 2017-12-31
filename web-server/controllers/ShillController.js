'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Shill = mongoose.model('Shill')

exports.getShills = function(req, res) {
  Shill.find({$and:[
      {shill_date: {$gte: new Date(new Date().valueOf() - 7*24*60*60*1000)}}
    ]},
    'user token shill_date shill_price',
    {sort: {shill_date: -1}},
    function(err, docs) {
      if (err) res.send(err)
      res.json(docs)
  })
}

exports.createShill = function(req, res) {
  console.log(req)
  let shill = new Shill({
    user: req.sanitize(req.body.user),
    token: req.sanitize(req.body.token),
    shill_price: req.sanitize(req.body.shill_price),
    shill_date: new Date(new Date().valueOf())
  })
  shill.save(function(err, doc) {
    if (err) res.send(err)
    res.status(201)
    res.json(doc)
  })
}
