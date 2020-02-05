const constants = require("./constants");
const square = require("./square");

const bitmap = new Array(constants.SIZE_FIELD.HEIGHT).fill(false);
bitmap.forEach((item, index, baseArray) => {
    baseArray[index] = new Array(constants.SIZE_FIELD.WIDTH);
    baseArray[index].fill(false);
});


function draw (tetromino, innerColor, borderColors) {
    tetromino.forEach(s => square.paintSquare(s.x, s.y, innerColor, borderColors));
}

function erase (tetromino){
    tetromino.forEach(s => square.eraseSquare(s.x, s.y));
}

module.exports = {
    draw: draw,
    erase: erase,
    bitmap: bitmap,
};
