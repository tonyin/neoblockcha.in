var express = require('express')
var app = express()
var server = require('http').Server(app)
var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
var bodyParser = require('body-parser')
var assert = require('assert')
var expressSanitizer = require('express-sanitizer')
var path = require('path')
var helmet = require('helmet')
var sm = require('sitemap')

// Helpers
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())

// Database
const connection = mongoose.createConnection("mongodb://localhost/neoblockchain")
autoIncrement.initialize(connection)
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/neoblockchain')

// Models
require('./models/Coin')
require('./models/Shill')
require('./models/Shit')
require('./models/Nep5')
require('./models/Ico')
require('./models/Vote')

// Network
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "PUT, DELETE")
  next()
})

// Routes
const routes = require('./routes.js')
app.use('/', express.static(path.join(__dirname, './public')))
app.use('/', routes)

// Views
app.set('views', './views')
app.set('view engine', 'pug')

// Sitemap
var sitemap = sm.createSitemap({
  hostname: 'https://neoblockcha.in',
  cacheTime: 600000,
  urls: [
    {url: '/shillist', changefreq: 'daily', priority: 1},
    {url: '/shitlist', changefreq: 'daily', priority: 0.8},
    {url: '/nep5', changefreq: 'daily', priority: 0.7},
    {url: '/icolist', changefreq: 'daily', priority: 0.9}
  ]
})
app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML(function(err, xml) {
    if (err) return res.sendStatus(500)
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  })
})

// Coin updates
const coin = require('./controllers/CoinController')
function loopUpdateCoins(interval) {
  setInterval(coin.updateCoins, interval)
}

// Launch server
const port = process.env.PORT || 6002
server.listen(port, function() {
  loopUpdateCoins(60000)
})

module.exports = app
