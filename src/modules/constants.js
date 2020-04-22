/**
 * Enumerate all tetriminoes and assign the number for each tile
 *
 * @type {{S: number, T: number, I: number, J: number, Z: number, L: number, O: number}}
 */
const TETROMINOS = { I: 0, O: 1, T: 2, L: 3, J: 4, Z: 5, S: 6 };

/**
 * Define increments of the score. According to the rule
 * the classic tetris, we increment the score by 40, 100, 300 points, if the
 * number of the destroyed horizontal lines is exactly 1,2 and 3, respectively,
 * and by 1200 points, if we have the tetris, i.e. the number of the destroyed lines
 * equals to 4.
 *
 */
const SCORE_INCREMENTS = [40, 100, 300, 1200];

const LEVEL_THRESHOLDS = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  110,
  120,
  130,
  140,
  150,
  160,
  170,
  180,
  190,
  200,
  200,
  200,
  200
];

/**
 * Define size of the game field
 * @type {{WIDTH: number, HEIGHT: number}} - Width and height of the game zone
 */
const SIZE_FIELD = {
  WIDTH: 10,
  HEIGHT: 20
};

const LINE_PIXELS_IN_SQUARE = 24;

const GAME_BOARD_COLOR = '#000';

const RED = {
  innerColor: '#ff2000',
  borderColors: ['#1c0000', '#490703', '#4c0600', '#9e372d', '#b7301e']
};
const BLUE = {
  innerColor: '#ffffff',
  borderColors: ['#150034', '#34007e', '#5900cb', '#7e00f6', '#ac6dff']
};
const PURPLE = {
  innerColor: '#6d00ff',
  borderColors: ['#10002a', '#26005d', '#270061', '#4800ae', '#5e00de']
};

module.exports = {
  TETROMINOS,
  SCORE_INCREMENTS,
  SIZE_FIELD,
  LINE_PIXELS_IN_SQUARE,
  GAME_BOARD_COLOR,
  RED,
  BLUE,
  PURPLE,
  LEVEL_THRESHOLDS
};
