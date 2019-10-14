const services = require('./services.js');

//const fs = require('fs');

class PokeLeagueArena {
    constructor(battleResults,pokedex) {
        this.pokedex = pokedex;
        this.battleResults = battleResults;
        this.invalidChallenges = false;
        this.challengesByPokemon = {};
        this.initialStandings = [];
        this.finalStandings = [];
        this.stateHistory = [];
    }

    simulate() {
        console.log('pokeLeagueArena.simulate()');
        this.getStandings();
        return this.getMinimumMovements();

    }

    //Método que realiza la iteración hasta que se encuentra la solución 
    //o se encuentra que no es valido el array de entrada
    getMinimumMovements() {
        //clonamos el array inicial
        console.log('getMinimumMovements');
        let currentState = [...this.initialStandings];

        //iteramos mientras los arrays no sean iguales y mientras se invalide el ejercicio
        var count = 0;
        while ((this.finalStandings.equals(currentState) != true) && (this.invalidChallenges != true)) {
            //se itera por el orden en el q empieza el torneo
            for (var currentPos = 0; currentPos < this.initialStandings.length; currentPos++) {
                //obtener la posición final del elemento que está evaluando
                let finalPos = this.finalStandings.indexOf(currentState[currentPos]);
                //console.log(currentState[currentPos]);
                //console.log('final:'+finalPos);
                //comparar la posición actual con la final, se determina si sube o baja
                if (currentPos > finalPos) {
                    this.battleToPosition(currentState, currentPos, finalPos);
                }
                //console.log('currentpos:'+currentPos);

                //this.invalidChallenges = true;
            }

        }
        console.log(this.challengesByPokemon);
        if (this.invalidChallenges == false) {
            const movementsByPokemon = Object.values(this.challengesByPokemon);
            let minimumMovs = 0;

            for (var i = 0; i < movementsByPokemon.length; i++) {
                minimumMovs = minimumMovs + movementsByPokemon[i];
            }
            return minimumMovs;
        } else {
            return 'Too chaotic';
        }

    }

    //Método para inicializar los arrays iniciales y finales
    //con lso cuales se realiza la simulación
    getStandings() {
        let pokedexArray = new Array();
        let formatedFinalStandings = [...this.battleResults];
        let initialStandings = new Array();
        let finalStandings = new Array();

        //crear un array de solo nombres de pokemon, el indice +1 es el numero de pokedex
        for (var j in this.pokedex) {
            pokedexArray.push(this.pokedex[j].name.toLowerCase());
        }
        //quitar uppercase a resultados
        for (var i = 0; i < formatedFinalStandings.length; i++) {
            formatedFinalStandings[i] = formatedFinalStandings[i].toLowerCase();
        }
        //crear array inicial ordernado por número de pokedex
        for (var i = 0; i < pokedexArray.length; i++) {
            let index = formatedFinalStandings.indexOf(pokedexArray[i]);
            if (index != -1) {
                initialStandings.push(i + 1);
            }
        }
        //crear array final  por número de pokedex
        for (var i = 0; i < formatedFinalStandings.length; i++) {
            let index = pokedexArray.indexOf(formatedFinalStandings[i]);
            if (index != -1) {
                finalStandings.push(index + 1);
            }
        }
        this.finalStandings = finalStandings;
        this.initialStandings = initialStandings;
        console.log([this.initialStandings, this.finalStandings]);
    }

