const constants = require('./constants');
const square = require('./square');
const canvas = require('./canvas');

const bitmap = new Array(constants.SIZE_FIELD.HEIGHT).fill(false);
bitmap.forEach((item, index, baseArray) => {
  baseArray[index] = new Array(constants.SIZE_FIELD.WIDTH);
  baseArray[index].fill(false);
});

const isSquareFree = (x, y) => !bitmap[y][x];

const drawTetromino = (squares, innerColor, borderColors) =>
  squares.forEach(s => square.paintSquare(s.x, s.y, innerColor, borderColors));

const drawSquare = (x, y, innerColor, borderColors) => {
  square.paintSquare(x, y, innerColor, borderColors);
  takeSquare(x, y);
};

const eraseTetromino = tetromino =>
  tetromino.forEach(s => square.eraseSquare(s.x, s.y));

const eraseSquare = (x, y) => {
  square.eraseSquare(x, y);
  bitmap[y][x] = false;
};

const takeSquare = (x, y) => {
  bitmap[y][x] = true;
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

const isEmptyLine = line => bitmap[line].every(s => !s);

const isFullGameBoard = () => {
  return bitmap[1].some(item => item);
};

const clearGameBoard = () => {
  canvas.clearCanvas();
  for (let i = 0; i < constants.SIZE_FIELD.HEIGHT; i++) {
    for (let j = 0; j < constants.SIZE_FIELD.WIDTH; j++) {
      bitmap[i][j] = false;
    }
  }
};

module.exports = {
  drawTetromino,
  eraseTetromino,
  bitmap,
  getFullLines,
  eraseSquare,
  drawSquare,
  isEmptyLine,
  isSquareFree,
  takeSquare,
  isFullGameBoard,
  clearGameBoard
};
