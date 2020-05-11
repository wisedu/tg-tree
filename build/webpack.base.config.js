/**
 * 公共配置
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 加载器
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: 'inline'
          }
        }]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }]
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      'src',
      'mock',
      'node_modules'
    ],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'utils': resolve('src/utils'),
      'mock': resolve('mock')
    }
  }
};