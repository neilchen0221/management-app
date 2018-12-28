const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creat Schema
const ContacSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('contact', ContacSchema);
