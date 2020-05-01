const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const sourceRootPath = path.join(__dirname, "src");

const WriteFileWebpackPlugin = require("write-file-webpack-plugin");
const distRootPath = path.join(__dirname, "dist");

const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(sourceRootPath, "assets"),
          to: path.join(distRootPath, "assets"),
          test: /\.(jpg|jpeg|png|gif|svg)?$/,
        },
      ],
      { copyUnmodified: true }
    ),
    new WriteFileWebpackPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
}; 