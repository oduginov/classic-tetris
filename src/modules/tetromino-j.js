const tetromino = require("./tetromino");
const constants = require("./constants");

module.exports = {
    type: constants.TETROMINOS.J,
    squares: [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}],
    innerColor: "#c00000", // "#ff2000", //"#cb1c00", //"#6d00ff", "#280000",
    //borderColors: ["#0c0000",  "#652413", "#5f2410", "#b33424", "#cb1c00"], // "#592616", //["#10002a", "#26005d", "#270061", "#4800ae", "#5e00de"],
    borderColors: ["#1c0000", "#490703", "#4c0600", "#8d0a15", "#8d0a15"],
    rotate: function (clockwise) {
        tetromino.rotateTetromino(this, clockwise);
    },
    reset: function () {
        this.squares = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}];
    }
};
