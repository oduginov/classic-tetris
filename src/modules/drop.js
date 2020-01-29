/*
 * Import functionality from other modules
 */

const constants = require("./constants");
const square = require("./square");
const tetrominoI = require("./tetromino-i");

/*
 * Define variables
 */
const scale = 1; // seconds
const speed = 5; // squares per <scale> sec
const delay = scale / speed; // sec after which a figure drops by one pixel

const draw = function (coordinates, innerColor, borderColors, isFulfilled) {
    coordinates.forEach(s => square.paintSquare(s.x, s.y, innerColor, borderColors, isFulfilled));
};

function init(tetrominoType) {
    let borderColors;
    let innerColor;
    let coordinates;
    switch (tetrominoType) {
        case constants.TETROMINOS.I:
            borderColors = tetrominoI.borderColors;
            innerColor = tetrominoI.innerColor;
            coordinates = tetrominoI.coordinates;
            break;
        case constants.TETROMINOS.J:
            break;
    }
    return {borderColors: borderColors, innerColor: innerColor, coordinates: coordinates};
}

function run(tetrominoType) {
    const data = init(tetrominoType);
    draw(data.coordinates, data.innerColor, data.borderColors, false);

    let prevTimestamp = Date.now();

    function repaint() {
        const elapsed = Date.now() - prevTimestamp; // millisecond
        if (elapsed / 1000 >= delay) {
            prevTimestamp = Date.now();
            move(data);
        }
        if (data.coordinates.every(square => square.y < constants.SIZE_FIELD.HEIGHT - 1)) {
            requestAnimationFrame(repaint);
        }
    }

    requestAnimationFrame(repaint);
}

function move(data) {
    // Transfer a figure by one square below
    draw(data.coordinates,"#000000", [], false);
    data.coordinates.forEach(item => item.y++);
    draw(data.coordinates, data.innerColor, data.borderColors, false);
}

module.exports = {
    run: run,
};
