var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  var msg = "API:<br/>";
  msg += "/v1 <br/>";
  response.send(msg);
});

module.exports = router;