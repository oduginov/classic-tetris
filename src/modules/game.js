/*
 * Import functionality from other modules
 */
const constants = require('./constants');
const gameBoard = require('./game-board');
const tetrominoI = require('./tetromino-i');
const tetrominoO = require('./tetromino-o');
const tetrominoT = require('./tetromino-t');
const tetrominoJ = require('./tetromino-j');
const tetrominoL = require('./tetromino-l');
const tetrominoZ = require('./tetromino-z');
const tetrominoS = require('./tetromino-s');
const tetromino = require('./tetromino');


/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
let delay = scale / speed; // sec after which a figure drops by one square below
let currentTetramino = null;
let isPressedDownArrow = false;
let prevDelay = 0;

function obtainNewTetromino() {
  // eslint-disable-next-line default-case
  switch (Math.round(Math.random() * 6)) {
    case constants.TETROMINOS.I:
      currentTetramino = tetrominoI;
      break;
    case constants.TETROMINOS.O:
      currentTetramino = tetrominoO;
      break;
    case constants.TETROMINOS.T:
      currentTetramino = tetrominoT;
      break;
    case constants.TETROMINOS.L:
      currentTetramino = tetrominoL;
      break;
    case constants.TETROMINOS.J:
      currentTetramino = tetrominoJ;
      break;
    case constants.TETROMINOS.Z:
      currentTetramino = tetrominoZ;
      break;
    case constants.TETROMINOS.S:
      currentTetramino = tetrominoS;
      break;
  }
  gameBoard.draw(currentTetramino.squares,
    currentTetramino.innerColor,
    currentTetramino.borderColors,
    false);
}

function run() {
  init();
  obtainNewTetromino();
  let prevTimestamp = Date.now(); // milliseconds

  const repaint = () => {
    const elapsed = Date.now() - prevTimestamp; // milliseconds
    if (elapsed / 1000 >= delay) {
      prevTimestamp = Date.now();
      if (!move()) {
        // Stop dropping the current tetromino, save its state and
        // reset the coordinates for the squares of the current tetromino
        currentTetramino.squares.forEach(square => gameBoard.bitmap[square.y][square.x] = true);
        currentTetramino.reset();

        const fullLines = gameBoard.getFullLines();
        if (fullLines.length) {
          burnLines(fullLines);
        }
        // TODO drop skyscraper
        // Initiate dropping new tetromino
        obtainNewTetromino();
      }
    }
    requestAnimationFrame(repaint);
  };
  requestAnimationFrame(repaint);
}

function burnLines(fullLines) {
  let prevTimestamp = Date.now(); // milliseconds
  let indexBurnedSquare = Math.floor(constants.SIZE_FIELD.WIDTH / 2) - 1;

  const repaint = () => {
    const elapsed = Date.now() - prevTimestamp; // milliseconds
    if (elapsed / 1000 >= 0.0000001) {
      prevTimestamp = Date.now();
      fullLines.forEach(line => {
        gameBoard.eraseSquare(indexBurnedSquare, line);
        gameBoard.eraseSquare(constants.SIZE_FIELD.WIDTH - indexBurnedSquare - 1, line);
        console.log(gameBoard.bitmap);
      });
      indexBurnedSquare--;
    }
    if (indexBurnedSquare >= 0) {
      requestAnimationFrame(repaint);
    }
  };
  requestAnimationFrame(repaint);
}

function move() {
  const updatedSquares = currentTetramino.squares.map(square => ({ x: square.x, y: square.y + 1 }));
  return tetromino.move(currentTetramino, updatedSquares);
}

function init() {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
      tetromino.moveLeft(currentTetramino);
    }
    if (event.code === 'ArrowRight') {
      tetromino.moveRight(currentTetramino);
    }
    if (event.code === 'ArrowDown') {
      if (!isPressedDownArrow) {
        prevDelay = delay;
        delay = 0.05;
        isPressedDownArrow = true;
      }
    }
    if (event.code === 'KeyX' && currentTetramino.rotate) {
      currentTetramino.rotate(true);
    }
    if (event.code === 'KeyZ' && currentTetramino.rotate) {
      currentTetramino.rotate(false);
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowDown') {
      delay = prevDelay;
      isPressedDownArrow = false;
    }
  });
}

module.exports = { run };
