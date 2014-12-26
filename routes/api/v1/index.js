var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  var msg = "API V1: December 25, 2014 <br/>";
  msg += " <br/>";
  msg += " /api/v1/books &nbsp;&nbsp;:&nbsp;&nbsp; GET &nbsp;&nbsp;:&nbsp;&nbsp; Get an array of all books <br/>";
  msg += " /api/v1/books/:id &nbsp;&nbsp;:&nbsp;&nbsp; GET &nbsp;&nbsp;:&nbsp;&nbsp; Get the book with id of :id <br/>";
  msg += " /api/v1/books &nbsp;&nbsp;:&nbsp;&nbsp; POST &nbsp;&nbsp;:&nbsp;&nbsp; Add a new book and return the book with an id attribute added <br/>";
  msg += " /api/v1/books/:id &nbsp;&nbsp;:&nbsp;&nbsp; PUT &nbsp;&nbsp;:&nbsp;&nbsp; Update the book with id of :id <br/>";
  msg += " /api/v1/books/:id &nbsp;&nbsp;:&nbsp;&nbsp; DELETE &nbsp;&nbsp;:&nbsp;&nbsp; Delete the book with id of :id <br/>";

  response.send(msg);
});

module.exports = router;