var express = require('express');
var router = express.Router();
var Donut = require('../models/donut');

router.get('/', function(req, res){
  Donut.find({}, function(err, donuts){
    res.json(donuts);
  })
})

module.exports = router;
