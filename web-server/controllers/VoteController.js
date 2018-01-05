'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Vote = mongoose.model('Vote')

exports.getVote = function(req, res) {
  Vote.findOne({$and:[{
    cookie: req.headers.cookie,
    coin: req.params.coin}]},
    function(err, doc) {
      if (err) res.send(err)
      if (doc) {
        res.json(doc)
      } else {
        res.sendStatus(404)
      }
    }
  )
}
exports.getVotes = function(req, res) {
  Vote.find({$and:[
    {coin: req.params.coin}]},
    'upvote',
    function(err, docs) {
      if (err) res.send(err)
      if (docs.length) {
        const total = docs.length
        const upvotes = docs.filter(doc => doc.upvote).length
        res.json(upvotes/total)
      } else {
        res.json(0)
      }
  })
}

exports.createVote = function(req, res) {
  function upsertVote(vote) {
    Vote.findOneAndUpdate(
      {coin: vote.coin, cookie: vote.cookie},
      {
        date: new Date(),
        coin: vote.coin,
        upvote: vote.upvote,
        cookie: vote.cookie
      },
      {upsert: true, new: true},
      (err, doc) => {
        if (err) console.log(err)
        res.status(201)
        res.json(doc)
      }
    )
  }
  let vote = new Vote({
    date: new Date(),
    coin: req.sanitize(req.params.coin),
    upvote: req.sanitize(req.body.vote),
    cookie: req.sanitize(req.headers.cookie)
  })
  console.log(vote)
  upsertVote(vote)
}
