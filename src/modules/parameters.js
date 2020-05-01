const { SCORE_INCREMENTS } = require('./constants');

/**
 * Render the score, the total number of the burned lines and the level
 * of the game on the html page.
 *
 * @param score - The current score in the game.
 * @param lines - The current burned lines in the game.
 * @param level - The current level in the game.
 */
function show(score, lines, level) {
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  document.getElementById('level').textContent = level;
}

/**
 * Calculate the increment of the score. It depends on the current level
 * and the current number of burned lines.
 *
 * @param numberOfBurnedLines - The current number of burned lines at the moment.
 * @param level - The current level in the game.
 * @returns {number} - The increment of the score.
 */
function getScoreIncrement(numberOfBurnedLines, level) {
  return SCORE_INCREMENTS[numberOfBurnedLines - 1] * (level + 1);
}

/**
 * Calculate the increment of the level. That increment equals 0 or 1 and it
 * depends on the level at the beginning of the game, the current level, the
 * total number of the burned lines, the current number of the burned lines.
 *
 * @param startLevel - The level at the beginning of the game.
 * @param level - The current level.
 * @param lines - The total number of the burned lines.
 * @param increment - The current number of the burned lines.
 * @returns {number} - The increment of the current level.
 */
function getLevelIncrement(startLevel, level, lines, increment) {
  if (startLevel === level) {
    const bound1 = 10 * (startLevel + 1);
    const bound2 = Math.max(100, startLevel * 10 - 50);
    return lines + increment >= Math.min(bound1, bound2) ? 1 : 0;
  }
  const newLines = (lines + increment) % 10;
  lines = lines % 10;
  return lines > newLines ? 1 : 0;
}

/**
 * Calculate new delay of frames.
 *
 * @param level - The current level in the game.
 * @returns {number} - The frame delay.
 */
function getDelayFrames(level) {
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
}

module.exports = { show, getScoreIncrement, getLevelIncrement, getDelayFrames };
