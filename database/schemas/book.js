var mongoose = require('mongoose');

var Book = new mongoose.Schema({
  title: String,
  author: String,
  readStart: Date,
  readEnd: Date,
  readProgress: Number
});

module.exports = Book;