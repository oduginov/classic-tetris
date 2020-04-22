const { SCORE_INCREMENTS } = require('./constants');

const show = (score, lines, level) => {
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  document.getElementById('level').textContent = level;
};

const getScoreIncrement = (numberOfBurnedLines, level) =>
  SCORE_INCREMENTS[numberOfBurnedLines - 1] * (level + 1);

const getLevelIncrement = (startLevel, level, lines, prevLines) => {
  if (startLevel === level) {
    const bound1 = 10 * (startLevel + 1);
    const bound2 = Math.max(100, startLevel * 10 - 50);
    return lines >= Math.min(bound1, bound2) ? 1 : 0;
  }
  return lines - prevLines >= 9 ? 1 : 0;
};

module.exports = { show, getScoreIncrement, getLevelIncrement };
