/*
 * Import functionality from other modules
 */
const constants = require("./constants");
const gameBoard = require("./game-board");
const tetrominoI = require("./tetromino-i");
const tetrominoO = require("./tetromino-o");
const tetrominoT = require("./tetromino-t");
const tetrominoJ = require("./tetromino-j");
const tetrominoL = require("./tetromino-l");
const tetromino = require("./tetromino");

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
let delay = scale / speed; // sec after which a figure drops by one square below
let prevDelay = 0;
let currentTetramino = null;
let downArrow = false;

function obtainNewTetramino() {
    switch (Math.round(Math.random() * 5)) {
        case constants.TETROMINOS.I:
            currentTetramino = tetrominoI;
            break;
        case constants.TETROMINOS.O:
            currentTetramino = tetrominoO;
            break;
        case constants.TETROMINOS.T:
            currentTetramino = tetrominoT;
            break;
        case constants.TETROMINOS.L:
            currentTetramino = tetrominoL;
            break;
        case constants.TETROMINOS.J:
            currentTetramino = tetrominoJ;
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
    return tetromino.move(currentTetramino, updatedSquares);
}

function init() {
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
            tetromino.moveLeft(currentTetramino);
        }
        if (event.code === "ArrowRight") {
            tetromino.moveRight(currentTetramino);
        }
        if (event.code === "ArrowDown") {
            if(!downArrow) {
                prevDelay = delay;
                delay = 0.05;
                downArrow = true;
            }
        }
        if (event.code === "KeyX" && currentTetramino.rotate) {
            currentTetramino.rotate(true);
        }
        if (event.code === "KeyZ" && currentTetramino.rotate) {
            currentTetramino.rotate(false);
        }
    });
    document.addEventListener("keyup", (event) => {
        if (event.code === "ArrowDown") {
            delay = prevDelay;
            downArrow = false;
        }
    });
}

module.exports = {
    run: run,
};
