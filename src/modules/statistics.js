const { SCORE_INCREMENTS } = require('./constants');

const show = (score, lines, level) => {
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  document.getElementById('level').textContent = level;
};

const getScoreIncrement = (numberOfBurnedLines, level) =>
  SCORE_INCREMENTS[numberOfBurnedLines - 1] * (level + 1);

const getLevelIncrement = (startLevel, level, lines, increment) => {
  if (startLevel === level) {
    const bound1 = 10 * (startLevel + 1);
    const bound2 = Math.max(100, startLevel * 10 - 50);
    return lines + increment >= Math.min(bound1, bound2) ? 1 : 0;
  }
  const newLines = (lines + increment) % 10;
  lines = lines % 10;
  return lines > newLines ? 1 : 0;
};

const getDelayFrames = level => {
  if (level >= 0 && level <= 8) {
    return 48 - 5 * level;
  }
  if (level === 9) {
    return 6;
  }
  if (level >= 10 && level <= 12) {
    return 5;
  }
  if (level >= 13 && level <= 15) {
    return 4;
  }
  if (level >= 16 && level <= 18) {
    return 3;
  }
  if (level > 19 && level <= 28) {
    return 2;
  }
  return 1;
};

module.exports = { show, getScoreIncrement, getLevelIncrement, getDelayFrames };
