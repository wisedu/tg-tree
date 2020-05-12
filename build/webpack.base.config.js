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
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
          // formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    extensions: ['.js', '.vue', '.json', '.css'],
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