var mongoose = require('mongoose')

var donutSchema = new mongoose.Schema({
  flavor: String,
  type: String
})

module.exports = mongoose.model('Donut', donutSchema);
