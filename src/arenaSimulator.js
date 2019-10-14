const pokeLeagueArena = require('./pokeLeagueArena.js');
var Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require('fs');


exports.arenaSimulator = function (finalStandings) {
    let nationalPokedex = JSON.parse(fs.readFileSync('pokedexFull.json', 'utf8'));
    let pokeLeague = new pokeLeagueArena(finalStandings, nationalPokedex);
    return pokeLeague.simulate();

    P.getPokemonsList()
        .then(function (response) {
            let pokedex = response;
            let pokeLeague = new pokeLeagueArena(finalStandings, pokedex);
            return pokeLeague.simulate();
        })
        .catch(error => {
            console.log(error);
        });
}