const gameBoard = require("./game-board");
const constants = require("./constants");
const tetromino = require("./tetromino");

/*
 * Tetromino I
 */
const borderColors = ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"];
const innerColor = "#ffffff";

const squares = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}];

function reset() {
    for (let i = 0; i < 4; i++) {
        squares[i] = {x: 3 + i, y: 0};
    }
}

function rotate() {
    // Check: whether the line tetromino is horizontal or vertical
    let firstSquare, secondSquare, thirdSquare, forthSquare;
    if (squares[0].y === squares[3].y) {
        // The line is horizontal.
        // Calculate new coordinates for squares of the tetromino-i
        firstSquare = {x: squares[2].x, y: squares[0].y - 2};
        secondSquare = {x: squares[2].x, y: squares[1].y - 1};
        thirdSquare = squares[2];
        forthSquare = {x: squares[2].x, y: squares[3].y + 1};
    } else {
        // The line is vertical.
        // Calculate new squares for the squares of the tetromino-i
        firstSquare = {x: squares[0].x - 2, y: squares[2].y};
        secondSquare = {x: squares[1].x - 1, y: squares[2].y};
        thirdSquare = squares[2];
        forthSquare = {x: squares[3].x + 1, y: squares[2].y};
    }

    // Can we rotate our line tetromino?
    const c = [firstSquare, secondSquare, thirdSquare, forthSquare];
    if (c.every(square => square.x >= 0 && square.x < constants.SIZE_FIELD.WIDTH) &&
        c.every(square => square.y < constants.SIZE_FIELD.HEIGHT) &&
        c.every(square => !gameBoard.bitmap[square.x][square.y])) {
        // We can rotate the line right and do it.
        tetromino.updateTetromino(this, firstSquare, secondSquare, thirdSquare, forthSquare);
    }
}

module.exports = {
    borderColors: borderColors,
    innerColor: innerColor,
    squares: squares,
    rotate: rotate,
    reset: reset,
};
