// Module dependencies.
var application_root = __dirname,
  express = require('express'), //Web framework
  bodyParser = require('body-parser'), //Parser for reading request body
  path = require('path'), //Utilities for dealing with file paths
  mongoose = require('mongoose'); //MongoDB integration

// ---------------------------------------------------
// Create server
// ---------------------------------------------------

var app = express();

//Where to serve static content
app.use(express.static(path.join(application_root, 'site')));
app.use(bodyParser());

//Start server
var port = 9000;

app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});


// ---------------------------------------------------
// Connect to database
// ---------------------------------------------------
mongoose.connect('mongodb://localhost/library_database');

//Schemas
var Book = new mongoose.Schema({
  title: String,
  author: String,
  start: Date,
  end: Date,
  progress: Number
});

//Models
var BookModel = mongoose.model('Book', Book);


// ---------------------------------------------------
// Routes
// ---------------------------------------------------

// url              HTTP Method         Operation
// /api/v1/books        GET                 Get an array of all books
// /api/v1/books/:id    GET                 Get the book with id of :id
// /api/v1/books        POST                Add a new book and return the book with an id attribute added
// /api/v1/books/:id    PUT                 Update the book with id of :id
// /api/v1/books/:id    DELETE              Delete the book with id of :id

app.get('/api', function(request, response) {
  response.send('Library API is running ...');
});

app.get('/api/v1', function(request, response) {
  response.send('Library API v1 ...');
});

//Get a list of all books
app.get('/api/v1/books', function(request, response) {
  return BookModel.find(function(err, books) {
    if (!err) {
      return response.send(books);
    } else {
      return console.log(err);
    }
  });
});