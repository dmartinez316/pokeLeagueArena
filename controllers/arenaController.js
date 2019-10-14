const pokeLeagueArena = require('../src/pokeLeagueArena.js');
const arena = require('../src/arenaSimulator.js');


exports.simulateGet = function(req, res) {
    //resultados de prueba - Caso básico
    let resultados = ["Squirtle", "Bulbasaur", "Charmander", "Caterpie", "Pidgey"];
    //let pokeLeague= new pokeLeagueArena(resultados);
    //console.log('controller:'+pokeLeague.battleResults);
    let answer = arena.arenaSimulator(resultados);
    res.send('<p> '+ answer+ ' </p>');
};

exports.simulatePost = function(req, res) {
    //resultados de prueba - Caso básico
    //let resultados = ["Squirtle", "Bulbasaur", "Charmander", "Caterpie", "Pidgey"];
    var results = req.body.results;
    //console.log(name);
    let pokeLeague= new pokeLeagueArena(results);
    let answer = pokeLeague.simulate();
    res.send('<p> '+ answer+ ' </p>');
};


exports.aboutGet = function(req, res) {
    res.send('<p> Exercise description </p>');
};