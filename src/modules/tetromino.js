const gameBoard = require('./game-board');
const constants = require('./constants');

/**
 *
 * @param t
 * @param squares
 * @returns {boolean}
 */
function move(t, squares) {
  if (squares.every(square => square.x >= 0 && square.x < constants.SIZE_FIELD.WIDTH) &&
    squares.every(square => square.y >= 0 && square.y < constants.SIZE_FIELD.HEIGHT) &&
    squares.every(square => !gameBoard.bitmap[square.y][square.x])) {
    gameBoard.eraseTetromino(t.squares);
    t.squares = squares;
    gameBoard.draw(t.squares, t.innerColor, t.borderColors, false);
    return true;
  }
  return false;
}

/**
 *
 * @param tetromino
 * @returns {boolean}
 */
function moveLeft(tetromino) {
  const updatedSquares = tetromino.squares.map(square => ({ x: square.x - 1, y: square.y }));
  return move(tetromino, updatedSquares);
}

/**
 *
 * @param tetromino
 * @returns {boolean}
 */
function moveRight(tetromino) {
  const updatedSquares = tetromino.squares.map(square => ({ x: square.x + 1, y: square.y }));
  return move(tetromino, updatedSquares);
}

/**
 * Rotate a square `S` with the board coordinates (x1, y1) around a position
 * with the board coordinates (x0, y0) by 90 deg. If `clockwise` = true, then the rotation
 * is clockwise, otherwise counterclockwise. Calculate new board coordinates as follows:
 * (x, y)' = (x0, y0)' + A * (x1 - x0, y1 - y0)',
 * where ' is the transpose of vectors and A is the transformation matrix modelling the rotation
 * | 0        alpha |
 * | -alpha     0   |,
 * where alpha is 1 or -1.
 *
 * @param {number} x0 - The first coordinate of the rotation center
 * @param {number} y0 - The second coordinate of the rotation center
 * @param {number} x1 - The first coordinate of the rotated square
 * @param {number} y1 - The second coordinate of the rotated square
 * @param {boolean} clockwise - If true, then the rotation is clockwise,
 * otherwise counterclockwise
 *
 * @returns {*} - The board coordinates of new position for the square `S`.
 */
function rotate(x0, y0, x1, y1, clockwise) {
  const alpha = clockwise ? -1 : 1;
  const x = x0 + alpha * (y1 - y0);
  const y = y0 - alpha * (x1 - x0);
  return { x, y };
}

function rotateTetromino(t, clockwise) {
  const rotatedTetromino = t.squares.map(square => {
    const center = t.type === constants.TETROMINOS.I ? t.squares[2] : t.squares[1];
    return rotate(center.x, center.y, square.x, square.y, clockwise);
  });
  return move(t, rotatedTetromino);
}

module.exports = { moveLeft, moveRight, move, rotateTetromino };
