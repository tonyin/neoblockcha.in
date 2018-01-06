'use strict'

const express = require('express')
const router = express.Router()
const coin = require('./controllers/CoinController')
const shill = require('./controllers/ShillController')
const shit = require('./controllers/ShitController')
const nep5 = require('./controllers/Nep5Controller')
const ico = require('./controllers/IcoController')
const vote = require('./controllers/VoteController')

router.get('/shillist', function(req, res) {
  let params = {}
  params.title = "shillist - Courtesy of NEO Discord #market"
  params.description = "Track the best and worst shills from the best chat in crypto. In DHF We Trust."
  res.render('shillist', params)
})
router.get('/shitlist', function(req, res) {
  let params = {}
  params.title = "shitlist - Courtesy of NEO Discord #market"
  params.description = "Track the best shit from the best chat in crypto. In DHF We Trust."
  res.render('shitlist', params)
})
router.get('/nep5', function(req, res) {
  let params = {}
  params.title = "nep5 - Performance of NEP5 coins"
  params.description = "Track how well NEP5 coin have done since ICOception. In DHF We Trust."
  res.render('nep5', params)
})
router.get('/icolist', function(req, res) {
  let params = {}
  params.title = "icolist - Crowdsourced ICOs from the NEO mastermind chat"
  params.description = "Track who's doing which ICOs. In DHF We Trust."
  res.render('icolist', params)
})


router.get('/api/coin/:coin', function(req, res) {
  coin.getCoin(req, res)
})
router.get('/api/shills', function(req, res) {
  shill.getShills(req, res)
})
router.post('/api/shill', function(req, res) {
  shill.createShill(req, res)
})
router.get('/api/shits', function(req, res) {
  shit.getShits(req, res)
})
router.post('/api/shit', function(req, res) {
  shit.createShit(req, res)
})
router.get('/api/nep5s', function(req, res) {
  nep5.getNep5s(req, res)
})
router.post('/api/nep5', function(req, res) {
  nep5.createNep5(req, res)
})
router.get('/api/icos', function(req, res) {
  ico.getIcos(req, res)
})
router.post('/api/ico', function(req, res) {
  ico.createIco(req, res)
})
router.get('/api/:coin/vote', function(req, res) {
  vote.getVote(req, res)
})
router.get('/api/:coin/votes', function(req, res) {
  vote.getVotes(req, res)
})
router.post('/api/:coin/vote', function(req, res) {
  vote.createVote(req, res)
})

module.exports = router
