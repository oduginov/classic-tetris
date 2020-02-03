const tetromino = require("./tetromino");
const constants = require("./constants");

function reset() {
    this.squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}];
}


module.exports = {
    type: constants.TETROMINOS.J,
    squares: [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}],
    innerColor: "#6d00ff",
    borderColors: ["#10002a", "#26005d", "#270061", "#4800ae", "#5e00de"],
    rotate: function (clockwise){
      tetromino.rotateTetromino(this, clockwise);
    },
    reset: reset,
};
