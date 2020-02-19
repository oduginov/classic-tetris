/**
 * Given a specific color in the rgba format [r, g, b, a], we obtain the hex code of the color.
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @returns {string} HexCode of the given color
 */
function rgbaToHex([r, g, b, a]) {
    return `#${[r.toString(16), g.toString(16), b.toString(16)]
        .map(c => c === "0" ? "00" : c)
        .join("")}`;
}

module.exports = {
    rgbaToHex: rgbaToHex,
};
