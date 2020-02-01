/*
 * Import functionality from other modules
 */
const constants = require("./constants");
const gameBoard = require("./game-board");
const tetrominoI = require("./tetromino-i");
const tetrominoO = require("./tetromino-o");
const tetrominoT = require("./tetromino-t");
const tetromino = require("./tetromino");

let currentTetramino = null;

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
const delay = scale / speed; // sec after which a figure drops by one square below

function obtainNewTetramino() {
    switch (Math.round(Math.random() * 2)) {
        case constants.TETROMINOS.I:
            currentTetramino = tetrominoI;
            break;
        case constants.TETROMINOS.O:
            currentTetramino = tetrominoO;
            break;
        case constants.TETROMINOS.T:
            currentTetramino = tetrominoT;
            break;
    }
    gameBoard.draw(currentTetramino.squares,
        currentTetramino.innerColor,
        currentTetramino.borderColors,
        false);
}

function run() {
    init();
    obtainNewTetramino();
    let prevTimestamp = Date.now(); // milliseconds

    const repaint = () => {
        const elapsed = Date.now() - prevTimestamp; // milliseconds
        if (elapsed / 1000 >= delay) {
            prevTimestamp = Date.now();
            if (!move()) {
                // Stop dropping the current tetromino, save its state and
                // reset the coordinates for the squares of the current tetromino
                currentTetramino.squares.forEach(square => gameBoard.bitmap[square.x][square.y] = true);
                currentTetramino.reset();

                // Initiate dropping new tetromino
                obtainNewTetramino();
            }
        }
        requestAnimationFrame(repaint);
    };
    requestAnimationFrame(repaint);
}

function move() {
    const updatedSquares = currentTetramino.squares.map(square => ({x: square.x, y: square.y + 1}));
    return tetromino.updateTetromino(currentTetramino, ...updatedSquares);
}

function init() {
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
            tetromino.moveLeft(currentTetramino);
        }
        if (event.code === "ArrowRight") {
            tetromino.moveRight(currentTetramino);
        }
        if (event.code === "KeyX" && currentTetramino.rotateClockwise) {
            currentTetramino.rotateClockwise();
        }
        if (event.code === "KeyZ" && currentTetramino.rotateCounterClockwise) {
            currentTetramino.rotateCounterClockwise();
        }
    });
}

module.exports = {
    run: run,
};
