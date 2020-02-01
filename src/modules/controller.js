const constants = require("./constants");
const drop = require("./drop");
const tetromino = require("./tetromino");
const tetrominoI = require("./tetromino-i");
const tetrominoO = require("./tetromino-o");
const tetrominoT = require("./tetromino-t");

function addEventListeners() {
    document.addEventListener("keydown", (event) => {
        if (drop.type === constants.TETROMINOS.I) {
            if (event.code === "ArrowLeft") {
                tetromino.moveLeft(tetrominoI);
            }
            if (event.code === "ArrowRight") {
                tetromino.moveRight(tetrominoI);
            }
            if (event.code === "KeyZ" || event.code === "KeyX") {
                tetrominoI.rotate();
            }
        }
        if(drop.type === constants.TETROMINOS.O) {
            if (event.code === "ArrowLeft") {
                tetromino.moveLeft(tetrominoO);
            }
            if (event.code === "ArrowRight") {
                tetromino.moveRight(tetrominoO);
            }
        }
        if(drop.type === constants.TETROMINOS.T) {
            if (event.code === "ArrowLeft") {
                tetromino.moveLeft(tetrominoT);
            }
            if (event.code === "ArrowRight") {
                tetromino.moveRight(tetrominoT);
            }
            if(event.code === "KeyX") {
                tetrominoT.rotateClockwise();
            }
        }
    });
}

/**
 * Start the game
 */
function startGame() {
    addEventListeners();
    drop.run();
}

module.exports = {
    startGame: startGame,
};
