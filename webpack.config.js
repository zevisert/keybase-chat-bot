// @flow
const DashboardPlugin = require('webpack-dashboard/plugin')
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin')
const webpack = require('webpack')

const plugins = process.env.DASH ? [
  new webpack.NoErrorsPlugin(),
  new DashboardPlugin(),
  new FlowStatusWebpackPlugin({failOnError: true}),
] : []

module.exports = {
  target: 'node',
  plugins: plugins,
  entry: './es6_src/entry.js',
  output: {
    path: __dirname,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  // devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-flow-strip-types'],
        },
      },
    ],
  },
}
