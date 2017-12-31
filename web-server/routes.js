'use strict'

const express = require('express')
const router = express.Router()
const shill = require('./controllers/ShillController')

router.get('/shillz', function(req, res) {
  let params = {}
  params.title = "shillz - Courtesy of NEO Discord #market"
  params.description = "shillz - Courtesy of NEO Discord #market"
  res.render('index', params)
})

router.get('/api/shills', function(req, res) {
  shill.getShills(req, res)
})
router.post('/api/shill', function(req, res) {
  shill.createShill(req, res)
})

module.exports = router
