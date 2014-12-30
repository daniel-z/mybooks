module.exports = function(app) {
  var router = require('express').Router();

  // Get a list of all books
  router.get('/', function(request, response) {
    return app.database.models.book.find(function(err, books) {
      if (!err) {
        if (!books) {
          books = [];
        }
        return response.json(JSON.stringify(books));
      } else {
        return console.log(err);
      }
    });
  });

  router.get('/:id', function(request, response) {
    return app.database.models.book.findById(request.params.id, function(err, book) {
      if (!err) {
        if (!book) {
          book = {};
        }
        return response.json(JSON.stringify(book));
      } else {
        return console.log(err);
      }
    });
  });

  return router;
};