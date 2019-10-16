var express = require('express');
var router = express.Router();

var arenaController = require('../controllers/arenaController.js');

//Crear casos de prueba en el servidor
//router.get('/generateTest', arenaController.generateTest);


//Enrutamiento a la url que contiene el método para resolver el ejercicio
router.post('/simulate', arenaController.simulatePost);  

module.exports = router;