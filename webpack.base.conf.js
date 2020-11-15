const { resolve } = require("path");

module.exports = {
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: ["./src/bin/www"],
  output: {
    filename: "index.bundle.js",
    path: resolve(__dirname, "./dist"),
  },
};
