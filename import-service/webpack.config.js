const path = require('path');
const slsw = require('serverless-webpack');
const { IgnorePlugin } = require('webpack');

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ],
  resolve: {
    extensions: ['.json', '.js'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [],
  },
};