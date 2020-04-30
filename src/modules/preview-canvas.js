const {
  LINE_PIXELS_IN_SQUARE,
  GAME_BOARD_COLOR,
  TETROMINOS
} = require('./constants');
const { paintSquare } = require('./square');

const canvas = document.getElementById('preview-canvas');
const cols = 5 * LINE_PIXELS_IN_SQUARE;
const rows = 4 * LINE_PIXELS_IN_SQUARE;
canvas.width = cols;
canvas.height = rows;

const context = canvas.getContext('2d');

canvas.style.backgroundColor = GAME_BOARD_COLOR;

const renderTetromino = tetromino => {
  const type = tetromino.type;
  let squares;
  let shiftX = 0;
  let shiftY = 0;
  switch (type) {
    case TETROMINOS.I:
      squares = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 }
      ];
      shiftX = LINE_PIXELS_IN_SQUARE / 2;
      shiftY = shiftX;
      break;
    case TETROMINOS.L:
      squares = [
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 }
      ];
      break;
    case TETROMINOS.T:
      squares = [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 2, y: 2 }
      ];
      break;
    case TETROMINOS.J:
      squares = [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 2 }
      ];
      break;
    case TETROMINOS.O:
      squares = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 2 }
      ];
      shiftX = LINE_PIXELS_IN_SQUARE / 2;
      shiftY = 0;
      break;
    case TETROMINOS.S:
      squares = [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 2 }
      ];
      break;
    case TETROMINOS.Z:
      squares = [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 1 }
      ];
      break;
    default:
      squares = null;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  squares.forEach(square =>
    paintSquare(
      square.x,
      square.y,
      tetromino.innerColor,
      tetromino.borderColors,
      drawPixel,
      paintRect,
      { x: shiftX, y: shiftY }
    )
  );
};

function drawPixel(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
}

function paintRect(x1, y1, x2, y2, color) {
  context.fillStyle = color;
  context.fillRect(x1, y1, Math.abs(x2 - x1 + 1), Math.abs(y2 - y1 + 1));
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

module.exports = { renderTetromino, clearCanvas };
