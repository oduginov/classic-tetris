const tetromino = require('./tetromino');
const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.J,
  squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }],
  innerColor: '#ff2000',
  borderColors: ['#1c0000', '#490703', '#4c0600', '#9e372d', '#b7301e'],
  rotate(clockwise) {
    tetromino.rotateTetromino(this, clockwise);
  },
  reset() {
    this.squares = [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }];
  }
};
