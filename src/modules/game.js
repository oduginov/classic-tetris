const constants = require('./constants');
const gameBoard = require('./game-board');
const { tetromioes } = require('./tetromino');
const { getColorOfSquare } = require('./square');

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
  const i = Math.round(Math.random() * 6);
  currentTetramino = tetromioes[i];
  gameBoard.drawTetromino(currentTetramino.squares,
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
        currentTetramino
          .squares
          .forEach(square => gameBoard.bitmap[square.y][square.x] = true);
        currentTetramino.reset();

        const fullLines = gameBoard.getFullLines();
        if (fullLines.length) {
          burnLines(fullLines);
        }
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
      });
      indexBurnedSquare--;
    }
    if (indexBurnedSquare >= 0) {
      requestAnimationFrame(repaint);
    } else {
      dropLines(fullLines);
    }
  };
  requestAnimationFrame(repaint);
}

function dropLines(fullLines) {
  let prevTimestamp = Date.now(); // milliseconds

  const repaint = () => {
    const elapsed = Date.now() - prevTimestamp; // milliseconds

    if (elapsed / 1000 >= 0.00000001) {
      const erasedLine = fullLines.shift();
      prevTimestamp = Date.now();
      let i = erasedLine;
      while (i >= 1 && !gameBoard.isEmptyLine(i - 1)) {
        for (let j = 0; j < constants.SIZE_FIELD.WIDTH; j++) {
          const color = getColorOfSquare(j, i - 1);
          if (color) {
            gameBoard.drawSquare(j, i, color.innerColor, color.borderColors);
            gameBoard.eraseSquare(j, i - 1);
          }
        }
        i--;
      }
      if (fullLines.length) {
        requestAnimationFrame(repaint);
      }
    }
  };

  requestAnimationFrame(repaint);
}

function move() {
  const updatedSquares = currentTetramino.squares.map(square => ({ x: square.x, y: square.y + 1 }));
  return currentTetramino.move(updatedSquares);
}

function init() {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
      currentTetramino.moveLeft();
    }
    if (event.code === 'ArrowRight') {
      currentTetramino.moveRight();
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
