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
      var book = new app.database.models.book();
      return response.json(JSON.stringify({
        "success": "true"
      }));
      // return book.save(function(err) {
      //   if (!err) {
      //     console.log('created');
      //     return response.send(book);
      //   } else {
      //     console.log(err);
      //   }
      // });
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
  });

  return router;
};