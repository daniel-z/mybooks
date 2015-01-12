"use strict";

var MyBooksRouter = Backbone.Router.extend({
  routes: {
    '': 'myBooks'
  },

  myBooks: function () {
    console.log('navigate root');

    var myBooksCollection = new BooksCollection();
    var myBooksView = new BooksView({
      books: myBooksCollection
    });
  }

});
