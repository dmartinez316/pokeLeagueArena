const urlPokeAPI = "https://pokeapi.co/api/v2/";
var exports = module.exports = {};
var Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

exports.getFullPokedex = function (){
    return P.getPokemonsList();/* 
    .then (response =>{        
        return response;
    })
    .catch(error => {
        return error;
    }) */
}
