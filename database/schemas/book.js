var mongoose = require('mongoose');

var Book = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  rate: Number,
  readStart: Date,
  readEnd: Date,
  readProgress: Date
});

module.exports = Book;