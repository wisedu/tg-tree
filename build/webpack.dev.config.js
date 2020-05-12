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
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: false,
    inline: true,
    noInfo: true,
    host: require('my-local-ip')(),
    port: 8090,
    after: function(app, server, compiler) {
      // do fancy stuff
      console.log(`  App running at:`)
      console.log(`  - Local:   http://${server.options.host}:${server.options.port}`)
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // ...
  ]
})