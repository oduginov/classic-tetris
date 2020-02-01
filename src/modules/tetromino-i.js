const tetromino = require("./tetromino");

function reset() {
    for (let i = 0; i < 4; i++) {
        this.squares[i] = {x: 3 + i, y: 0};
    }
}

function rotate() {
    let firstSquare, secondSquare, thirdSquare, forthSquare;
    // Check: is the line tetromino horizontal or vertical?
    if (this.squares[0].y === this.squares[3].y) {
        // The line is horizontal.
        // Calculate new coordinates for squares of the tetromino-i
        firstSquare = {x: this.squares[2].x, y: this.squares[0].y - 2};
        secondSquare = {x: this.squares[2].x, y: this.squares[1].y - 1};
        thirdSquare = this.squares[2];
        forthSquare = {x: this.squares[2].x, y: this.squares[3].y + 1};
    } else {
        // The line is vertical.
        // Calculate new coordinates for the squares of the tetromino-i
        firstSquare = {x: this.squares[0].x - 2, y: this.squares[2].y};
        secondSquare = {x: this.squares[1].x - 1, y: this.squares[2].y};
        thirdSquare = this.squares[2];
        forthSquare = {x: this.squares[3].x + 1, y: this.squares[2].y};
    }
    tetromino.updateTetromino(this, firstSquare, secondSquare, thirdSquare, forthSquare);
}

module.exports = {
    borderColors: ["#150034", "#34007e", "#5900cb", "#7e00f6", "#ac6dff"],
    innerColor: "#ffffff",
    squares: [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}],
    rotateClockwise: rotate,
    rotateCounterClockwise: rotate,
    reset: reset,
};
