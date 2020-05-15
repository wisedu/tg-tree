const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
  mode: "development", 
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.s'
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true,
    host: require('my-local-ip')(),
    port: 8090
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // ...
  ]
})