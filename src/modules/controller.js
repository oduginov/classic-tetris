const constants = require("./constants");
const drop = require("./drop");

/**
 * The current type of a tetromino
 * @type {number} Type of a tetromino
 */
const tetromino = constants.TETROMINOS.I;

/**
 *  TODO: add generation a random type of a tetromino
 */
function getRandomTetrominoType() {

}


function addEventListeners() {

}

/**
 * Start the game
 */
function startGame() {
    drop.run(constants.TETROMINOS.I);
}

module.exports = {
    startGame: startGame,
};
