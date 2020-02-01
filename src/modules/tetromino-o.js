const gameBoard = require("./game-board");
const constants = require("./constants");
const tetromino = require("./tetromino");

/*
 * Tetromino I
 */
const borderColors = ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"];
const innerColor = "#ffffff";

const squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}];

function reset() {
    for(let i = 0; i < 2; i++) {
        squares[i] = {x: 4 + i, y: 0};
        squares[i + 2] = {x: 4 + i, y: 1};
    }
}

module.exports = {
    borderColors: borderColors,
    innerColor: innerColor,
    squares: squares,
    reset: reset,
};
