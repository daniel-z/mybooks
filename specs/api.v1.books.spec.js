var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var testData = require('./test-data');
var _ = require('underscore');

var app = require('../app');

describe('app', function () {
  it('should exist', function (done) {
    expect(app).to.exist();
    done();
  });

  describe('api/v1/books', function () {

    // ------------------------------------------------------------
    // end GET /books/
    // ------------------------------------------------------------
    describe('on GET, it', function () {
      beforeEach(function (done) {
        app.database.models.book.find = {};
        done();
      });

      it('should answer in json format', function (done) {
        app.database.models.book.find = function (callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return 200 status', function (done) {
        app.database.models.book.find = function (callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect(200)
          .end(function (error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return empty books object when no books', function (done) {
        app.database.models.book.find = function (callback) {
          callback(null, []);
        };

        request(app)
          .get('/api/v1/books')
          .expect(200)
          .end(function (error, response) {
            if (error) throw error;
            var books = response.body;
            expect(books).that.is.an('array');
            expect(books.length).to.equals(0);
            done();
          });
      });

      it('should searchId the database and return an array of books', function (done) {
        app.database.models.book.find = function (callback) {
          callback(null, testData.books);
        };

        request(app)
          .get('/api/v1/books')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, response) {
            if (error) throw error;
            expect(response.body).that.is.an('array');
            done();
          });
      });
    }); // end GET /books/

    // ------------------------------------------------------------
    // POST /books/
    // ------------------------------------------------------------

    describe('on POST, it', function () {
      beforeEach(function (done) {
        app.database.models.book.prototype.save = function (callback) {
          callback(null);
          return;
        };
        done();
      });

      it('should return 200', function (done) {
        request(app)
          .post('/api/v1/books/')
          .send(testData.books[1])
          .expect(200)
          .end(function (error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should return json content', function (done) {
        request(app)
          .post('/api/v1/books/')
          .send(testData.books[1])
          .expect('Content-Type', /json/)
          .end(function (error, response) {
            if (error) throw error;
            done();
          });
      });

      it('should save in the database when book is using a valid schema', function (done) {
        var that = this,
          saveSpy = new sinon.spy();

        app.database.models.book.prototype.save = function (callback) {
          saveSpy();
          callback(null);
          return;
        };

        request(app)
          .post('/api/v1/books/')
          .send(testData.books[1])
          .expect('Content-Type', /json/)
          .end(function (error, response) {
            var result = response.body;
            expect(saveSpy.calledOnce).to.be.true();
            if (error) throw error;
            done();
          });
      });

      it('should return an error in json format when book is using an invalid schema', function (done) {
        var that = this;

        var schemaDestroyer = function (dataSchema, ignore) {
          var lastField,
            actualField,
            dataSchemaTests = [],
            dataSchemaDestroy = _.clone(dataSchema),
            fields = _.difference(_.keys(dataSchema), ignore);

          _.each(fields, function (field) {
            lastField = actualField || null;
            actualField = {
              field: field,
              data: dataSchemaDestroy[field]
            };

            if (lastField !== null) {
              dataSchemaDestroy[lastField.field] = lastField.data;
            }

            delete dataSchemaDestroy[actualField.field];
            dataSchemaTests.push(_.clone(dataSchemaDestroy));
          });
          return dataSchemaTests;
        };

        var testSchemas = schemaDestroyer(testData.book, ['readStart', 'readEnd', 'readProgress', 'rate']),
          totalTests = testSchemas.length;

        app.database.models.book.prototype.save = function (callback) {
          callback(null);
          return;
        };

        _.each(testSchemas, function (wrongBookData) {
          request(app)
            .post('/api/v1/books')
            .send(wrongBookData)
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              expect(response.body).to.exist();
              var result = response.body;
              expect(result.name).to.exist();
              expect(result.name).to.equals('ValidationError');
              if (error) throw error;
              totalTests--;
              if (totalTests === 0) {
                done();
              }
            });
        });
      });
    });
    // end POST /books/:id

    // ------------------------------------------------------------
    // GET /books/:id
    // ------------------------------------------------------------

    describe('/:id :', function () {
      describe('on GET, it', function () {

        beforeEach(function (done) {
          app.database.models.book.findById = {};
          done();
        });

        it('should return 200 status', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback(null, testData.book);
          };

          request(app)
            .get('/api/v1/books/1')
            .expect(200)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return json content', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback(null, testData.book);
          };

          request(app)
            .get('/api/v1/books/' + testData.book.id)
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should search the id in the database once', function (done) {
          var databaseSpy = sinon.spy(),
            searchId;

          app.database.models.book.findById = function (id, callback) {
            searchId = id;
            databaseSpy();
            callback(null, testData.book);
          };

          // expect(searchId).to.equals(testData.book.id);
          expect(databaseSpy.calledOnce);

          request(app)
            .get('/api/v1/books/1')
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return an empty object when no book found', function (done) {
          var databaseSpy = new sinon.spy();

          app.database.models.book.findById = function (id, callback) {
            databaseSpy();
            callback(null, testData.book);
          };

          expect(databaseSpy.calledOnce);

          request(app)
            .get('/api/v1/books/' + testData.book.id)
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });
      });

      // ------------------------------------------------------------
      // PUT /books/:id
      // ------------------------------------------------------------
      describe('on PUT, it', function () {
        beforeEach(function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback(null, testData.book);
            return;
          };

          app.database.models.book.prototype.save = function (callback) {
            callback(null);
            return;
          };
          done();
        });

        it('should return 200', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback({
              "error": "error"
            }, null);
            return;
          };

          request(app)
            .put('/api/v1/books/1')
            .send(testData.books[1])
            .expect(200)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return json content', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback({
              "error": "error"
            }, null);
            return;
          };

          request(app)
            .put('/api/v1/books/1')
            .send(testData.books[1])
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              if (error) throw error;
              done();
            });
        });

        it('should return json error when no book found', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback(null, null);
            return;
          };

          request(app)
            .put('/api/v1/books/1')
            .send(testData.books[1])
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              var result = response.body;

              expect(result.error).to.exist();
              expect(result.error).to.equals('No book found.');

              if (error) throw error;
              done();
            });
        });

        it('should return error on db error', function (done) {
          app.database.models.book.findById = function (id, callback) {
            callback({
              "error": "error"
            }, null);
            return;
          };

          request(app)
            .put('/api/v1/books/1')
            .send(testData.books[1])
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              expect(response).to.exist();
              expect(response.body).to.exist();

              var result = response.body;
              expect(result.error).to.exist();
              expect(result.error).to.equals('error');

              if (error) throw error;
              done();
            });
        });

        it('should search, save in database and returning new data', function (done) {
          var searchSpy = new sinon.spy(),
            saveSpy = new sinon.spy();

          app.database.models.book.findById = function (id, callback) {
            searchSpy();
            book = _.clone(testData.book);
            book.save = function (callback) {
              saveSpy();
              callback(null);
              return;
            };

            callback(null, book);
            return;
          };

          var newBookData = {
            author: 'new',
            rate: 'new',
            readStart: 'new',
            readEnd: 'new',
            readProgress: 'new',
            title: 'new'
          };

          request(app)
            .put('/api/v1/books/1')
            .send(newBookData)
            .expect('Content-Type', /json/)
            .end(function (error, response) {
              if (error) throw error;
              expect(searchSpy.calledOnce).to.be.true();
              expect(saveSpy.calledOnce).to.be.true();
              expect(response.body).to.exist();

              var newBookData = response.body;

              expect(newBookData.title).to.be.equals('new');
              expect(newBookData.author).to.be.equals('new');
              expect(newBookData.readStart).to.be.equals('new');
              expect(newBookData.readEnd).to.be.equals('new');
              expect(newBookData.readProgress).to.be.equals('new');
              expect(newBookData.rate).to.be.equals('new');
              done();
            });
        });

      });
      // end PUT /books/:id

      // ------------------------------------------------------------
      // DELETE /books/:id
      // ------------------------------------------------------------

      describe.skip('on DELETE, it', function () {
        it('should delete', function (done) {
          // delete a book
          done();
        });
      });
      // end DELETE /books/:id

    }); // end /books/:id

  });
});
