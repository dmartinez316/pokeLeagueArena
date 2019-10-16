const pokeLeagueArena = require('../src/pokeLeagueArena.js');
var Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
/* const test = require('../src/test.js');

exports.generateTest = function(req, res) {
    //resultados de prueba - Caso básico
    let resultados = ["Squirtle", "Bulbasaur", "Charmander", "Caterpie", "Pidgey"];
    let resultados2 = ["Charmeleon","Weepinbell","Victreebel","Poliwag","Tentacool","Farfetchd","Venusaur","Shellder","Slowpoke"];
    let resultados3 = ["Charmeleon","Bulbasaur","Ivysaur","Weepinbell","Victreebel","Poliwag","Tentacool","Farfetchd","Venusaur","Shellder","Slowpoke"];
    let testCases = test.chomposGen();
    //res.send('<p> Test generated </p>');
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(testCases, null, 4));
    //res.json(testCases);
};  */


//Llamado asincrono a la API 
exports.simulatePost = async function(req, res) {
    try{
        //Llamado asincrono a la API 
        var pokedex = await P.getPokemonsList();
        //Obtener resultados de los parámetros enviados en el POST
        var finalStandings = req.body.results;
        //Instanciar la clase que contiene la lógica
        let pokeLeague = new pokeLeagueArena(finalStandings,pokedex.results);
        let answer = pokeLeague.simulate();
        //Enviar la respuesta
        res.json({ answer: answer });
    } catch(error){
        console.log(error);
    }
};