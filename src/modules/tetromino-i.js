const tetromino = require('./tetromino');
const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.I,
  borderColors: ['#150034', '#34007e', '#5900cb', '#7e00f6', '#ac6dff'],
  innerColor: '#ffffff',
  squares: [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }],
  rotate(clockwise) {
    tetromino.rotateTetromino(this, clockwise);
  },
  reset() {
    for (let i = 0; i < 4; i++) {
      this.squares[i] = { x: 3 + i, y: 0 };
    }
  }
};
