const constants = require("./constants");

/* Declare and initialize variables for work with the canvas */

const canvas = document.getElementById("canvas");
canvas.width = constants.SIZE_FIELD.WIDTH * constants.LINE_PIXELS_IN_SQUARE;
canvas.height = constants.SIZE_FIELD.HEIGHT * constants.LINE_PIXELS_IN_SQUARE;

const context = canvas.getContext("2d");

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

module.exports = {
    drawPixel: drawPixel,
    paintRect: paintRect
};
