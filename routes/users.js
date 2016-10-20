var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res){
  User.find({}, function(err, users){
    res.render('users/index', { usersArr: users});
  })
})

router.get('/login', function(req, res){

  res.render('users/login', {message: req.flash('loginMessage')});
})

router.post('/login', function(req, res){
  var user = req.body.user;

  console.log("test");
  User.findOne({'local.email': user.local.email}, function(err, foundUser){
    if(err) res.send(err);

    if(!user.local.email && !user.local.password){
      req.flash('loginMessage', 'Please enter email and password');
    }

    if(foundUser){
      foundUser.authenticate(user.local.password, function(err, authenticated){

        if(authenticated) {
          res.redirect('/profile');
        }else{
          res.send("Wrong password");
        }
      })
    }else{
      req.flash('loginMessage', 'Email not found!' );
      res.redirect('/users/login');
    }
  })
})

router.get('/profile', function(req, res) {
  res.render('users/profile')
})
// router.post('/login')
module.exports = router;
