const { paintSquare, eraseSquare } = require('./square');
const { SIZE_FIELD } = require('./constants');
const { clearCanvas } = require('./canvas');

// Bitmap of the game board
const bitmap = new Array(SIZE_FIELD.HEIGHT).fill(false);

// Initialize of the bitmap
bitmap.forEach((item, index, baseArray) => {
  baseArray[index] = new Array(SIZE_FIELD.WIDTH);
  baseArray[index].fill(false);
});

/**
 * Check whether square (x, y) is free?
 *
 * @param {number} x - The first coordinate of the square on the game board.
 * @param {number} y - The second coordinate of the square on the game board.
 * @returns {boolean} - True, if the square is free, and false, otherwise.
 */
function isSquareFree(x, y) {
  return !bitmap[y][x];
}

/**
 * Draw squares of a tetromino on the game board.
 *
 * @param squares - The array of the tetromino's squares.
 * @param innerColor - The color of inner area of the square.
 * @param borderColors - The array of the colors for the square border.
 */
function drawTetromino(squares, innerColor, borderColors) {
  squares.forEach(s => paintSquare(s.x, s.y, innerColor, borderColors));
}

/**
 * Put a square on the game board.
 *
 * @param x - The first coordinate on the game board.
 * @param y - The second coordinate on the game board.
 * @param innerColor - The color of inner area of the square.
 * @param borderColors - The array of the colors for the square border.
 */
function putSquare(x, y, innerColor, borderColors) {
  paintSquare(x, y, innerColor, borderColors);
  takeSquare(x, y);
}

/**
 * Erase of the tetromino squares on the game board.
 *
 * @param tetromino - Tetromino object (see, please, <./tetromino.js>)
 */
function eraseTetromino(tetromino) {
  tetromino.forEach(s => eraseSquare(s.x, s.y));
}

/**
 * Delete a square from the game board and bitmap.
 *
 * @param x - The first coordinate of the deleted square on the game board.
 * @param y - The second coordinate of the deleted square on the game board.
 */
function deleteSquare(x, y) {
  eraseSquare(x, y);
  bitmap[y][x] = false;
}

/**
 * Fix a square on the game board.
 *
 * @param x - The first coordinate of the deleted square on the game board.
 * @param y - The second coordinate of the deleted square on the game board.
 */
function takeSquare(x, y) {
  bitmap[y][x] = true;
}

/**
 * Get an array of row indices (on the game board) filled by tetrominos.
 *
 * @returns {[]} - The array of indices.
 */
function getFullLines() {
  const fullLines = [];
  bitmap.forEach((row, index) => {
    if (row.every(element => element)) {
      fullLines.push(index);
    }
  });
  return fullLines;
}

/**
 * Check whether the row with the index <row> is filled by tetrominos.
 *
 * @param row - The index of the line on the game board.
 * @returns {boolean}
 */
function isEmptyLine(row) {
  return bitmap[row].every(s => !s);
}

/**
 * Check whether the last by one row has a square of a tetromino. If it is, then
 * we finish current game.
 *
 * @returns {boolean}
 */
function isFullGameBoard() {
  return bitmap[1].some(item => item);
}

/**
 * Clear the game board and bitmap.
 */
function clearGameBoard() {
  clearCanvas();
  for (let i = 0; i < SIZE_FIELD.HEIGHT; i++) {
    for (let j = 0; j < SIZE_FIELD.WIDTH; j++) {
      bitmap[i][j] = false;
    }
  }
}

module.exports = {
  drawTetromino,
  eraseTetromino,
  getFullLines,
  deleteSquare,
  putSquare,
  isEmptyLine,
  isSquareFree,
  takeSquare,
  isFullGameBoard,
  clearGameBoard
};
