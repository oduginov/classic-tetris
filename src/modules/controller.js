const constants = require("./constants");
const game = require("./game");

/**
 * Start the game
 */
function startGame() {
    game.run();
}

module.exports = {
    startGame: startGame,
};
