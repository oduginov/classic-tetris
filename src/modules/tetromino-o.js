const constants = require('./constants');

module.exports = {
  type: constants.TETROMINOS.O,
  borderColors: ['#150034', '#34007e', '#5900cb', '#7e00f6', '#ac6dff'],
  innerColor: '#ffffff',
  squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 }],
  reset() {
    for (let i = 0; i < 2; i++) {
      this.squares[i] = { x: 4 + i, y: 0 };
      this.squares[i + 2] = { x: 4 + i, y: 1 };
    }
  }
};
