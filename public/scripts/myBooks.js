"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    BooksRouter = require('scripts/router');

  return {
    start: function () {
      window.BooksApp = window.BooksApp || {};
      window.BooksApp.router = new BooksRouter();
      Backbone.history.start();
      console.log('books app started!');
    }
  }
});
