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
const tetrominoZ = require("./tetromino-z");
const tetrominoS = require("./tetromino-s");
const tetromino = require("./tetromino");
const square = require("./square");

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
let delay = scale / speed; // sec after which a figure drops by one square below
let secPerAction = 0.2; // seconds per one action under lines burning
let prevDelay = 0;
let currentTetramino = null;
let isPressedDownArrow = false;
let isStoppedDropTetromino = false;


function obtainNewTetramino() {
    switch (Math.round(Math.random() * 6)) {
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
        case constants.TETROMINOS.Z:
            currentTetramino = tetrominoZ;
            break;
        case constants.TETROMINOS.S:
            currentTetramino = tetrominoS;
            break;
    }
    gameBoard.draw(currentTetramino.squares,
        currentTetramino.innerColor,
        currentTetramino.borderColors);
}

function run() {
    init();
    obtainNewTetramino();
    let prevTimestamp = Date.now(); // milliseconds
    let fullLines = [];
    let burnSquare = constants.SIZE_FIELD.WIDTH / 2;

    const repaint = () => {
        const elapsed = Date.now() - prevTimestamp; // milliseconds
        if (isStoppedDropTetromino) {
            // Here we burn full lines step by step
            if (burnSquare < constants.SIZE_FIELD.WIDTH) {
                fullLines.forEach((line, index) => {
                    square.eraseSquare(burnSquare, fullLines[index]);
                });
                fullLines.forEach((line, index) => {
                    square.eraseSquare(constants.SIZE_FIELD.WIDTH - burnSquare - 1, fullLines[index]);
                });
                burnSquare++;
            } else if (fullLines.length !== 0) {
                const line = fullLines.pop();
                fullLines.forEach((item, index, baseArray) => baseArray[index]++);
                for (let i = 0; i < constants.SIZE_FIELD.WIDTH; i++) {
                    if (gameBoard.bitmap[line - 1][i]) {
                        gameBoard.bitmap[line][i] = true;

                    }
                }
            } else {
                delay = prevDelay;
                isStoppedDropTetromino = false;
            }
        } else if (elapsed / 1000 >= delay) {
            prevTimestamp = Date.now();
            if (!move()) {

                // Stop dropping the current tetromino, save its state
                currentTetramino.squares.forEach(square => gameBoard.bitmap[square.y][square.x] = true);

                // Check: are there full rows and burn their ?
                fullLines = gameBoard.findFullLines(currentTetramino.squares);
                fullLines.sort();
                if (fullLines.length !== 0) {
                    // Full lines exist and we have to burn their
                    isStoppedDropTetromino = true;
                    prevDelay = delay;
                    delay = secPerAction;
                }

                // Reset the coordinates for the squares of the current tetromino
                currentTetramino.reset();

                if (!isStoppedDropTetromino) {
                    // Initiate dropping new tetromino
                    obtainNewTetramino();
                }
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
        if (isStoppedDropTetromino) {
            return;
        }
        if (event.code === "ArrowLeft") {
            tetromino.moveLeft(currentTetramino);
        }
        if (event.code === "ArrowRight") {
            tetromino.moveRight(currentTetramino);
        }
        if (event.code === "ArrowDown") {
            if (!isPressedDownArrow) {
                prevDelay = delay;
                delay = 0.05;
                isPressedDownArrow = true;
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
            isPressedDownArrow = false;
        }
    });
}

module.exports = {
    run: run,
};
