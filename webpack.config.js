const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV;
module.exports = {
  mode: prod || 'development',
  devtool: prod ? 'nosources-source-map' : 'eval',
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
      template: './src/static/index.html',
    }),
  ],
};
