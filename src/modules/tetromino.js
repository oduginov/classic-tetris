const {
  isSquareFree,
  eraseTetromino,
  takeSquare,
  drawTetromino
} = require('./game-board');
const constants = require('./constants');
const { isOnGameBoard } = require('./square');

/**
 * Constructor for the tetromino object.
 *
 * @param type - The type of tetromino (a number from 0 to 6).
 * @param borderColors - The array of colors for the border of tetromino squares
 * @param innerColor - The color for inner area of tetromino squares.
 * @param squares - The array of objects with two properties --- coordinates of
 * tetromino squares.
 * @param reset - The function, which transform <squares> in the initial state.
 * @constructor
 */
function Tetromino(type, borderColors, innerColor, squares, reset) {
  this.type = type;
  this.innerColor = innerColor;
  this.borderColors = borderColors;
  this.squares = squares;
  this.reset = reset;
}

/**
 * Move the current tetromino to new position.
 *
 * @param sq - New coordinates for squares of the tetromino.
 * @returns {boolean}
 */
Tetromino.prototype.move = function move(sq) {
  if (sq.every(s => isOnGameBoard(s.x, s.y) && isSquareFree(s.x, s.y))) {
    eraseTetromino(this.squares);
    this.squares = sq;
    this.draw();
    return true;
  }
  return false;
};

/**
 * Put squares of the tetromino on the bitmap of the game board.
 */
Tetromino.prototype.saveState = function saveState() {
  this.squares.forEach(square => takeSquare(square.x, square.y));
};

/**
 * Render tetromino on the game board.
 */
Tetromino.prototype.draw = function draw() {
  drawTetromino(this.squares, this.innerColor, this.borderColors, false);
};

/**
 * Move the tetromino left.
 *
 * @returns {boolean} - True, if we could move the tetromino; false, otherwise.
 */
Tetromino.prototype.moveLeft = function moveLeft() {
  const updatedSquares = this.squares.map(square => ({
    x: square.x - 1,
    y: square.y
  }));
  return this.move(updatedSquares);
};

/**
 * Move the tetromino right.
 *
 * @returns {boolean} - True, if we could move the tetromino; false, otherwise.
 */
Tetromino.prototype.moveRight = function moveRight() {
  const updatedSquares = this.squares.map(square => ({
    x: square.x + 1,
    y: square.y
  }));
  return this.move(updatedSquares);
};

/**
 * Rotate a square `S` with the board coordinates (x1, y1) around a position
 * with the board coordinates (x0, y0) by 90 deg. If `clockwise` = true, then
 * the rotation is clockwise, otherwise counterclockwise. Calculate new board
 * coordinates as follows: (x, y)' = (x0, y0)' + A * (x1 - x0, y1 - y0)',
 * where ' is the transpose of vectors and A is the transformation matrix
 * modelling the rotation
 * | 0        alpha |
 * | -alpha     0   |,
 * where alpha is 1 or -1.
 *
 * @param {number} x0 - The first coordinate of the rotation center
 * @param {number} y0 - The second coordinate of the rotation center
 * @param {number} x1 - The first coordinate of the rotated square
 * @param {number} y1 - The second coordinate of the rotated square
 * @param {boolean} clockwise - If true, then the rotation is clockwise,
 * otherwise counterclockwise
 *
 * @returns {*} - The board coordinates of new position for the square `S`.
 */
function rotateSquare(x0, y0, x1, y1, clockwise) {
  const alpha = clockwise ? -1 : 1;
  const x = x0 + alpha * (y1 - y0);
  const y = y0 - alpha * (x1 - x0);
  return { x, y };
}

/**
 * Rotate the tetormino.
 *
 * @param clockwise - True, if ratation is in clockwise direction; false, otherwise.
 * @returns {Tetromino} - The tetromino.
 */
Tetromino.prototype.rotate = function rotate(clockwise) {
  if (this.type !== constants.TETROMINOS.O) {
    const rotatedTetromino = this.squares.map(square => {
      const center =
        this.type === constants.TETROMINOS.I
          ? this.squares[2]
          : this.squares[1];
      return rotateSquare(center.x, center.y, square.x, square.y, clockwise);
    });
    this.move(rotatedTetromino);
  }
  return this;
};

const I = new Tetromino(
  constants.TETROMINOS.I,
  constants.BLUE.borderColors,
  constants.BLUE.innerColor,
  [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 }
  ],
  function reset() {
    for (let i = 0; i < 4; i++) {
      this.squares[i] = { x: 3 + i, y: 0 };
    }
  }
);

const J = new Tetromino(
  constants.TETROMINOS.J,
  constants.RED.borderColors,
  constants.RED.innerColor,
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 1 }
  ],
  function reset() {
    this.squares = [
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 1 }
    ];
  }
);

const L = new Tetromino(
  constants.TETROMINOS.L,
  constants.PURPLE.borderColors,
  constants.PURPLE.innerColor,
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 4, y: 1 }
  ],
  function reset() {
    this.squares = [
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 4, y: 1 }
    ];
  }
);

const O = new Tetromino(
  constants.TETROMINOS.O,
  constants.BLUE.borderColors,
  constants.BLUE.innerColor,
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 }
  ],
  function reset() {
    for (let i = 0; i < 2; i++) {
      this.squares[i] = { x: 4 + i, y: 0 };
      this.squares[i + 2] = { x: 4 + i, y: 1 };
    }
  }
);

const S = new Tetromino(
  constants.TETROMINOS.S,
  constants.PURPLE.borderColors,
  constants.PURPLE.innerColor,
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
    { x: 6, y: 1 }
  ],
  function reset() {
    for (let i = 1; i <= 2; i++) {
      this.squares[i - 1] = { x: 3 + i, y: 0 };
      this.squares[i + 1] = { x: 4 + i, y: 1 };
    }
  }
);

const T = new Tetromino(
  constants.TETROMINOS.T,
  constants.BLUE.borderColors,
  constants.BLUE.innerColor,
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 5, y: 1 }
  ],
  function reset() {
    this.squares = [
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 5, y: 1 }
    ];
  }
);

const Z = new Tetromino(
  constants.TETROMINOS.Z,
  constants.RED.borderColors,
  constants.RED.innerColor,
  [
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 5, y: 0 },
    { x: 6, y: 0 }
  ],
  function reset() {
    for (let i = 1; i <= 2; i++) {
      this.squares[i - 1] = { x: 3 + i, y: 1 };
      this.squares[i + 1] = { x: 4 + i, y: 0 };
    }
  }
);

module.exports = { tetrominos: [I, J, L, O, S, T, Z] };
