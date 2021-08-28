
const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  jwt:  String, // String is shorthand for {type: String}
  exp: String,
  iat:   String,
  user: String
});


var session = mongoose.model('session', sessionSchema );

module.exports = session;