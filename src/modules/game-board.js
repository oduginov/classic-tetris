const constants = require("./constants");
const square = require("./square");

const bitmap = new Array(constants.SIZE_FIELD.HEIGHT).fill(false);
bitmap.forEach((item, index, baseArray) => {
    baseArray[index] = new Array(constants.SIZE_FIELD.WIDTH);
    baseArray[index].fill(false);
});


function draw (coordinates, innerColor, borderColors, isFulfilled) {
    coordinates.forEach(s => square.paintSquare(s.x, s.y, innerColor, borderColors, isFulfilled));
}

module.exports = {
    draw: draw,
    bitmap: bitmap,
};
