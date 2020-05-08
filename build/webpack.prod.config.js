const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fs = require('fs');
const file = "./package.json";
const packageJSON = JSON.parse(fs.readFileSync(file));

const themeFile = fs.readFileSync('./runtime/theme.css', 'utf-8');
let match = themeFile.match(/^\/\*COLOR_THEME:([^\*]+)\*\//);
if (match.length > 1) {
  process.env.COLOR_THEME = match[1];
}

process.env.NODE_ENV = 'production';


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
        // @todo
        // new ExtractTextPlugin({filename: 'style/' + process.env.COLOR_THEME + '/emap.css', allChunks: true}),
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

config.module = {
  rules: [{
      // https://vue-loader.vuejs.org/en/configurations/extract-css.html
      test: /\.vue$/,
      loader: 'vue-loader',
      // options: {
      //   loaders: {
      //     css: ExtractTextPlugin.extract({
      //       use: ['css-loader', { loader: 'postcss-loader', options: { sourceMap: 'inline' } }],
      //       fallback: 'vue-style-loader'
      //     }),
      //     postcss: ExtractTextPlugin.extract({
      //       use: ['css-loader', { loader: 'postcss-loader', options: { sourceMap: 'inline' } }],
      //       fallback: 'vue-style-loader'
      //     })
      //   },
      //   postLoaders: {
      //     html: 'babel-loader'
      //   }
      // }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    // {
    //   test: /\.css$/,
    //   loader: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       'css-loader',
    //       {
    //         loader: 'postcss-loader',
    //         options: {
    //           sourceMap: 'inline'
    //         }
    //       },
    //       'autoprefixer-loader'
    //     ]
    //   })
    // },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=8192'
    },
    {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    }
  ]
}

module.exports = config;