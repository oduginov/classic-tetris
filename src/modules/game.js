const constants = require('./constants');
const gameBoard = require('./game-board');
const { tetrominoes } = require('./tetromino');
const { getColorOfSquare } = require('./square');
const {
  show,
  getScoreIncrement,
  getLevelIncrement,
  getDelayFrames
} = require('./statistics');

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> seconds
let delay = scale / speed; // sec after which a figure drops by one square below
let currentTetromino = null;
let isPressedDownArrow = false;
let prevDelay = 0;
let startLevel = 0;
let level = 0;
let score = 0;
let prevLines = 0;
let lines = 0;

let delayFrames = 0;
let prevDelayFrames = 0;

function getTetromino() {
  const i = Math.round(Math.random() * 6);
  currentTetromino = tetrominoes[i];
  currentTetromino.draw();
}

function run() {
  level = startLevel;
  delayFrames = getDelayFrames(level);
  show(score, lines, level);
  init();
  getTetromino();
  let currentFrames = 0;

  const repaint = () => {
    if (currentFrames >= delayFrames) {
      currentFrames = 0;
      if (!move()) {
        // Stop dropping the current tetromino, save its state and
        // reset the coordinates for the squares of the current tetromino
        currentTetromino.saveState();
        currentTetromino.reset();

        const fullLines = gameBoard.getFullLines();
        if (fullLines.length) {
          burnLines(fullLines);
          score += getScoreIncrement(fullLines.length, level);
          lines += fullLines.length;
          const eps = getLevelIncrement(startLevel, level, lines, prevLines);
          if (eps) {
            level += eps;
            const nextDelayFrame = getDelayFrames(level);
            if (nextDelayFrame !== delayFrames) {
              prevLines = lines;
            }
            delayFrames = nextDelayFrame;
          }
          show(score, lines, level);
        }
        // Initiate dropping new tetromino
        getTetromino();
      }
    }
    currentFrames++;
    requestAnimationFrame(repaint);
  };
  currentFrames++;
  requestAnimationFrame(repaint);
}

function burnLines(fullLines) {
  if (isPressedDownArrow) {
    delayFrames = prevDelayFrames;
    isPressedDownArrow = false;
  }

  let indexBurnedSquare = Math.floor(constants.SIZE_FIELD.WIDTH / 2) - 1;
  let currentFrames = 0;

  const repaint = () => {
    if (currentFrames >= 2) {
      currentFrames = 0;
      fullLines.forEach(line => {
        gameBoard.eraseSquare(indexBurnedSquare, line);
        gameBoard.eraseSquare(
          constants.SIZE_FIELD.WIDTH - indexBurnedSquare - 1,
          line
        );
      });
      indexBurnedSquare--;
    }
    if (indexBurnedSquare >= 0) {
      currentFrames++;
      requestAnimationFrame(repaint);
    } else {
      dropLines(fullLines);
    }
  };
  currentFrames++;
  requestAnimationFrame(repaint);
}

function dropLines(fullLines) {
  const repaint = () => {
    let i = fullLines.shift();
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
  };
  requestAnimationFrame(repaint);
}

function move() {
  const updatedSquares = currentTetromino.squares.map(square => ({
    x: square.x,
    y: square.y + 1
  }));
  return currentTetromino.move(updatedSquares);
}

function init() {
  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft') {
      currentTetromino.moveLeft();
    }
    if (event.code === 'ArrowRight') {
      currentTetromino.moveRight();
    }
    if (event.code === 'ArrowDown') {
      if (!isPressedDownArrow) {
        prevDelay = delay;
        prevDelayFrames = delayFrames;
        delayFrames = 3;
        delay = 0.05;
        isPressedDownArrow = true;
      }
    }
    if (event.code === 'KeyX' && currentTetromino.rotate) {
      currentTetromino.rotate(true);
    }
    if (event.code === 'KeyZ' && currentTetromino.rotate) {
      currentTetromino.rotate(false);
    }
  });
  document.addEventListener('keyup', event => {
    if (event.code === 'ArrowDown' && isPressedDownArrow) {
      delay = prevDelay;
      delayFrames = prevDelayFrames;
      isPressedDownArrow = false;
    }
  });
}

module.exports = { run };
