const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/client.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
};
