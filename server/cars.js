require('./dbConnection');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
  name: { type: String, required: true, unique: true },
  color: String,
  year: Number
});

var Car = mongoose.model('Car', CarSchema);

module.exports = Car;