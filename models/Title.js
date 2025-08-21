const mongoose = require('mongoose');

// Schema for title model

const TitleSchema = new mongoose.Schema({
  title: String,
  type: String,
  listed_in: String,
  release_year: Number,
  date_added: Date,
  country: String
});

// Export
module.exports = mongoose.model('Title', TitleSchema);
