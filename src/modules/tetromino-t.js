const constants = require("./constants");
const gameBoard = require("./game-board");
const tetromino = require("./tetromino");

/*
 * Tetromino T
 */
const borderColors = ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"];
const innerColor = "#ffffff";

const coordinates = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 5, y: 1}];

function reset() {
    coordinates[0] = {x: 4, y: 0};
    coordinates[1] = {x: 5, y: 0};
    coordinates[2] = {x: 6, y: 0};
    coordinates[3] = {x: 5, y: 1};
}

function rotateClockwise() {
    let firstSquare, secondSquare, thirdSquare, forthSquare;
    // Firstly, check: the tetromino is vertical or horizontal
    if (coordinates[0].x === coordinates[1].x) {
        // Here we have that the tetromino is vertical
        const x = coordinates[0].x;
        // Recalculate coordinates
        if (coordinates[3].x > x) {
            firstSquare = {x: coordinates[0].x - 1, y: coordinates[0].y - 1};
            secondSquare = coordinates[1];
            thirdSquare = {x: coordinates[2].x + 1, y: coordinates[2].y + 1};
            forthSquare = {x: coordinates[3].x - 1, y: coordinates[3].y + 1};
        } else {
            firstSquare = {x: coordinates[0].x + 1, y: coordinates[0].y + 1};
            secondSquare = coordinates[1];
            thirdSquare = {x: coordinates[2].x - 1, y: coordinates[2].y - 1};
            forthSquare = {x: coordinates[3].x + 1, y: coordinates[3].y - 1};
        }
    } else {
        // Out tetromino is horizontal
        const y = coordinates[0].y;
        if (coordinates[3].y > y) {
            firstSquare = {x: coordinates[0].x + 1, y: coordinates[0].y - 1};
            secondSquare = coordinates[1];
            thirdSquare = {x: coordinates[2].x - 1, y: coordinates[2].y + 1};
            forthSquare = {x: coordinates[3].x - 1, y: coordinates[3].y - 1};
        } else {
            firstSquare = {x: coordinates[0].x - 1, y: coordinates[0].y + 1};
            secondSquare = coordinates[1];
            thirdSquare = {x: coordinates[2].x + 1, y: coordinates[2].y - 1};
            forthSquare = {x: coordinates[3].x + 1, y: coordinates[3].y + 1};
        }
    }

    // Check: can we rotate our tetromino?
    const c = [firstSquare, secondSquare, thirdSquare, forthSquare];
    if (c.every(square => square.x >= 0 && square.x < constants.SIZE_FIELD.WIDTH) &&
        c.every(square => square.y >= 0 && square.y < constants.SIZE_FIELD.HEIGHT) &&
        c.every(square => !gameBoard.bitmap[square.x][square.y])) {
        // Yes, we can rotate and do it
        tetromino.updateTetromino(this, firstSquare, secondSquare, thirdSquare, forthSquare);
    }
}

/**
 * TODO Implement rotate the tetromino the counter clockwise
 */
function rotateCounterclockwise() {

}

module.exports = {
    borderColors: borderColors,
    innerColor: innerColor,
    coordinates: coordinates,
    rotateClockwise: rotateClockwise,
    reset: reset,
};
