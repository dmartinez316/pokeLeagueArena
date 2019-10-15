var express = require('express');
var router = express.Router();

var arenaController = require('../controllers/arenaController.js');


//post simulate
router.get('/simulateGet', arenaController.simulateGet);
//post simulate
router.post('/simulate', arenaController.simulatePost);
  

module.exports = router;