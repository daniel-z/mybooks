var express = require('express');
var database = require('../../../database');
var router = express.Router();
var BookModel = database.models.book;

// Get a list of all books
router.get('/', function(request, response) {
  return BookModel.find(function(err, books) {
    if (!err) {
      return response.send(books);
    } else {
      return console.log(err);
    }
  });
});

router.get('/:id', function(request, response) {
  response.send('Book id ...:' + request.params.id);
});

module.exports = router;