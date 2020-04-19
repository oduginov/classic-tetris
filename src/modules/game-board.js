const constants = require('./constants');
const square = require('./square');

const bitmap = new Array(constants.SIZE_FIELD.HEIGHT).fill(false);
bitmap.forEach((item, index, baseArray) => {
  baseArray[index] = new Array(constants.SIZE_FIELD.WIDTH);
  baseArray[index].fill(false);
});

const draw = (tetromino, innerColor, borderColors) =>
  tetromino.forEach(s => square.paintSquare(s.x, s.y, innerColor, borderColors));

const eraseTetromino = tetromino => tetromino.forEach(s => square.eraseSquare(s.x, s.y));

const eraseSquare = (x, y) => {
    square.eraseSquare(x, y);
    bitmap[y][x] = false;
};

const getFullLines = () => {
  const fullLines = [];
  bitmap.forEach((row, index) => {
    if (row.every(element => element)) {
      fullLines.push(index);
    }
  });
  return fullLines;
};

module.exports = { draw, eraseTetromino, bitmap, getFullLines, eraseSquare };
