const gameBoard = require("./game-board");
const constants = require("./constants");

function updateTetromino(data, firstSquare, secondSquare, thirdSquare, forthSquare) {
    gameBoard.draw(data.squares, "#000000", [], false);
    data.squares[0] = firstSquare;
    data.squares[1] = secondSquare;
    data.squares[2] = thirdSquare;
    data.squares[3] = forthSquare;
    gameBoard.draw(data.squares, data.innerColor, data.borderColors, false);
}

function moveLeft(data) {
    if (data.squares.every(square => square.x > 0 && !gameBoard.bitmap[square.x - 1][square.y])) {
        gameBoard.draw(data.squares, "#000000", [], false);
        data.squares.forEach(square => square.x--);
        gameBoard.draw(data.squares, data.innerColor, data.borderColors, false);
    }
}

function moveRight(data) {
    if (data.squares.every(square => square.x < constants.SIZE_FIELD.WIDTH - 1 && !gameBoard.bitmap[square.x + 1][square.y])) {
        gameBoard.draw(data.squares, "#000000", [], false);
        data.squares.forEach(square => square.x++);
        gameBoard.draw(data.squares, data.innerColor, data.borderColors, false);
    }
}

module.exports = {
    moveLeft: moveLeft,
    moveRight: moveRight,
    updateTetromino: updateTetromino,
};
