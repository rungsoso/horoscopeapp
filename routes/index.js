var express = require('express');
var router = express.Router();
var horoscope = require("../controllers/HoroscopeController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Show horoscope by id
router.get('/view/:id', function(req, res) {
  horoscope.view(req, res);
});

// Show horoscope by id
router.get('/view2/:id', function(req, res) {
  horoscope.view2(req, res);
});

// Show horoscope by id
router.get('/view3/:id', function(req, res) {
  horoscope.view3(req, res);
});

module.exports = router;
