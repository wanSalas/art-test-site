
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  username: String,
  email:   String,
  password: String,
  meta: {
  }
});


var userModel = mongoose.model('UserModel', userSchema );

module.exports = userModel;