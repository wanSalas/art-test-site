
const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  jwt:  String, // String is shorthand for {type: String}
  exp: String,
  iat:   String,
  user: String
});


var sessionModel = mongoose.model('session', sessionSchema );

module.exports = sessionModel;