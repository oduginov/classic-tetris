const constants = require("./constants");
const square = require("./square");

/**
 * The current type of a tetromino
 * @type {number} Type of a tetromino
 */
const tetromino = constants.TETROMINOS.I;

const borderColors = ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"];
const innerColor = "#ffffff";

/**
 *
 * @type {*[]}
 */
const coordinates = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}];

const draw = function () {
    this.coordinates.forEach(point => square.paintSquare(point.x, point.y, innerColor, borderColors, false));
};

module.exports = {
    tetromino: tetromino,
    coordinates: coordinates,
    draw: draw
};
