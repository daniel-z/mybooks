'use strict';
/*global require*/
require.config({
  baseUrl: "",
  paths: {
    'jquery': 'libs/jquery/dist/jquery.min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
  },
  shim: {}, // used for setting up all Shims (see below for more detail)
});

require(['jquery', 'underscore', 'backbone', 'scripts/myBooks'], function ($, _, Backbone,  myBooksApp) {
  console.log('modules loaded'); 
  myBooksApp.start();
});
