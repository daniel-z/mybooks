"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    form_tmp = require('hb!templates/mybooks_form.hbs');

  return Backbone.View.extend({
    tagName: 'section',
    id: '#myBook',
    initialize: function (options) {
      this.book = options.book;

      this.listenTo(this.book, 'sync', this.render);
      this.listenTo(this.book, 'destroy', this.remove);

      this.book.fetch({
        error: this.bookError
      });
    },

    selectors: {
      form: 'form#editBook'
    },

    events: {
      'click form#editBook [type=submit]': 'saveBook',
    },

    bookSuccess: function (model, response, options) {
      console.info('book "' + model.get('title') + '" saved successfully!');
    },

    bookError: function (model, response, options) {
      console.error(response);
    },

    formToObject: function ($form) {
      var formObject = {}
      _.each($form.find('input, select'), function (element, index) {
        if ($(element).attr('type') !== 'submit') {
          formObject[$(element).attr('name')] = $(element).val();
        }
      });
      return formObject;
    },

    saveBook: function (event) {
      event.preventDefault();
      this.book.save(this.formToObject($(this.selectors.form)), {
        wait: true,
        success: this.bookSuccess,
        error: this.bookError
      });
    },

    render: function () {
      var params = {
        book: this.book.attributes
      };
      params['selected' + this.book.attributes.rate] = true;
      this.$el.html(form_tmp(params));
      $('body').append(this.$el);
      return this;
    }
  });
});
