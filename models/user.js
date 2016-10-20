var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  }
})
userSchema.pre('save', function(next){
  // console.log('before save hash');
  console.log(this);
  var user = this;

  bcrypt.genSalt(5, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.local.password, salt, function(err, hash){
      user.local.password = hash;
      next();
    });
  })
})

userSchema.post('save', function(next){
  // console.log('before save hash');
})

userSchema.methods.authenticate = function(password, callback){
  console.log('given password is: ' + password);
  console.log('given password is: ' + this.local.password);
  var hashedPassword = this.local.password;

  bcrypt.compare(password, hashedPassword, function(err, isMatch){
    callback(err, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema);
