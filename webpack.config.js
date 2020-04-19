const path = require("path");
const copy = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    mode: "development",
    node: {
        fs: "empty"
    },
    watch: true,
    plugins: [
        new copy([
            {from: "./src/index.html", to: path.resolve(__dirname, "dist")}
        ]),
        new copy([
            {from: "./src/style.css", to: path.resolve(__dirname, "dist")}
        ]),
        new copy([
            {from: "./assets/icons", to: path.resolve(__dirname, "dist")}
        ]),
    ]
};
