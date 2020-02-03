const gameBoard = require("./game-board");
const constants = require("./constants");

/**
 *
 * @param t
 * @param squares
 * @returns {boolean}
 */
function move(t, squares) {
    if (squares.every(square => square.x >= 0 && square.x < constants.SIZE_FIELD.WIDTH) &&
        squares.every(square => square.y < constants.SIZE_FIELD.HEIGHT) &&
        squares.every(square => !gameBoard.bitmap[square.x][square.y])) {
        gameBoard.draw(t.squares, "#000000", [], false);
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
    const updatedSquares = tetromino.squares.map(square => ({x: square.x - 1, y: square.y}));
    return move(tetromino, updatedSquares);
}

/**
 *
 * @param tetromino
 * @returns {boolean}
 */
function moveRight(tetromino) {
    const updatedSquares = tetromino.squares.map(square => ({x: square.x + 1, y: square.y}));
    return move(tetromino, updatedSquares);
}

/**
 * Rotate a square `S` with the board coordinates (x1, y1) around a position
 * with the board coordinates (x0, y0). If `clockwise` = true, then the rotation
 * is clockwise, otherwise counterclockwise.
 *
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {boolean} clockwise
 * @returns {*} - The board coordinates of new position for the square `S`.
 */
function rotate(x0, y0, x1, y1, clockwise) {
    let alpha = clockwise ? -1 : 1;
    let beta = clockwise ? 1 : -1;
    const x = x0 + alpha * (y1 - y0);
    const y = y0 + beta * (x1 - x0);
    return {x: x, y: y};
}

function rotateTetromino(t, clockwise) {
    const rotatedTetromino = t.squares.map(square => {
        let center = t.type === constants.TETROMINOS.I ? t.squares[2] : t.squares[1];
        return rotate(center.x, center.y, square.x, square.y, clockwise);
    });
    return move(t, rotatedTetromino);
}

module.exports = {
    moveLeft: moveLeft,
    moveRight: moveRight,
    move: move,
    rotateTetromino: rotateTetromino,
};
