const pokeLeagueArena = require('../src/pokeLeagueArena.js');
const arena = require('../src/arenaSimulator.js');
//const test = require('../src/test.js');

/* exports.simulateGet = function(req, res) {
    //resultados de prueba - Caso básico
    let resultados = ["Squirtle", "Bulbasaur", "Charmander", "Caterpie", "Pidgey"];
    let resultados2 = ["Charmeleon","Weepinbell","Victreebel","Poliwag","Tentacool","Farfetchd","Venusaur","Shellder","Slowpoke"];
    let resultados3 = ["Charmeleon","Bulbasaur","Ivysaur","Weepinbell","Victreebel","Poliwag","Tentacool","Farfetchd","Venusaur","Shellder","Slowpoke"];

    //test.chomposGen();
    let answer = arena.arenaSimulator(resultados3);
    res.send('<p> '+ answer+ ' </p>');
}; */

exports.simulatePost = function(req, res) {
    var results = req.body.results;
    let answer = arena.arenaSimulator(results);
    res.json({ answer: answer });
};