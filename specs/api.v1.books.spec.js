var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var testData = require('./test-data');
var _ = require('underscore');

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
        describe('GET', function() {
          before(function(done) {
            this.originalFind = _.clone(app.database.models.book.find);
            done();
          });

          afterEach(function(done) {
            app.database.models.book.find = this.originalFind;
            done();
          });

          it('should answer in json format', function(done) {
            app.database.models.book.find = function(callback) {
              callback(null, []);
            };

            request(app)
              .get('/api/v1/books')
              .expect('Content-Type', /json/)
              .expect(200, done);
          });

          it('should return 200 status and empty books object when no books', function(done) {
            app.database.models.book.find = function(callback) {
              callback(null, []);
            };

            request(app)
              .get('/api/v1/books')
              .expect(200)
              .end(function(error, response) {
                expect(response.body.books).that.is.an('array');
                expect(response.body.books.length).to.equals(0);
                done();
              });
          });

          it('should search the database and return an array of books', function(done) {
            app.database.models.book.find = function(callback) {
              callback(null, testData.books);
            };

            request(app)
              .get('/api/v1/books')
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(error, response) {
                expect(response.body.books).that.is.an('array');
                done();
              });
          });
        }); // end GET /books/

        describe('/books/:id', function() {

          describe('GET', function() {
            it('should return json content', function(done) {
              // get a book
              done();
            });
            it('should search the database and return an empty object when no book found', function(done) {
              // get a book
              done();
            });
            it('should search the database and return a book object by id', function(done) {
              // get a book
              done();
            });
          });

          // end POST /books/:id
          describe('POST', function() {
            it('should post', function(done) {
              // create a book
              done();
            });
          });
          // end POST /books/:id

          // end PUT /books/:id
          describe('POST', function() {
            it('should put', function(done) {
              // update a book
              done();
            });
          });
          // end PUT /books/:id

          // end DELETE /books/:id
          describe('POST', function() {
            it('should delete', function(done) {
              // delete a book
              done();
            });
          });
          // end DELETE /books/:id

        }); // end /books/:id

      });
    });
  });
});