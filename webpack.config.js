const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const dist = path.join(__dirname, '/dist');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],
  serve: {
    content: dist,
    open: true,
  },
};
