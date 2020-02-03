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

function moveLeft(tetromino) {
    const updatedSquares = tetromino.squares.map(square => ({x: square.x - 1, y: square.y}));
    updateTetromino(tetromino, ...updatedSquares);
}

function moveRight(tetromino) {
    const updatedSquares = tetromino.squares.map(square => ({x: square.x + 1, y: square.y}));
    updateTetromino(tetromino, ...updatedSquares);
}

/**
 *
 * @param type - It is a type of tetromino from the set
 *               {constants.TETROMINOS.L, constants.TETROMINOS.J, constants.TETROMINOS.T}
 * @param tetromino -
 */
function rotateClockwise(tetromino, type) {
    let firstSquare, secondSquare = tetromino.squares[1], thirdSquare, forthSquare;
    // Firstly, check: the tetromino is vertical or horizontal
    if (tetromino.squares[0].x === tetromino.squares[1].x) {
        // Here we have that the tetromino is vertical
        const x = tetromino.squares[0].x;
        // Recalculate the board coordinates for the squares of the tetromino-t
        if (tetromino.squares[3].x > x) {
            firstSquare = {x: tetromino.squares[0].x - 1, y: tetromino.squares[0].y - 1};
            thirdSquare = {x: tetromino.squares[2].x + 1, y: tetromino.squares[2].y + 1};
            switch (type) {
                case constants.TETROMINOS.T:
                    forthSquare = {x: tetromino.squares[3].x - 1, y: tetromino.squares[3].y + 1};
                    break;
                case constants.TETROMINOS.L:
                    forthSquare = {x: tetromino.squares[3].x - 2, y: tetromino.squares[3].y};
                    break;
                case constants.TETROMINOS.J:
                    forthSquare = {x: tetromino.squares[3].x, y: tetromino.squares[3].y + 2};
                    break;
            }

        } else {
            firstSquare = {x: tetromino.squares[0].x + 1, y: tetromino.squares[0].y + 1};
            thirdSquare = {x: tetromino.squares[2].x - 1, y: tetromino.squares[2].y - 1};
            switch (type) {
                case constants.TETROMINOS.T:
                    forthSquare = {x: tetromino.squares[3].x + 1, y: tetromino.squares[3].y - 1};
                    break;
                case constants.TETROMINOS.L:
                    forthSquare = {x: tetromino.squares[3].x + 2, y: tetromino.squares[3].y};
                    break;
                case constants.TETROMINOS.J:
                    forthSquare = {x: tetromino.squares[3].x, y: tetromino.squares[3].y - 2};
                    break;
            }

        }
    } else {
        // Our tetromino is horizontal
        const y = tetromino.squares[0].y;
        if (tetromino.squares[3].y > y) {
            firstSquare = {x: tetromino.squares[0].x + 1, y: tetromino.squares[0].y - 1};
            thirdSquare = {x: tetromino.squares[2].x - 1, y: tetromino.squares[2].y + 1};
            switch (type) {
                case constants.TETROMINOS.T:
                    forthSquare = {x: tetromino.squares[3].x - 1, y: tetromino.squares[3].y - 1};
                    break;
                case constants.TETROMINOS.L:
                    forthSquare = {x: tetromino.squares[3].x, y: tetromino.squares[3].y - 2};
                    break;
                case constants.TETROMINOS.J:
                    forthSquare = {x: tetromino.squares[3].x - 2, y: tetromino.squares[3].y};
                    break;
            }

        } else {
            firstSquare = {x: tetromino.squares[0].x - 1, y: tetromino.squares[0].y + 1};
            thirdSquare = {x: tetromino.squares[2].x + 1, y: tetromino.squares[2].y - 1};
            switch (type) {
                case constants.TETROMINOS.T:
                    forthSquare = {x: tetromino.squares[3].x + 1, y: tetromino.squares[3].y + 1};
                    break;
                case constants.TETROMINOS.L:
                    forthSquare = {x: tetromino.squares[3].x, y: tetromino.squares[3].y + 2};
                    break;
                case constants.TETROMINOS.J:
                    forthSquare = {x: tetromino.squares[3].x + 2, y: tetromino.squares[3].y};
                    break;
            }
        }
    }
    updateTetromino(tetromino, firstSquare, secondSquare, thirdSquare, forthSquare);
}

module.exports = {
    moveLeft: moveLeft,
    moveRight: moveRight,
    updateTetromino: updateTetromino,
    rotateClockwise: rotateClockwise,
};
