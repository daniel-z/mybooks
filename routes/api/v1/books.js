var _ = require('underscore');

module.exports = function(app) {
  var router = require('express').Router();

  // Get a list of all books
  router.get('/', function(request, response) {
      response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
      response.header('Access-Control-Allow-Methods', 'GET');
      response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

      return app.database.models.book.find(function(err, books) {
        if (!err) {
          if (!books) {
            books = [];
          }
          console.log(books);
          return response.json(JSON.stringify(books));
        } else {
          return console.log(err);
        }
      });
    })
    .post('/', function(request, response) {
      response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
      response.header('Access-Control-Allow-Methods', 'POST');
      response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

      if (request && request.body && _.keys(request.body).length) {
        var book = new app.database.models.book(request.body);
        book.save(function(err) {
          if (!err) {
            console.log(book);
            return response.json(JSON.stringify(book));
          } else {
            console.log(err);
            response.json(JSON.stringify(err));
          }
        });
      } else {
        console.log('error: Book data needed.');
        return response.json(JSON.stringify({
          error: "Book data needed."
        }));
      }
    })
    .get('/:id', function(request, response) {
      response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
      response.header('Access-Control-Allow-Methods', 'GET');
      response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

      return app.database.models.book.findById(request.params.id, function(err, book) {
        if (!err) {
          if (!book) {
            book = {};
          }
          console.log(book);
          return response.json(JSON.stringify(book));
        } else {
          console.log(err);
          return console.log(err);
        }
      });
    })
    .put('/:id', function(request, response) {
      response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
      response.header('Access-Control-Allow-Methods', 'PUT');
      response.header('Access-Control-Allow-Headers', 'content-Type');

      return app.database.models.book.findById(request.params.id, function(err, book) {
        if (!err) {
          if (book) {
            var newData = request.body;
            _.each(_.keys(newData), function(field) {
              book[field] = newData[field];
            });
            book.save(function(error) {
              if (!err) {
                console.log(book);
                return response.json(JSON.stringify(book));
              }
            });
          } else {
            console.log('error: No book found.');
            return response.json(JSON.stringify({
              "error": "No book found."
            }));
          }
        } else {
          console.log(err);
          return response.json(JSON.stringify(err));
        }
      });
    })
    // Delete a book
    .delete('/:id', function(request, response) {
      response.header('Access-Control-Allow-Origin', request.headers.origin || "*");
      response.header('Access-Control-Allow-Methods', 'DELETE');
      response.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

      return app.database.models.book.findById(request.params.id, function(err, book) {
        if (!book) {
          console.log('error: No book Found.');
          return response.json(JSON.stringify({
            "error": "No book Found."
          }));
        }
        return book.remove(function(err) {
          if (!err) {
            console.log('Delete: success.');
            return response.json(JSON.stringify({
              "action": "delete",
              "status": "success"
            }));
          } else {
            console.log(err);
            return response.json(JSON.stringify(err));
          }
        });
      });
    });
  return router;
};