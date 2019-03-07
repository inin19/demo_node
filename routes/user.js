const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  const data = { userid: 1234, name: 'yingying' };
  res.send(data)
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About user')
})

module.exports = router