var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');

var defaultGetOptions = function(path, port, sessionCookie) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie || null
    }
  };
  return options;
};

var app = require('../app');

describe('app', function() {
  before(function(done) {
    done();
  });

  after(function(done) {
    done();
  });

  it('App should exist', function(done) {
    expect(app).to.exist;
    done();
  });

  describe('api/', function() {
    describe('v1/', function() {
      describe('books', function() {
        before(function() {
          this.headers = defaultGetOptions('/api/v1/books', '3333');
        });

        after(function() {
          this.headers = '';
        });

        it('should be able to return a list of books in json format', function(done) {
          // mock the mongoose in the app
          // return an array of books
          request(app)
            .get('/user')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '0')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              done()
            });
        });

        describe('/books/:id', function() {
          it('should be able to return a book', function() {
            // get a book
          });
          it('should post', function() {
            // create a book

          });
          it('should delete', function() {
            // delete a book

          });
          it('should put', function() {
            // update a book
          });
        }); // end /books/:id

      });
    });
  });
});