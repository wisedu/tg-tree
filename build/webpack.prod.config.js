const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs');
const file = "./package.json";
const packageJSON = JSON.parse(fs.readFileSync(file));

let config = merge(webpackBaseConfig, {
  mode: 'production',
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: packageJSON.packageName + '.min.js',
    library: packageJSON.packageName,
    libraryTarget: 'umd'
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
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      })
    ]
  },
  devtool: 'source-map'
});

module.exports = config;