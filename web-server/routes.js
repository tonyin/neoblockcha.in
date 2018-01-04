'use strict'

const express = require('express')
const router = express.Router()
const coin = require('./controllers/CoinController')
const shill = require('./controllers/ShillController')
const nep5 = require('./controllers/Nep5Controller')

router.get('/shillist', function(req, res) {
  let params = {}
  params.title = "shillist - Courtesy of NEO Discord #market"
  params.description = "Track the best and worst shills from the best chat in crypto. In DHF We Trust."
  res.render('shillist', params)
})
router.get('/nep5', function(req, res) {
  let params = {}
  params.title = "nep5 - Performance of NEP5 tokens"
  params.description = "Track how well NEP5 tokens have done since ICOception. In DHF We Trust."
  res.render('nep5', params)
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
router.get('/api/nep5s', function(req, res) {
  nep5.getNep5s(req, res)
})
router.post('/api/nep5', function(req, res) {
  nep5.createNep5(req, res)
})

module.exports = router
