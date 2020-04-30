const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          "style-loader",
          "css-loader",
          // "css-loader?url=false",
          "resolve-url-loader",
          "sass-loader",
        ],
        options: {
          url: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Here you should change 'env' to '@babel/preset-env'
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2)$/i,
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        // use: ["file-loader"]
        loader: "file-loader",
        options: {
          name: '[name].[hash:6].[ext]',
          // name: "images/[name].[ext]",
          outputPath: "images",
          publicPath: "images",
          emitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg)$/,
        // test: /\.(jpe?g|png)$/,
        // test: /\.(jpeg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          }
        },
      },
      // {
      //   test: /\.html$/,
      //   use: ["html-loader"],
      // },
      // {
      //   test: /\.(ttf|png|svg|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'img/',
      //         publicPath: 'img/'
      //       }
      //     },
      //   ],
      // },
    ],
  },
}; 