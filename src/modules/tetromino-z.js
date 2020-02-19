const tetromino = require("./tetromino");
const constants = require("./constants");

module.exports = {
    type: constants.TETROMINOS.Z,
    borderColors: ["#1c0000", "#490703", "#4c0600", "#8d0a15", "#8d0a15"],
    innerColor: "#c00000", // "#ff2000",
    squares: [{x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 0}, {x: 6, y: 0}],
    rotate: function (clockwise) {
        tetromino.rotateTetromino(this, clockwise);
    },
    reset: function() {
        for (let i = 1; i <= 2; i++) {
            this.squares[i - 1] = {x: 3 + i, y: 1};
            this.squares[i + 1] = {x: 4 + i, y: 0};
        }
    }
};
