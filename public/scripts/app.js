'use strict';
/*global require*/
require.config({
  baseUrl: "",
  paths: {
    'jquery': 'libs/jquery/dist/jquery.min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
    'text': 'libs/requirejs-text/text',
    'hb': 'libs/requirejs-handlebars/hb',
    'handlebars.runtime': 'libs/handlebars/dist/handlebars.runtime.amd'
  },
  packages: [{
    name: 'handlebars',
    location: 'libs/handlebars/dist/amd',
    main: './handlebars'
  }],
  shim: {}, // used for setting up all Shims (see below for more detail)
});

require(['jquery', 'underscore', 'backbone', 'scripts/myBooks'], function ($, _, Backbone, myBooksApp) {
  myBooksApp.start();
});
