'use strict';

var BookModel = Backbone.Model.extend({
  initialize: function (options) {},
  url: '/api/v1/book',
  parse: function (data) {
    data.id = data._id;
    return data;
  }
});
