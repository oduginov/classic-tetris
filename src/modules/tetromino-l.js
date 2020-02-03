const tetromino = require("./tetromino");
const constants = require("./constants");

function reset() {
    this.squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 4, y: 1}];
}


module.exports = {
    type: constants.TETROMINOS.L,
    squares: [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 4, y: 1}],
    innerColor: "#5882ff",
    borderColors: ["#182441", "#152141", "#1c2c56", "#3753a3", "#496ed9"],
    rotate: function (clockwise) {
        tetromino.rotateTetromino(this, clockwise);
    },
    reset: reset,
};
