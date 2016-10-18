var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res){
  User.find({}, function(err, users){
    res.json({ users: users});
  })
})
router.post('/', function(req, res){
  User.create(req.body.user, function(req, newUser){
    res.json(newUser)
  })
})
module.exports = router;
