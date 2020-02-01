const gameBoard = require("./game-board");
const constants = require("./constants");

function updateTetromino(data, firstSquare, secondSquare, thirdSquare, forthSquare) {
    gameBoard.draw(data.coordinates, "#000000", [], false);
    data.coordinates[0] = firstSquare;
    data.coordinates[1] = secondSquare;
    data.coordinates[2] = thirdSquare;
    data.coordinates[3] = forthSquare;
    gameBoard.draw(data.coordinates, data.innerColor, data.borderColors, false);
}

function moveLeft(data) {
    if (data.coordinates.every(square => square.x > 0 && !gameBoard.bitmap[square.x - 1][square.y])) {
        gameBoard.draw(data.coordinates, "#000000", [], false);
        data.coordinates.forEach(square => square.x--);
        gameBoard.draw(data.coordinates, data.innerColor, data.borderColors, false);
    }
}

function moveRight(data) {
    if (data.coordinates.every(square => square.x < constants.SIZE_FIELD.WIDTH - 1 && !gameBoard.bitmap[square.x + 1][square.y])) {
        gameBoard.draw(data.coordinates, "#000000", [], false);
        data.coordinates.forEach(square => square.x++);
        gameBoard.draw(data.coordinates, data.innerColor, data.borderColors, false);
    }
}

module.exports = {
    moveLeft: moveLeft,
    moveRight: moveRight,
    updateTetromino: updateTetromino,
};
