/*
 * Import functionality from other modules
 */
const constants = require("./constants");
const gameBoard = require("./game-board");
const tetrominoI = require("./tetromino-i");
const tetrominoO = require("./tetromino-o");
const tetrominoT = require("./tetromino-t");
const tetromino = require("./tetromino");

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
const delay = scale / speed; // sec after which a figure drops by one square below

function init() {
    let cur;
    switch (this.type) {
        case constants.TETROMINOS.I:
            cur = tetrominoI;
            break;
        case constants.TETROMINOS.O:
            cur = tetrominoO;
            break;
        case constants.TETROMINOS.T:
            cur = tetrominoT;
            break;
    }
    this.gameBoard.draw(cur.squares, cur.innerColor, cur.borderColors, false);
    return cur;
}

function getRandomTetrominoType(n) {
    return Math.round(Math.random() * n);
}

function run() {
    this.type = getRandomTetrominoType(2);
    this.data = this.init();
    let prevTimestamp = Date.now();

    const repaint = () => {
        const elapsed = Date.now() - prevTimestamp; // milliseconds
        if (elapsed / 1000 >= delay) {
            prevTimestamp = Date.now();
            if (!move(this.data)) {
                // Stop dropping the current tetromino, save its state and
                // reset the coordinates for the squares of the current tetromino
                this.data.squares.forEach(square => gameBoard.bitmap[square.x][square.y] = true);
                this.data.reset();

                // Initiate dropping new tetromino
                this.type = this.getRandomTetrominoType(2);
                this.data = this.init();
            }
        }
        requestAnimationFrame(repaint);
    };
    requestAnimationFrame(repaint);
}

function move(data) {
    // Can we move by one square below ?
    if (data.squares.every(square => square.y < constants.SIZE_FIELD.HEIGHT - 1 &&
        !gameBoard.bitmap[square.x][square.y + 1])) {
        // We can move. Transfer a figure by one square below.
        const updatedSquares = data.squares.map(square => ({x: square.x, y: square.y + 1}));
        tetromino.updateTetromino(data, ...updatedSquares);
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
