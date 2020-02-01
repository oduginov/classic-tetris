const gameBoard = require("./game-board");
const constants = require("./constants");
const tetromino = require("./tetromino");

/*
 * Tetromino I
 */
const borderColors = ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"];
const innerColor = "#ffffff";

const coordinates = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}];

function reset() {
    for(let i = 0; i < 4; i++) {
        coordinates[i] = {x: 3 + i, y: 0};
    }
}

function rotate() {
    // Check: whether the line tetromino is horizontal or vertical
    if (coordinates[0].y === coordinates[3].y) {
        // The line is horizontal.
        const y = coordinates[0].y;
        // Can we rotate our line tetromino?
        // Calculate new coordinates for squares of the line tetromino
        const firstSquare = {x: coordinates[2].x, y: coordinates[0].y - 2};
        const secondSquare = {x: coordinates[2].x, y: coordinates[1].y - 1};
        const thirdSquare = coordinates[2];
        const forthSquare = {x: coordinates[2].x, y: coordinates[3].y + 1};
        if (y <= constants.SIZE_FIELD.HEIGHT - 2 && // y >= 2 &&
            [firstSquare, secondSquare, thirdSquare, forthSquare]
                .every(square => !gameBoard.bitmap[square.x][square.y])) {
            // We can rotate the line left and do it.
            // const data = {coordinates: coordinates, innerColor: innerColor, borderColors: borderColors};
            tetromino.updateTetromino(this, firstSquare, secondSquare, thirdSquare, forthSquare);
        }
    } else {
        // The line is vertical
        const x = coordinates[0].x;
        // Calculate new coordinates for the squares of the line tetromino
        const firstSquare = {x: coordinates[0].x - 2, y: coordinates[2].y};
        const secondSquare = {x: coordinates[1].x - 1, y: coordinates[2].y};
        const thirdSquare = coordinates[2];
        const forthSquare = {x: coordinates[3].x + 1, y: coordinates[2].y};
        if (x >= 2 && x <= constants.SIZE_FIELD.WIDTH - 2 &&
            [firstSquare, secondSquare, thirdSquare, forthSquare]
                .every(square => !gameBoard.bitmap[square.x][square.y])) {
            // We can rotate the line right and do it.
            // const data = {coordinates: coordinates, innerColor: innerColor, borderColors: borderColors};
            tetromino.updateTetromino(this, firstSquare, secondSquare, thirdSquare, forthSquare);
        }
    }
}

module.exports = {
    borderColors: borderColors,
    innerColor: innerColor,
    coordinates: coordinates,
    rotate: rotate,
    reset: reset,
};
