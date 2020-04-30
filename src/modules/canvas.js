const constants = require('./constants');

/* Declare and initialize variables for work with the canvas */

const canvas = document.getElementById('canvas');
const cols = constants.SIZE_FIELD.WIDTH * constants.LINE_PIXELS_IN_SQUARE;
const rows = constants.SIZE_FIELD.HEIGHT * constants.LINE_PIXELS_IN_SQUARE;
canvas.width = cols;
canvas.height = rows;

const context = canvas.getContext('2d');

canvas.style.backgroundColor = constants.GAME_BOARD_COLOR;

/**
 * Paint a pixel of the canvas with given coordinates (x, y) in the specified color.
 * @param x - The first canvas coordinate of a pixel
 * @param y - The second canvas coordinate of a pixel
 * @param color - The color of a pixel
 */
function drawPixel(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
}

function paintRect(x1, y1, x2, y2, color) {
  context.fillStyle = color;
  context.fillRect(x1, y1, Math.abs(x2 - x1 + 1), Math.abs(y2 - y1 + 1));
}

function getColorOfPixel(x, y) {
  const center = {
    x: x + Math.floor(constants.LINE_PIXELS_IN_SQUARE / 2),
    y: y + Math.floor(constants.LINE_PIXELS_IN_SQUARE / 2)
  };
  return rgbaToHex(
    Array.from(context.getImageData(center.x, center.y, 1, 1).data)
  );
}

/**
 * Given a specific color in the rgba format [r, g, b, a], we obtain the hex code of the color.
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @returns {string} HexCode of the given color
 */
function rgbaToHex([r, g, b]) {
  return `#${[r.toString(16), g.toString(16), b.toString(16)]
    .map(c => (c === '0' ? '00' : c))
    .join('')}`;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

module.exports = {
  canvasSize: { rows, cols },
  drawPixel,
  paintRect,
  getColorOfPixel,
  clearCanvas
};
