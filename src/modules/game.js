const { SIZE_FIELD } = require('./constants');
const gameBoard = require('./game-board');
const { tetrominos } = require('./tetromino');
const { getColorOfSquare } = require('./square');
const { renderTetromino, clearCanvas } = require('./preview-canvas');
const { showSettingsWindow, showEndGameWindow } = require('./modal-window');
const {
  show,
  getScoreIncrement,
  getLevelIncrement,
  getDelayFrames
} = require('./parameters');

/*
 * Define variables
 */
const stopButton = document.getElementById('stop');
const startButton = document.getElementById('play');
const settings = document.getElementById('control');
let currentTetromino = null;
let nextTetromino = null;
let isPressedDownArrow = false;
let startLevel = 0;
let level = 0;
let score = 0;
let lines = 0;
let isStoppedGame = false;
let isFirstRunningGame = true;
let delayFrames = 0;
let prevDelayFrames = 0;

/**
 * Generate a random tetromino.
 *
 * @returns {object} Object of the type <Tetromino>
 */
function getTetromino() {
  const i = Math.round(Math.random() * 6);
  return tetrominos[i];
}

function updateParameters(levelIncr, delayFrameVar, lineIncr) {
  level += levelIncr;
  delayFrames = delayFrameVar;
  lines += lineIncr;
  show(score, lines, level);
}

/**
 * Run the game
 *
 * @param userLevel - The level at the beginning of the game.
 */
function run(userLevel) {
  isStoppedGame = false;
  startLevel = userLevel;
  level = startLevel;
  if (isFirstRunningGame) {
    init();
    isFirstRunningGame = false;
  }
  currentTetromino = getTetromino();
  currentTetromino.draw();
  nextTetromino = getTetromino();
  renderTetromino(nextTetromino);
  updateParameters(0, getDelayFrames(level), 0);
  let currentFrames = 0;

  const repaint = () => {
    if (currentFrames >= delayFrames) {
      currentFrames = 0;
      if (!move()) {
        currentTetromino.saveState();
        if (gameBoard.isFullGameBoard()) {
          isStoppedGame = true;
          clearCanvas();
          gameBoard.clearGameBoard();
          showEndGameWindow(score, run);
          level = 0;
          score = 0;
          lines = 0;
          return;
        }
        currentTetromino.reset();
        const fullLines = gameBoard.getFullLines();
        if (fullLines.length) {
          burnLines(fullLines);
          score += getScoreIncrement(fullLines.length, level);
          const eps = getLevelIncrement(
            startLevel,
            level,
            lines,
            fullLines.length
          );
          updateParameters(eps, getDelayFrames(level), fullLines.length);
        }
        // Initiate dropping new tetromino
        currentTetromino = nextTetromino;
        currentTetromino.draw();
        nextTetromino = getTetromino();
        renderTetromino(nextTetromino);
      }
    }
    currentFrames++;
    requestAnimationFrame(repaint);
  };
  currentFrames++;
  requestAnimationFrame(repaint);
}

/**
 * Animation of line burning.
 *
 * @param fullLines - The array of row indices filled by tetrominos.
 */
function burnLines(fullLines) {
  if (isPressedDownArrow) {
    delayFrames = prevDelayFrames;
    isPressedDownArrow = false;
  }
  let indexBurnedSquare = Math.floor(SIZE_FIELD.WIDTH / 2) - 1;
  let currentFrames = 0;
  const repaint = () => {
    if (currentFrames >= 2) {
      currentFrames = 0;
      fullLines.forEach(line => {
        gameBoard.deleteSquare(indexBurnedSquare, line);
        gameBoard.deleteSquare(SIZE_FIELD.WIDTH - indexBurnedSquare - 1, line);
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

/**
 * Animation of line dropping after burning of full lines.
 *
 * @param fullLines - The array of indices of rows that is filled by tetrominos.
 */
function dropLines(fullLines) {
  const repaint = () => {
    let i = fullLines.shift();
    while (i >= 1 && !gameBoard.isEmptyLine(i - 1)) {
      for (let j = 0; j < SIZE_FIELD.WIDTH; j++) {
        const color = getColorOfSquare(j, i - 1);
        if (color) {
          gameBoard.putSquare(j, i, color.innerColor, color.borderColors);
          gameBoard.deleteSquare(j, i - 1);
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

/**
 * Move the current tetromino by one line down.
 *
 * @returns {boolean} True, if we can move the current tetromino;
 * false, otherwise.
 */
function move() {
  const updatedSquares = currentTetromino.squares.map(square => ({
    x: square.x,
    y: square.y + 1
  }));
  return currentTetromino.move(updatedSquares);
}

/**
 * Add event listeners
 */
function init() {
  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft' && !isStoppedGame) {
      currentTetromino.moveLeft();
    }
    if (event.code === 'ArrowRight' && !isStoppedGame) {
      currentTetromino.moveRight();
    }
    if (event.code === 'ArrowDown' && !isStoppedGame) {
      if (!isPressedDownArrow) {
        prevDelayFrames = delayFrames;
        delayFrames = 3;
        isPressedDownArrow = true;
      }
    }
    if (event.code === 'KeyX' && currentTetromino.rotate && !isStoppedGame) {
      currentTetromino.rotate(true);
    }
    if (event.code === 'KeyZ' && currentTetromino.rotate && !isStoppedGame) {
      currentTetromino.rotate(false);
    }
    if (event.code === 'KeyS') {
      stopStartGame();
    }
  });
  document.addEventListener('keyup', event => {
    if (event.code === 'ArrowDown' && isPressedDownArrow && !isStoppedGame) {
      delayFrames = prevDelayFrames;
      isPressedDownArrow = false;
    }
  });
  document.addEventListener('click', stopStartGame);
  settings.addEventListener('click', showMenu);
}

const showMenu = () => {
  if (!isStoppedGame) {
    stopStartGame();
  }
  showSettingsWindow();
};

const stopStartGame = event => {
  if (!event || event.target.classList.contains('control')) {
    if (delayFrames === Infinity) {
      delayFrames = prevDelayFrames;
      isStoppedGame = false;
      stopButton.style.display = 'inline-block';
      startButton.style.display = 'none';
    } else {
      prevDelayFrames = delayFrames;
      delayFrames = Infinity;
      isStoppedGame = true;
      startButton.style.display = 'inline-block';
      stopButton.style.display = 'none';
    }
  }
};

module.exports = { run };
