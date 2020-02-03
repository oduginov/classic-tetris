const tetromino = require("./tetromino");
const constants = require("./constants");

function reset() {
    this.squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}];
}


function rotateCounterclockwise(){

}

module.exports = {
    squares: [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}],
    innerColor: "#6d00ff",
    borderColors: ["#10002a", "#26005d", "#270061", "#4800ae", "#5e00de"],
    rotateClockwise: function () {
        return tetromino.rotateClockwise(this, constants.TETROMINOS.J)
    },
    rotateCounterClockwise: rotateCounterclockwise,
    reset: reset,
};
