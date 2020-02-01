/*
 * Import functionality from other modules
 */
const constants = require("./constants");
const gameBoard = require("./game-board");
const tetrominoI = require("./tetromino-i");
const tetrominoO = require("./tetromino-o");
const tetrominoT = require("./tetromino-t");

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> sec
const delay = scale / speed; // sec after which a figure drops by one square below

function init() {
    let currentTetromino;
    switch (this.type) {
        case constants.TETROMINOS.I:
            currentTetromino = tetrominoI;
            break;
        case constants.TETROMINOS.O:
            currentTetromino = tetrominoO;
            break;
        case constants.TETROMINOS.T:
            currentTetromino = tetrominoT;
            break;
    }
    return currentTetromino;
}

function getRandomTetrominoType(n) {
    return Math.round(Math.random() * n);
}

function run() {
    this.type = getRandomTetrominoType(2);
    this.data = this.init();
    gameBoard.draw(this.data.squares, this.data.innerColor, this.data.borderColors, false);

    let prevTimestamp = Date.now();

    const repaint = () => {
        const elapsed = Date.now() - prevTimestamp; // milliseconds
        if (elapsed / 1000 >= delay) {
            prevTimestamp = Date.now();
            if (!move(this.data)) {
                // We stop dropping the current tetromino, save a state and
                // reset the coordinates of the current tetromino
                this.data.squares.forEach(square => gameBoard.bitmap[square.x][square.y] = true);
                this.data.reset();

                // Initiate dropping new tetromino
                this.type = this.getRandomTetrominoType(2);
                prevTimestamp = Date.now();
                this.data = this.init();
                this.gameBoard.draw(this.data.squares, this.data.innerColor, this.data.borderColors, false);

                window.requestAnimationFrame(repaint);
            }
        }
        requestAnimationFrame(repaint);
    };

    requestAnimationFrame(repaint);
}

function move(data) {
    // Can we move by one square below ?
    if (data.squares.every(square => square.y < constants.SIZE_FIELD.HEIGHT - 1 && !gameBoard.bitmap[square.x][square.y + 1])) {
        // We can move. Transfer a figure by one square below.
        gameBoard.draw(data.squares, "#000000", [], false);
        data.squares.forEach(item => item.y++);
        gameBoard.draw(data.squares, data.innerColor, data.borderColors, false);
        return true;
    }
    return false;
}

module.exports = {
    run: run,
    type: 0,
    gameBoard: gameBoard,
    init: init,
    data: null,
    getRandomTetrominoType: getRandomTetrominoType,
};
