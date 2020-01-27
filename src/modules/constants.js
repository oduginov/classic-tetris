const TETROMINOS = {
    I: "straight polyomino",
    O: "square polyomino",
    T: "T-polyomino",
    J: "J-polyomino",
    L: "L-polyomino",
    S: "S-polyomino",
    Z: "Z-polyomino"
};

const SCORE_INCREMENTS = {
    INCREMENT: 40,
    TETRIS_INCREMENT: 80
};

module.exports = {
    TETROMINOS: TETROMINOS,
    SCORE_INCREMENTS: SCORE_INCREMENTS
};
