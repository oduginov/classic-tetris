const tetromino = require("./tetromino");
const constants = require("./constants");

function reset() {
    this.squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 5, y: 1}];
}

/**
 * TODO Implement rotate the tetromino the counter clockwise
 */
function rotateCounterclockwise() {

}

module.exports = {
    squares: [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 5, y: 1}],
    innerColor: "#ffffff",
    borderColors: ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"],
    rotateClockwise: function () {
        return tetromino.rotateClockwise(this, constants.TETROMINOS.T)
    },
    rotateCounterClockwise: rotateCounterclockwise,
    reset: reset,
};
