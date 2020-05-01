const constants = require('./constants');
const canvas = require('./canvas');

function isOnGameBoard(x, y) {
  const isByX = x >= 0 && x < constants.SIZE_FIELD.WIDTH;
  const isByY = y >= 0 && y < constants.SIZE_FIELD.HEIGHT;
  return isByX && isByY;
}

/**
 * Get color of square on the game board.
 *
 * @param x - The first coordinate of the square on the game board.
 * @param y - The second coordinate of the square on the game board.
 * @returns {*}
 */
function getColorOfSquare(x, y) {
  const X = x * constants.LINE_PIXELS_IN_SQUARE;
  const Y = y * constants.LINE_PIXELS_IN_SQUARE;
  const color = canvas.getColorOfPixel(X, Y);
  const colors = [constants.RED, constants.BLUE, constants.PURPLE];
  return colors.reduce((acc, colorOfSquare) => {
    if (colorOfSquare.innerColor === color) {
      return colorOfSquare;
    }
    return acc;
  }, undefined);
}

/**
 * We paint square of a game zone, which is a piece of a tetromino.
 *
 * @param {Number} x - The first coordinate of the square on the game field. We have
 * the following restriction: 0 <= x <= constants.SIZE_FIELD.WIDTH.
 * @param {Number} y - The second coordinate of the square on the game field. Feasible
 * values of the variable y are defined as follows: 0 <= y <= constants.SIZE_FIELD.HEIGHT.
 * @param {String} innerColor - The main color for the body of a square in the hex code
 * @param {String[]} borderColors - The border colors for the body of a square in the hex code
 * @param {Function} drawPixel - The function for pixel drawing on a canvas
 * @param {Function} paintRect
 * @param shift
 */
function paintSquare(
  x,
  y,
  innerColor,
  borderColors,
  drawPixel = canvas.drawPixel,
  paintRect = canvas.paintRect,
  shift = { x: 0, y: 0 }
) {
  const borderSize = borderColors.length;

  /*
   * Draw the border of the square. The border is multilayer.
   * Outer layer has a level 0.
   */
  for (let layer = 0; layer < borderSize; layer++) {
    let X = x * constants.LINE_PIXELS_IN_SQUARE + layer + shift.x;
    let Y = y * constants.LINE_PIXELS_IN_SQUARE + layer + shift.y;
    const color = borderColors[layer];
    const size = constants.LINE_PIXELS_IN_SQUARE - 2 * layer;
    for (let i = 0; i <= 2 * size - 1; i++) {
      drawPixel(X, Y, color);
      if (X < (x + 1) * constants.LINE_PIXELS_IN_SQUARE - layer - 1 + shift.x) {
        drawPixel(X, Y + size - 1, color);
        X++;
      } else {
        drawPixel(X - size + 1, Y, color);
        Y++;
      }
    }
  }
  const x1 = x * constants.LINE_PIXELS_IN_SQUARE + borderSize + shift.x;
  const y1 = y * constants.LINE_PIXELS_IN_SQUARE + borderSize + shift.y;
  const eps = constants.LINE_PIXELS_IN_SQUARE - 2 * borderSize - 1;
  paintRect(x1, y1, x1 + eps, y1 + eps, innerColor);
}

/**
 * Erase a square on the game board with the specified board coordinates
 * @param x - The first board coordinate of the erased square.
 * @param y - The second board coordinate of the erased square.
 */
function eraseSquare(x, y) {
  paintSquare(x, y, constants.GAME_BOARD_COLOR, []);
}

module.exports = { paintSquare, eraseSquare, getColorOfSquare, isOnGameBoard };
