"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tmp = require('hb!templates/mybooks.hbs'),
    table_tmp = require('hb!templates/mybooks_table.hbs');

  return Backbone.View.extend({
    initialize: function (options) {
      this.books = options.books;
      this.books.on('sync', this.render, this);
      this.books.fetch({
        error: this.booksError
      });
    },

    booksError: function (collection, response, options) {
      console.error(response);
    },

    render: function () {
      this.$el.html(tmp());
      this.$el.append(table_tmp({
        books: this.books.models
      }));
    }
  });
});
