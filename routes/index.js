var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokemon Battle Simulator', server_name:'https://sleepy-plains-58854.herokuapp.com/' });
});

module.exports = router;
