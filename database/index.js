var mongoose = require('mongoose');
var bookSchema = require('./schemas/book');

var database = {
  connection: mongoose.connect('mongodb://localhost/my-library'),
  schemas: {
    book: bookSchema
  },
  models: {
    book: mongoose.model('Book', bookSchema)
  }
};

module.exports = database;