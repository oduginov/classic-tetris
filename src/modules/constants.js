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
 * @type {{TETRIS_INCREMENT: number, SIMPLE_INCREMENT: number}}
 */
const SCORE_INCREMENTS = {
  ONE_LINE_INCREMENT: 40,
  TWO_LINE_INCREMENT: 100,
  THREE_LINE_INCREMENT: 300,
  TETRIS_INCREMENT: 1200
};

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

module.exports = { TETROMINOS, SCORE_INCREMENTS, SIZE_FIELD, LINE_PIXELS_IN_SQUARE, GAME_BOARD_COLOR };
