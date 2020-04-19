const tetromino = require('./tetromino');
const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.T,
  squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 1 }],
  innerColor: '#ffffff',
  borderColors: ['#150034', '#34007e', '#5900cb', '#7e00f6', '#ac6dff'],
  rotate(clockwise) {
    return tetromino.rotateTetromino(this, clockwise);
  },
  reset() {
    this.squares = [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 1 }];
  }
};
