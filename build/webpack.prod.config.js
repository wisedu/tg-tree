const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

const fs = require('fs');
const file = "./package.json";
const packageJSON = JSON.parse(fs.readFileSync(file));

let config = merge(webpackBaseConfig, {
  entry: {
    main: './src/entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: packageJSON.packageName + '.min.js',
    library: packageJSON.packageName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'source-map'
});

module.exports = config;