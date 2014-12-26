var mongoose = require('mongoose');

var Book = new mongoose.Schema({
  title: String,
  author: String,
  start: Date,
  end: Date,
  progress: Number
});

module.exports = Book;