const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  notes: { type: String },
  tags: [String],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);