const tetromino = require('./tetromino');
const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.S,
  borderColors: constants.PURPLE.borderColors,
  innerColor: constants.PURPLE.innerColor,
  squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
  rotate(clockwise) {
    tetromino.rotateTetromino(this, clockwise);
  },
  reset() {
    for (let i = 1; i <= 2; i++) {
      this.squares[i - 1] = { x: 3 + i, y: 0 };
      this.squares[i + 1] = { x: 4 + i, y: 1 };
    }
  }
};
