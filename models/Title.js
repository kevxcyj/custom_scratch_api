const mongoose = require('mongoose');

const TitleSchema = new mongoose.Schema({
  title: String,
  type: String,
  listed_in: String,
  release_year: Number,
  date_added: Date,
  country: String
});

module.exports = mongoose.model('Title', TitleSchema);