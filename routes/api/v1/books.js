var _ = require('underscore');

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
    })
    .post('/', function(request, response) {
      if (request && request.body) {
        var book = new app.database.models.book(request.body);
        book.save(function(err) {
          if (!err) {
            return response.json(JSON.stringify(book));
          } else {
            response.json(JSON.stringify(err));
          }
        });
      } else {
        return response.json(JSON.stringify({
          error: "Book data needed."
        }));
      }
    })
    .get('/:id', function(request, response) {
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
    })
    .put('/:id', function(request, response) {
      return app.database.models.book.findById(request.params.id, function(err, book) {
        if (!err) {
          if (book) {
            var newData = request.body;
            _.each(_.keys(newData), function(field) {
              book[field] = newData[field];
            });
            book.save(function(error) {
              if (!err) {
                return response.json(JSON.stringify(book));
              }
            });
          } else {
            return response.json(JSON.stringify({
              "error": "No book found."
            }));
          }
        } else {
          return response.json(JSON.stringify(err));
        }

      });
    });

  return router;
};