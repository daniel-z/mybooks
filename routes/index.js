var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
      title: 'My Bookshelf'
    });
  })
  .get('/mybooks', function (req, res) {
    res.render('mybooks', {
      title: 'My Bookshelf - API Work'
    });
  });

module.exports = router;
