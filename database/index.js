var mongoose = require('mongoose');
var dbConfig = require('./config');
var bookSchema = require('./schemas/book');

var database = {
  connection: mongoose.connect(dbConfig.dbURL),
  schemas: {
    book: bookSchema
  },
  models: {
    book: mongoose.model('Book', bookSchema)
  }
};

module.exports = database;