'use strict'

const express = require('express')
const router = express.Router()
const shill = require('./controllers/ShillController')
const coin = require('./controllers/CoinController')

router.get('/shillist', function(req, res) {
  let params = {}
  params.title = "shillist - Courtesy of NEO Discord #market"
  params.description = "shillist - Courtesy of NEO Discord #market"
  res.render('index', params)
})

router.get('/api/shills', function(req, res) {
  shill.getShills(req, res)
})
router.post('/api/shill', function(req, res) {
  shill.createShill(req, res)
})
router.get('/api/coin/:coin', function(req, res) {
  coin.getCoin(req, res)
})

module.exports = router
