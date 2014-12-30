var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var testData = require('./test-data');
var _ = require('underscore');

var app = require('../app');

describe('app', function() {
  it('should exist', function(done) {
    expect(app).to.exist();
    done();
  });

  describe('api/v1/books', function() {
    describe('on GET, it', function() {
      beforeEach(function(done) {
        app.database.models.book.find = {};
        done();
      });

      it('should answer in json format', function(done) {
        app.database.models.book.find = function(callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return 200 status', function(done) {
        app.database.models.book.find = function(callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect(200)
          .end(function(error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return empty books object when no books', function(done) {
        app.database.models.book.find = function(callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect(200)
          .end(function(error, response) {
            if (error) throw error;
            var books = JSON.parse(response.body);
            expect(books).that.is.an('array');
            expect(books.length).to.equals(0);
            done();
          });
      });

      it('should searchId the database and return an array of books', function(done) {
        app.database.models.book.find = function(callback) {
          callback(null, testData.books);
        };

        request(app)
          .get('/api/v1/books')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, response) {
            if (error) throw error;
            expect(JSON.parse(response.body)).that.is.an('array');
            done();
          });
      });
    }); // end GET /books/

    // end POST /books/:id
    describe('on POST, it', function() {
      before(function(done) {
        this.originalSave = _.clone(app.database.models.book.prototype.save);
        done();
      });

      afterEach(function(done) {
        app.database.models.book.prototype.save = this.originalSave;
        done();
      });

      it('should return 200', function(done) {
        app.database.models.book.prototype.save = function(callback) {
          callback(null);
        };

        request(app)
          .post('/api/v1/books/')
          .send(testData.book[1])
          .expect(200)
          .end(function(error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return json content', function(done) {
        app.database.models.book.prototype.save = function(callback) {
          callback(null);
        };

        request(app)
          .post('/api/v1/books/')
          .send(testData.book[1])
          .expect('Content-Type', /json/)
          .end(function(error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should save in the database when book is using a valid schema', function(done) {
        var that = this,
          saveSpy = new sinon.spy();

        app.database.models.book.prototype.save = function(callback) {
          saveSpy();
          return testData.book;
        };

        expect(saveSpy.called).to.be.true();

        request(app)
          .post('/api/v1/books/')
          .send(testData.book[1])
          .expect('Content-Type', /json/)
          .end(function(error, response) {
            if (error) throw error;
            done();
          });
      });

    });
    // end POST /books/:id

    describe('/:id :', function() {
      describe('on GET, it', function() {

        beforeEach(function(done) {
          app.database.models.book.findById = {};
          done();
        });

        it('should return 200 status', function(done) {
          app.database.models.book.findById = function(id, callback) {
            callback(null, testData.book);
          };

          request(app)
            .get('/api/v1/books/1')
            .expect(200)
            .end(function(error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return json content', function(done) {
          app.database.models.book.findById = function(id, callback) {
            callback(null, testData.book);
          };

          request(app)
            .get('/api/v1/books/' + testData.book.id)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should search the id in the database once', function(done) {
          var databaseSpy = sinon.spy(),
            searchId;

          app.database.models.book.findById = function(id, callback) {
            searchId = id;
            databaseSpy();
            callback(null, testData.book);
          };

          // expect(searchId).to.equals(testData.book.id);
          expect(databaseSpy.calledOnce);

          request(app)
            .get('/api/v1/books/1')
            .expect('Content-Type', /json/)
            .end(function(error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return an empty object when no book found', function(done) {
          var databaseSpy = new sinon.spy();

          app.database.models.book.findById = function(id, callback) {
            databaseSpy();
            callback(null, testData.book);
          };

          expect(databaseSpy.calledOnce);

          request(app)
            .get('/api/v1/books/' + testData.book.id)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
              if (error) throw error;
              done();
            });
        });
      });

      // end PUT /books/:id
      describe.skip('on PUT, it', function() {
        it('should put', function(done) {
          // update a book
          done();
        });
      });
      // end PUT /books/:id

      // end DELETE /books/:id
      describe.skip('on DELETE, it', function() {
        it('should delete', function(done) {
          // delete a book
          done();
        });
      });
      // end DELETE /books/:id

    }); // end /books/:id

  });
});