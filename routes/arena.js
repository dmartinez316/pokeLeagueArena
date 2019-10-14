var express = require('express');
var router = express.Router();

var arenaController = require('../controllers/arenaController.js');


//post simulate
router.get('/simulateGet', arenaController.simulateGet);
//post simulate
router.post('/simulatePost', arenaController.simulatePost);
//about
router.get('/about', arenaController.aboutGet);   

module.exports = router;