    //Método que se encarga de mover el pokemon a su posición final y validar 
    //si puede o no moverse ahi 
    battleToPosition(currentState, currentPos, finalPos) {
        this.saveStatesHistory(currentState);
        let currentPosition = currentPos;

        console.log(currentState[currentPos]);
        console.log('current:' + currentPos);
        console.log('final:' + finalPos);


        //obtener los movimientos que tiene el pokemon (pueden ser null,1 o 2)
        let pkmnRemainingChallenges = this.challengesByPokemon[currentState[currentPos]];
        console.log('challs:'+pkmnRemainingChallenges);
        //verificar cuantos retos le quedan al pokemon
        if (pkmnRemainingChallenges === undefined || pkmnRemainingChallenges == 1) {
            //cuantas posiciones se va a mover
            let positionsToClimb = currentPos - finalPos;
            console.log('postoclimb:'+positionsToClimb);
            //si solo se debe mover 1
            if (positionsToClimb == 1) {
                //PODRIA DARSE EL CASO QUE EL TARGET TENGA SU POSICION FINAL???
                //verificar si con el q va a retar esta en su pos final, no dejar cambiarlo si es asi
                if (currentPos - 1 != this.finalStandings.indexOf(currentState[rivalsPositions[0]])) {
                    this.climbLadder(currentState, currentPos, finalPos);
                }
            }
            //si se debe mover 2 
            else if (positionsToClimb == 2) {
                // si voy a subir 2, tengo que verificar que el pokemon del medio no este en la pos final
                //si esta debo sumarle un movimiento para q pueda permanecer
                let rivalsPositions = [currentPos - 1, currentPos - 2];
                if (rivalsPositions[0] == this.finalStandings.indexOf(currentState[rivalsPositions[0]])) {
                    //el primer rival vence al segundo y suma un movimiento
                    //con el objetivo de q quede en el mismo lugar
                    this.climbLadder(currentState, rivalsPositions[0], rivalsPositions[1]);
                    // se reta el primero
                    this.climbLadder(currentState, currentPosition, rivalsPositions[0]);
                    //actualiza posición actual
                    currentPosition = currentPosition - 1;
                    //se elimina un rival
                    rivalsPositions.splice(0, 1);
                    //se vence el segundo rival
                    this.climbLadder(currentState, currentPosition, rivalsPositions[0]);
                } else {
                    //los dos rivales van a bajar
                    // se reta el primero
                    this.climbLadder(currentState, currentPosition, rivalsPositions[0]);
                    //actualiza posición actual
                    currentPosition = currentPosition - 1;
                    //se elimina un rival
                    rivalsPositions.splice(0, 1);
                    //se vence el segundo rival
                    this.climbLadder(currentState, currentPosition, rivalsPositions[0]);
                }
  /*               //aumenta los movimientos del pokemon que se mueve
                this.increaseChallenges(currentState[currentPos]);
                //mueve el pokemon de posición (solo sube)
                this.array_move(currentState, currentPos, finalPos); */
            }
            else {
                //no puede ser mayor a 2
                this.invalidChallenges = true;
            }
        }
        //tiene 2 movimientos y no puede retar mas
        else {
            //tiene 2 movimientos, no puede subir mas, muy caotico
            this.increaseChallenges(currentState[currentPos]);
        }
        console.log(currentState);
    }

    //Método que realiza el movimiento y suma los movimientos al pokemon
    climbLadder(currentStandings, initialPos, finalPos) {
        //mueve el pokemon de posición (solo sube)
        this.array_move(currentStandings, initialPos, finalPos);
        //aumenta movimientos del pokemon
        this.increaseChallenges(currentStandings[initialPos]);
    }

    //Método que realiza la suma de movimientos al pokemon
    increaseChallenges(pokemon) {
        let pkmChallenges = this.challengesByPokemon[pokemon];
        if (pkmChallenges === undefined) {
            this.challengesByPokemon[pokemon] = 1;
        }
        else if (pkmChallenges == 1) {
            this.challengesByPokemon[pokemon] = 2;
        }
        else if (pkmChallenges == 2) {
            this.challengesByPokemon[pokemon] = 3;
            this.invalidChallenges = true;
        }
    }

    //Método que guarda el historial de estados 
    saveStatesHistory(currentState) {
        this.stateHistory.push(currentState);
    }

    //Método que mueve un elemento dado una posición inicial y una final
    //desplazando los otros elementos
    array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        //return arr; // for testing
    }
}

module.exports = PokeLeagueArena;



//Agregar al prototipo de array un método para comparar arrays
// Warn if overriding existing method
(function () {
    if (Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", { enumerable: false });
})();
