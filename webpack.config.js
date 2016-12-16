const path = require('path');

const config = {
  devtool: 'sourcemap',

  entry: [
    path.resolve('src/index.ts'),
  ],

  output: {
    path: path.resolve('./'),
    filename: 'bundle.js',
  },

  devServer: {
    host: '0.0.0.0',
    port: 5050,
    contentBase: path.resolve('./'),
    historyApiFallback: false,
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },

  resolve: {
    // module and jsnext:main are for tree-shaking compatibility
    mainFields: ['module', 'jsnext:main', 'browser', 'main'],
    extensions: ['.ts', '.js', '.json'],
  }
};

module.exports = config;
