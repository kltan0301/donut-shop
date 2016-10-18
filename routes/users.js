var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res){
  User.find({}, function(err, users){
    res.render('users/index', { usersArr: users});
  })
})

module.exports = router;
