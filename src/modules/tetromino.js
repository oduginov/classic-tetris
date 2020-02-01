const gameBoard = require("./game-board");
const constants = require("./constants");

function updateTetromino(data, firstSquare, secondSquare, thirdSquare, forthSquare) {
    const c = [firstSquare, secondSquare, thirdSquare, forthSquare];
    if (c.every(square => square.x >= 0 && square.x < constants.SIZE_FIELD.WIDTH) &&
        c.every(square => square.y < constants.SIZE_FIELD.HEIGHT) &&
        c.every(square => !gameBoard.bitmap[square.x][square.y])) {
        gameBoard.draw(data.squares, "#000000", [], false);
        data.squares = c;
        gameBoard.draw(data.squares, data.innerColor, data.borderColors, false);
        return true;
    }
    return false;
}

function moveLeft(data) {
    const updatedSquares = data.squares.map(square => ({x: square.x - 1, y: square.y}));
    updateTetromino(data, ...updatedSquares);
}

function moveRight(data) {
    const updatedSquares = data.squares.map(square => ({x: square.x + 1, y: square.y}));
    updateTetromino(data, ...updatedSquares);
}

module.exports = {
    moveLeft: moveLeft,
    moveRight: moveRight,
    updateTetromino: updateTetromino,
};
