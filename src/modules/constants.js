/**
 * Enumerate all tetriminoes and assign the number for each tile
 *
 * @type {{S: number, T: number, I: number, J: number, Z: number, L: number, O: number}}
 */
const TETROMINOS = {I: 0, O: 1, T: 2, J: 3, L: 4, S: 5, Z: 6};

/**
 * Define increments of the score of a game. According to the rule
 * the classic tetris, we increment the score by 40 points, if the
 * destroyed horizontal lines are at most 3, and by 80 points, if
 * we have the tetris, i.e. the number of the destroyed lines equals
 * to 4.
 *
 * @type {{TETRIS_INCREMENT: number, SIMPLE_INCREMENT: number}}
 */
const SCORE_INCREMENTS = {
    SIMPLE_INCREMENT: 40,
    TETRIS_INCREMENT: 80
};

/**
 * Define size of the game field
 * @type {{WIDTH: number, HEIGHT: number}} - Width and height of the game zone
 */
const SIZE_FIELD = {
    WIDTH: 10,
    HEIGHT: 20
};

const LINE_PIXELS_IN_SQUARE = 20;

module.exports = {
    TETROMINOS: TETROMINOS,
    SCORE_INCREMENTS: SCORE_INCREMENTS,
    SIZE_FIELD: SIZE_FIELD,
    LINE_PIXELS_IN_SQUARE: LINE_PIXELS_IN_SQUARE,
};
