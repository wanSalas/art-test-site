
const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactMailSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email:   String,
  message: String
});


var user = mongoose.model('contactMail', contactMailSchema );

module.exports = user;