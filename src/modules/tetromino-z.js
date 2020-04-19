const tetromino = require('./tetromino');
const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.Z,
  borderColors: ['#1c0000', '#490703', '#4c0600', '#9e372d', '#b7301e'],
  innerColor: '#ff2000',
  squares: [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 0 }, { x: 6, y: 0 }],
  rotate(clockwise) {
    tetromino.rotateTetromino(this, clockwise);
  },
  reset() {
    for (let i = 1; i <= 2; i++) {
      this.squares[i - 1] = { x: 3 + i, y: 1 };
      this.squares[i + 1] = { x: 4 + i, y: 0 };
    }
  }
};
