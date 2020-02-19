const constants = require("./constants");
const canvas = require("./canvas");
const gameBoard = require("./game-board");

/**
 * We paint square of a game zone, which is a piece of a tetromino.
 *
 * @param {Number} x - The first coordinate of the square on the game field. We have
 * the following restriction: 0 <= x <= constants.SIZE_FIELD.WIDTH.
 * @param {Number} y - The second coordinate of the square on the game field. Feasible
 * values of the variable y are defined as follows: 0 <= y <= constants.SIZE_FIELD.HEIGHT.
 * @param {String} innerColor - The main color for the body of a square in the hex code
 * @param {String[]} borderColors - The border colors for the body of a square in the hex code
 */
function paintSquare(x, y, innerColor, borderColors) {
    const borderSize = borderColors.length;

    /*
    * Draw the border of the square. The border is multilayer.
    * Outer layer has a level 0.
    */
    for (let layer = 0; layer < borderSize; layer++) {
        let X = x * constants.LINE_PIXELS_IN_SQUARE + layer;
        let Y = y * constants.LINE_PIXELS_IN_SQUARE + layer;
        const color = borderColors[layer];
        const size = constants.LINE_PIXELS_IN_SQUARE - 2 * layer;
        for (let i = 0; i <= 2 * size - 1; i++) {
            canvas.drawPixel(X, Y, color);
            if (X < (x + 1) * constants.LINE_PIXELS_IN_SQUARE - layer - 1) {
                canvas.drawPixel(X, Y + size - 1, color);
                X++;
            } else {
                canvas.drawPixel(X - size + 1, Y, color);
                Y++;
            }
        }
    }
    const x1 = x * constants.LINE_PIXELS_IN_SQUARE + borderSize;
    const y1 = y * constants.LINE_PIXELS_IN_SQUARE + borderSize;
    const eps = constants.LINE_PIXELS_IN_SQUARE - 2 * borderSize - 1;
    canvas.paintRect(x1, y1, x1 + eps, y1 + eps, innerColor);
}

/**
 * Erase a square on the game board with the specified board coordinates
 * @param x - The first board coordinate of the erased square
 * @param y - The second board coordinate of the erased square
 */
function eraseSquare(x, y) {
    paintSquare(x, y, constants.GAME_BOARD_COLOR, []);
    gameBoard.bitmap[y][x] = false;
}

function copySquare(x1, y1, x2, y2) {
    let X1 = x1 * constants.LINE_PIXELS_IN_SQUARE;
    let Y1 = y1 * constants.LINE_PIXELS_IN_SQUARE;
    let X2 = x2 * constants.LINE_PIXELS_IN_SQUARE;
    let Y2 = y2 * constants.LINE_PIXELS_IN_SQUARE;
    for (let i = 0; i < constants.LINE_PIXELS_IN_SQUARE; i++) {
        for (let j = 0; j < constants.LINE_PIXELS_IN_SQUARE; j++) {

        }
    }
}

/**
 * Model square of a tetromino.
 * @type {{paintSquare: *}}
 */
module.exports = {
    paintSquare: paintSquare,
    eraseSquare: eraseSquare,
};
